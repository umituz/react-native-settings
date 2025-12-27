/**
 * Video Tutorial Service
 * Single Responsibility: Handle video tutorial data operations
 */

import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import type { Firestore, QueryConstraint } from "firebase/firestore";
import type {
  VideoTutorial,
  VideoTutorialCategory,
  VideoTutorialFilters,
} from "../../types";

export interface VideoTutorialServiceConfig {
  db?: Firestore;
  collectionName?: string;
}

class VideoTutorialService {
  private config: VideoTutorialServiceConfig = {
    collectionName: "video_tutorials",
  };

  initialize(config: VideoTutorialServiceConfig) {
    this.config = { ...this.config, ...config };
  }

  private get db(): Firestore {
    if (!this.config.db) {
      throw new Error("VideoTutorialService: Firestore not initialized. Call initialize({ db }) first.");
    }
    return this.config.db;
  }

  private get collectionName(): string {
    return this.config.collectionName || "video_tutorials";
  }

  async getAllTutorials(
    filters?: VideoTutorialFilters,
  ): Promise<VideoTutorial[]> {
    const constraints: QueryConstraint[] = [];

    if (filters?.category) {
      constraints.push(where("category", "==", filters.category));
    }

    if (filters?.difficulty) {
      constraints.push(where("difficulty", "==", filters.difficulty));
    }

    if (filters?.featured !== undefined) {
      constraints.push(where("featured", "==", filters.featured));
    }

    constraints.push(orderBy("createdAt", "desc"));

    const q = query(collection(this.db, this.collectionName), ...constraints);
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => this.mapDocumentToTutorial(doc));
  }

  async getFeaturedTutorials(maxCount: number = 5): Promise<VideoTutorial[]> {
    const q = query(
      collection(this.db, this.collectionName),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(maxCount),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapDocumentToTutorial(doc));
  }

  async getTutorialsByCategory(
    category: VideoTutorialCategory,
  ): Promise<VideoTutorial[]> {
    const q = query(
      collection(this.db, this.collectionName),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapDocumentToTutorial(doc));
  }

  private mapDocumentToTutorial(doc: any): VideoTutorial {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      videoUrl: data.videoUrl || "",
      thumbnailUrl: data.thumbnailUrl || "",
      duration: data.duration || 0,
      category: data.category || "getting-started",
      difficulty: data.difficulty || "beginner",
      featured: data.featured || false,
      tags: data.tags || [],
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      viewCount: data.viewCount || 0,
    };
  }
}

export const videoTutorialService = new VideoTutorialService();

