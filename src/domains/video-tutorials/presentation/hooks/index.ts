/**
 * Video Tutorial Hooks
 * Single Responsibility: Provide React hooks for video tutorials
 */

import { useQuery } from "@tanstack/react-query";
import { videoTutorialService } from "../../infrastructure/services/video-tutorial.service";
import type {
  VideoTutorial,
  VideoTutorialCategory,
  VideoTutorialFilters,
} from "../../types";

export function useVideoTutorials(filters?: VideoTutorialFilters) {
  return useQuery({
    queryKey: ["video-tutorials", filters],
    queryFn: () => videoTutorialService.getAllTutorials(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedTutorials(maxCount: number = 5) {
  return useQuery({
    queryKey: ["featured-tutorials", maxCount],
    queryFn: () => videoTutorialService.getFeaturedTutorials(maxCount),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useTutorialsByCategory(category: VideoTutorialCategory) {
  return useQuery({
    queryKey: ["tutorials-by-category", category],
    queryFn: () => videoTutorialService.getTutorialsByCategory(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
