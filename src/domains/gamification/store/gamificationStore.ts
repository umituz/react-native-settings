/**
 * Gamification Store
 * Zustand store with persist middleware
 */

import { createStore, storageService } from "@umituz/react-native-design-system";
import type {
  GamificationState,
  GamificationActions,
  GamificationConfig,
  Achievement,
} from "../types";
import {
  checkAchievementUnlock,
  updateAchievementProgress,
  isStreakActive,
  isSameDay,
} from "../utils/calculations";

const DEFAULT_STATE: GamificationState = {
  points: 0,
  totalTasksCompleted: 0,
  achievements: [],
  streak: {
    current: 0,
    longest: 0,
    lastActivityDate: null,
  },
  isLoading: false,
  isInitialized: false,
};

let currentConfig: GamificationConfig | null = null;

export const useGamificationStore = createStore<GamificationState, GamificationActions>({
  name: "gamification-storage",
  initialState: DEFAULT_STATE,
  persist: true,
  storage: storageService,
  version: 1,
  partialize: (state) => ({
    points: state.points,
    totalTasksCompleted: state.totalTasksCompleted,
    achievements: state.achievements,
    streak: state.streak,
    isLoading: false,
    isInitialized: false,
  }),
  actions: (set, get) => ({
    initialize: async (config: GamificationConfig) => {
      currentConfig = config;
      const state = get();

      // Initialize achievements from config
      const achievements: Achievement[] = config.achievements.map((def) => ({
        ...def,
        isUnlocked: false,
        progress: 0,
      }));

      // Merge with existing unlocked achievements
      const mergedAchievements = achievements.map((ach: Achievement) => {
        const existing = state.achievements.find((a: Achievement) => a.id === ach.id);
        if (existing) {
          return { ...ach, isUnlocked: existing.isUnlocked, progress: existing.progress };
        }
        return ach;
      });

      set({ achievements: mergedAchievements, isInitialized: true });
    },

    addPoints: (amount: number) => {
      const state = get();
      set({ points: state.points + amount });
    },

    completeTask: () => {
      const state = get();
      const pointsToAdd = currentConfig?.pointsPerAction ?? 15;

      const newTotalTasks = state.totalTasksCompleted + 1;

      set({
        totalTasksCompleted: newTotalTasks,
        points: state.points + pointsToAdd,
      });

      const actions = get() as GamificationActions;
      actions.updateStreak();
      actions.checkAchievements();
    },

    updateStreak: () => {
      const state = get();
      const now = new Date();
      const lastDate = state.streak.lastActivityDate
        ? new Date(state.streak.lastActivityDate)
        : null;

      let newStreak = state.streak.current;

      if (!lastDate || !isSameDay(lastDate, now)) {
        if (isStreakActive(state.streak.lastActivityDate)) {
          newStreak = state.streak.current + 1;
        } else {
          newStreak = 1;
        }
      }

      set({
        streak: {
          current: newStreak,
          longest: Math.max(state.streak.longest, newStreak),
          lastActivityDate: now.toISOString(),
        },
      });
    },

    checkAchievements: (): Achievement[] => {
      if (!currentConfig) return [];

      const state = get();

      if (!state.achievements || state.achievements.length === 0) {
        return [];
      }

      const newlyUnlocked: Achievement[] = [];

      const updatedAchievements = state.achievements.map((ach: Achievement) => {
        if (ach.isUnlocked) return ach;

        const progress = updateAchievementProgress(
          ach,
          state.totalTasksCompleted,
          state.streak.current
        );

        const shouldUnlock = checkAchievementUnlock(
          ach,
          state.totalTasksCompleted,
          state.streak.current
        );

        if (shouldUnlock && !ach.isUnlocked) {
          const unlocked = {
            ...ach,
            isUnlocked: true,
            unlockedAt: new Date().toISOString(),
            progress: 100,
          };
          newlyUnlocked.push(unlocked);
          return unlocked;
        }

        return { ...ach, progress };
      });

      set({ achievements: updatedAchievements });
      return newlyUnlocked;
    },

    reset: async () => {
      set(DEFAULT_STATE);
    },
  }),
});
