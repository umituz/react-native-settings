/**
 * useGamification Hook
 * Main hook for gamification operations
 */

import { useCallback, useEffect, useMemo } from "react";
import { useGamificationStore } from "../store/gamificationStore";
import { calculateLevel, DEFAULT_POINTS_PER_LEVEL, MAX_PROGRESS } from "../utils/calculations";
import type { GamificationConfig, LevelState, Achievement } from "../types";

export interface UseGamificationReturn {
  // State
  points: number;
  totalTasksCompleted: number;
  level: LevelState;
  streak: { current: number; longest: number };
  achievements: Achievement[];
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: (config: GamificationConfig) => Promise<void>;
  completeTask: () => void;
  addPoints: (amount: number) => void;
  reset: () => Promise<void>;
}

export const useGamification = (
  config?: GamificationConfig
): UseGamificationReturn => {
  const store = useGamificationStore();

  // Auto-initialize if config provided
  useEffect(() => {
    if (config && !store.isInitialized) {
      store.initialize(config).catch((error) => {
        // Log error but don't crash - initialization is not critical
        console.error('[useGamification] Failed to initialize:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, store.isInitialized]);

  // Calculate level from config
  const level = useMemo((): LevelState => {
    if (!config?.levels.length) {
      return {
        currentLevel: 1,
        currentPoints: store.points,
        pointsToNext: DEFAULT_POINTS_PER_LEVEL,
        progress: Math.min(MAX_PROGRESS, (store.points / DEFAULT_POINTS_PER_LEVEL) * MAX_PROGRESS),
      };
    }
    return calculateLevel(store.points, config.levels);
  }, [store.points, config?.levels]);

  const completeTask = useCallback(() => {
    store.completeTask();
  }, [store.completeTask]);

  const addPoints = useCallback(
    (amount: number) => {
      store.addPoints(amount);
    },
    [store.addPoints]
  );

  const initialize = useCallback(
    async (cfg: GamificationConfig) => {
      await store.initialize(cfg);
    },
    [store.initialize]
  );

  const reset = useCallback(async () => {
    await store.reset();
  }, [store.reset]);

  return {
    points: store.points,
    totalTasksCompleted: store.totalTasksCompleted,
    level,
    streak: {
      current: store.streak.current,
      longest: store.streak.longest,
    },
    achievements: store.achievements,
    isLoading: store.isLoading,
    isInitialized: store.isInitialized,
    initialize,
    completeTask,
    addPoints,
    reset,
  };
};
