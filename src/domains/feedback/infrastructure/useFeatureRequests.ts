/**
 * useFeatureRequests Hook
 * Internal hook — fetches, votes, submits feature requests via Firestore
 * Works with both authenticated and anonymous users
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Platform } from "react-native";
import { useAuth } from "@umituz/react-native-auth";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "@umituz/react-native-firebase";
import type {
  FeatureRequestItem,
  FeatureRequestStatus,
  VoteType,
} from "../domain/entities/FeatureRequestEntity";

const COLLECTION = "feature_requests";

export interface UseFeatureRequestsResult {
  requests: FeatureRequestItem[];
  userVotes: Record<string, VoteType>;
  isLoading: boolean;
  vote: (requestId: string, type: VoteType) => Promise<void>;
  submitRequest: (data: { title: string; description: string; type: string; rating?: number }) => Promise<void>;
  reload: () => Promise<void>;
  userId: string | null;
}

export function useFeatureRequests(): UseFeatureRequestsResult {
  const { user } = useAuth();
  const userId = user?.uid ?? null;

  const [requests, setRequests] = useState<FeatureRequestItem[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, VoteType>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Ref to avoid stale closure in vote()
  const userVotesRef = useRef(userVotes);
  userVotesRef.current = userVotes;

  // Guard against rapid double-tap on the same request
  const votingInProgress = useRef(new Set<string>());

  const fetchAll = useCallback(async () => {
    const db = getFirestore();
    if (!db) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const q = query(collection(db, COLLECTION), orderBy("votes", "desc"));
      const snapshot = await getDocs(q);

      const items: FeatureRequestItem[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title ?? "",
          description: data.description ?? "",
          type: data.type ?? "feature_request",
          status: (data.status ?? "pending") as FeatureRequestStatus,
          votes: data.votes ?? 0,
          commentCount: data.commentCount ?? 0,
          createdBy: data.createdBy ?? "",
          isAnonymous: data.isAnonymous ?? false,
          platform: data.platform ?? "unknown",
          createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
        };
      });

      setRequests(items);

      // Fetch user votes in parallel (not N+1 sequential)
      if (userId && snapshot.docs.length > 0) {
        const votePromises = snapshot.docs.map(async (reqDoc) => {
          const voteRef = doc(db, COLLECTION, reqDoc.id, "votes", userId);
          const voteSnap = await getDoc(voteRef);
          if (voteSnap.exists()) {
            return [reqDoc.id, voteSnap.data().type as VoteType] as const;
          }
          return null;
        });

        const results = await Promise.all(votePromises);
        const votes: Record<string, VoteType> = {};
        for (const result of results) {
          if (result) votes[result[0]] = result[1];
        }
        setUserVotes(votes);
      } else {
        setUserVotes({});
      }
    } catch (error) {
      if (__DEV__) console.warn("[useFeatureRequests] Load failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const vote = useCallback(async (requestId: string, type: VoteType) => {
    if (!userId) return;

    // Prevent rapid double-tap on the same request
    if (votingInProgress.current.has(requestId)) return;
    votingInProgress.current.add(requestId);

    const db = getFirestore();
    if (!db) {
      votingInProgress.current.delete(requestId);
      return;
    }

    // Read latest vote from ref (not stale closure)
    const previousVote = userVotesRef.current[requestId] as VoteType | undefined;
    const isUndo = previousVote === type;

    // Optimistic UI
    setUserVotes((prev) => {
      const next = { ...prev };
      if (isUndo) { delete next[requestId]; } else { next[requestId] = type; }
      return next;
    });
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== requestId) return r;
        let delta = 0;
        if (isUndo) delta = type === "up" ? -1 : 1;
        else if (previousVote) delta = type === "up" ? 2 : -2;
        else delta = type === "up" ? 1 : -1;
        return { ...r, votes: r.votes + delta };
      }),
    );

    try {
      const voteRef = doc(db, COLLECTION, requestId, "votes", userId);
      const requestRef = doc(db, COLLECTION, requestId);
      const existing = await getDoc(voteRef);

      if (existing.exists()) {
        const prev = existing.data().type as VoteType;
        if (prev === type) {
          await deleteDoc(voteRef);
          await updateDoc(requestRef, { votes: increment(type === "up" ? -1 : 1) });
        } else {
          await setDoc(voteRef, { type, votedAt: serverTimestamp() });
          await updateDoc(requestRef, { votes: increment(type === "up" ? 2 : -2) });
        }
      } else {
        await setDoc(voteRef, { type, votedAt: serverTimestamp() });
        await updateDoc(requestRef, { votes: increment(type === "up" ? 1 : -1) });
      }
    } catch (error) {
      if (__DEV__) console.warn("[useFeatureRequests] Vote failed:", error);
      // Rollback using previous known state
      setUserVotes((prev) => {
        const next = { ...prev };
        if (previousVote) next[requestId] = previousVote; else delete next[requestId];
        return next;
      });
      fetchAll();
    } finally {
      votingInProgress.current.delete(requestId);
    }
  }, [userId, fetchAll]);

  const submitRequest = useCallback(async (data: { title: string; description: string; type: string; rating?: number }) => {
    const db = getFirestore();
    if (!db) throw new Error("Firestore not available");
    if (!userId) throw new Error("User not authenticated");

    // Create the feature request
    const docRef = await addDoc(collection(db, COLLECTION), {
      title: data.title,
      description: data.description,
      type: data.type || "feature_request",
      status: "pending",
      votes: 1,
      commentCount: 0,
      createdBy: userId,
      isAnonymous: user?.isAnonymous ?? false,
      platform: Platform.OS,
      rating: data.rating ?? null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Create the creator's upvote doc so votes count matches reality
    await setDoc(doc(db, COLLECTION, docRef.id, "votes", userId), {
      type: "up" as VoteType,
      votedAt: serverTimestamp(),
    });

    await fetchAll();
  }, [userId, user?.isAnonymous, fetchAll]);

  return { requests, userVotes, isLoading, vote, submitRequest, reload: fetchAll, userId };
}
