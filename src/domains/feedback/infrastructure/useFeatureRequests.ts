/**
 * useFeatureRequests Hook
 * Internal hook — fetches, votes, submits feature requests via Firestore
 * Works with both authenticated and anonymous users
 *
 * FIREBASE LAZY LOADING:
 * Firebase is lazy-loaded to avoid hard dependency.
 * If @umituz/react-native-firebase is not installed, features are disabled gracefully.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Platform } from "react-native";
import * as Crypto from "expo-crypto";
import { devWarn } from "../../../utils/devUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  FeatureRequestItem,
  FeatureRequestStatus,
  VoteType,
} from "../domain/entities/FeatureRequestEntity";

const COLLECTION = "feature_requests";
const ANONYMOUS_USER_ID_KEY = "@anonymous_user_id";

// Lazy-loaded Firebase modules
let firebaseModules: {
  getFirestore: () => any;
  collection: any;
  doc: any;
  getDocs: any;
  getDoc: any;
  setDoc: any;
  addDoc: any;
  updateDoc: any;
  deleteDoc: any;
  increment: any;
  orderBy: any;
  query: any;
  serverTimestamp: any;
} | null = null;

function loadFirebase(): typeof firebaseModules {
  if (firebaseModules !== null) return firebaseModules;

  try {
    // Lazy load Firebase only when needed
    const firebaseModule = require("@umituz/react-native-firebase");
    const firestoreModule = require("firebase/firestore");

    firebaseModules = {
      getFirestore: firebaseModule.getFirestore,
      collection: firestoreModule.collection,
      doc: firestoreModule.doc,
      getDocs: firestoreModule.getDocs,
      getDoc: firestoreModule.getDoc,
      setDoc: firestoreModule.setDoc,
      addDoc: firestoreModule.addDoc,
      updateDoc: firestoreModule.updateDoc,
      deleteDoc: firestoreModule.deleteDoc,
      increment: firestoreModule.increment,
      orderBy: firestoreModule.orderBy,
      query: firestoreModule.query,
      serverTimestamp: firestoreModule.serverTimestamp,
    };
    return firebaseModules;
  } catch (error) {
    // Firebase not installed - return null to disable features
    devWarn(
      "[useFeatureRequests] @umituz/react-native-firebase not installed. Feature requests disabled.",
    );
    firebaseModules = null;
    return null;
  }
}

/**
 * Get or create a persistent anonymous user ID
 */
async function getAnonymousUserId(): Promise<string> {
  try {
    const existingId = await AsyncStorage.getItem(ANONYMOUS_USER_ID_KEY);
    if (existingId) return existingId;

    // Create a new anonymous ID using device UUID
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    const newId = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    await AsyncStorage.setItem(ANONYMOUS_USER_ID_KEY, newId);
    return newId;
  } catch (error) {
    // Fallback to timestamp-based ID if crypto fails
    const fallbackId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    await AsyncStorage.setItem(ANONYMOUS_USER_ID_KEY, fallbackId);
    return fallbackId;
  }
}

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
  const [userId, setUserId] = useState<string | null>(null);

  const [requests, setRequests] = useState<FeatureRequestItem[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, VoteType>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize anonymous user ID
  useEffect(() => {
    getAnonymousUserId().then((id) => {
      setUserId(id);
    });
  }, []);

  // Ref to avoid stale closure in vote()
  const userVotesRef = useRef(userVotes);
  userVotesRef.current = userVotes;

  // Guard against rapid double-tap on the same request
  const votingInProgress = useRef(new Set<string>());

  const fetchAll = useCallback(async () => {
    const fb = loadFirebase();
    if (!fb) {
      setIsLoading(false);
      return;
    }

    const db = fb.getFirestore();
    if (!db) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const q = fb.query(fb.collection(db, COLLECTION), fb.orderBy("votes", "desc"));
      const snapshot = await fb.getDocs(q);

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
          const voteRef = fb.doc(db, COLLECTION, reqDoc.id, "votes", userId);
          const voteSnap = await fb.getDoc(voteRef);
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
      devWarn("[useFeatureRequests] Load failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const vote = useCallback(async (requestId: string, type: VoteType) => {
    const fb = loadFirebase();
    if (!fb || !userId) return;

    // Prevent rapid double-tap on the same request
    if (votingInProgress.current.has(requestId)) return;
    votingInProgress.current.add(requestId);

    const db = fb.getFirestore();
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
      const voteRef = fb.doc(db, COLLECTION, requestId, "votes", userId);
      const requestRef = fb.doc(db, COLLECTION, requestId);
      const existing = await fb.getDoc(voteRef);

      if (existing.exists()) {
        const prev = existing.data().type as VoteType;
        if (prev === type) {
          await fb.deleteDoc(voteRef);
          await fb.updateDoc(requestRef, { votes: fb.increment(type === "up" ? -1 : 1) });
        } else {
          await fb.setDoc(voteRef, { type, votedAt: fb.serverTimestamp() });
          await fb.updateDoc(requestRef, { votes: fb.increment(type === "up" ? 2 : -2) });
        }
      } else {
        await fb.setDoc(voteRef, { type, votedAt: fb.serverTimestamp() });
        await fb.updateDoc(requestRef, { votes: fb.increment(type === "up" ? 1 : -1) });
      }
    } catch (error) {
      devWarn("[useFeatureRequests] Vote failed:", error);
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
    const fb = loadFirebase();
    if (!fb) throw new Error("Firestore not available");
    const db = fb.getFirestore();
    if (!db) throw new Error("Firestore not available");
    if (!userId) throw new Error("User ID not available");

    // Create the feature request
    const docRef = await fb.addDoc(fb.collection(db, COLLECTION), {
      title: data.title,
      description: data.description,
      type: data.type || "feature_request",
      status: "pending",
      votes: 1,
      commentCount: 0,
      createdBy: userId,
      isAnonymous: true,
      platform: Platform.OS,
      rating: data.rating ?? null,
      createdAt: fb.serverTimestamp(),
      updatedAt: fb.serverTimestamp(),
    });

    // Create the creator's upvote doc so votes count matches reality
    await fb.setDoc(fb.doc(db, COLLECTION, docRef.id, "votes", userId), {
      type: "up" as VoteType,
      votedAt: fb.serverTimestamp(),
    });

    await fetchAll();
  }, [userId, fetchAll]);

  return { requests, userVotes, isLoading, vote, submitRequest, reload: fetchAll, userId };
}
