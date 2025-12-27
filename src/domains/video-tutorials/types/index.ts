/**
 * Video Tutorial Types
 * Single Responsibility: Define type definitions for video tutorials
 */

export interface VideoTutorial {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoUrl: string;
  readonly thumbnailUrl: string;
  readonly duration: number; // in seconds
  readonly category: VideoTutorialCategory;
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly featured: boolean;
  readonly tags: readonly string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly viewCount: number;
}

export type VideoTutorialCategory =
  | "getting-started"
  | "ai-generation"
  | "editing"
  | "effects"
  | "exporting"
  | "tips-tricks"
  | "troubleshooting";

export interface VideoTutorialFilters {
  readonly category?: VideoTutorialCategory;
  readonly difficulty?: VideoTutorial["difficulty"];
  readonly featured?: boolean;
  readonly tags?: readonly string[];
}
