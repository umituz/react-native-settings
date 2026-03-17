/**
 * Gamification Calculations
 * Pure utility functions - NO side effects
 */

import type { LevelDefinition, LevelState, AchievementDefinition } from "../types";

// Constants for gamification calculations
export const DEFAULT_LEVEL_RANGE = 100;
export const DEFAULT_POINTS_PER_LEVEL = 50;
export const MAX_PROGRESS = 100;

export const calculateLevel = (
  points: number,
  levels: LevelDefinition[]
): LevelState => {
  const sortedLevels = [...levels].sort((a, b) => a.minPoints - b.minPoints);

  if (sortedLevels.length === 0) {
    // Return default level state if no levels are defined
    return {
      currentLevel: 1,
      currentPoints: points,
      pointsToNext: DEFAULT_POINTS_PER_LEVEL,
      progress: 0,
    };
  }

  let currentLevelDef = sortedLevels[0];
  let nextLevelDef: LevelDefinition | null = null;

  for (let i = 0; i < sortedLevels.length; i++) {
    if (points >= sortedLevels[i].minPoints) {
      currentLevelDef = sortedLevels[i];
      nextLevelDef = sortedLevels[i + 1] ?? null;
    }
  }

  const pointsInLevel = points - currentLevelDef.minPoints;
  const levelRange = nextLevelDef
    ? nextLevelDef.minPoints - currentLevelDef.minPoints
    : DEFAULT_LEVEL_RANGE;
  const progress = Math.min(MAX_PROGRESS, (pointsInLevel / levelRange) * MAX_PROGRESS);
  const pointsToNext = nextLevelDef
    ? nextLevelDef.minPoints - points
    : 0;

  return {
    currentLevel: currentLevelDef.level,
    currentPoints: points,
    pointsToNext,
    progress,
  };
};

export const checkAchievementUnlock = (
  definition: AchievementDefinition,
  tasksCompleted: number,
  currentStreak: number
): boolean => {
  switch (definition.type) {
    case "count":
    case "milestone":
      return tasksCompleted >= definition.threshold;
    case "streak":
      return currentStreak >= definition.threshold;
    default:
      return false;
  }
};

export const updateAchievementProgress = (
  definition: AchievementDefinition,
  tasksCompleted: number,
  currentStreak: number
): number => {
  const value = definition.type === "streak" ? currentStreak : tasksCompleted;
  return Math.min(MAX_PROGRESS, (value / definition.threshold) * MAX_PROGRESS);
};

/**
 * Check if streak is active based on last activity date
 * Returns true if last activity was today or yesterday
 * FIXED: Now uses date comparison instead of hour-based calculation to avoid timezone issues
 */
export const isStreakActive = (lastActivityDate: string | null): boolean => {
  if (!lastActivityDate) return false;

  const last = new Date(lastActivityDate);
  const now = new Date();

  // Normalize to midnight to compare days, not hours
  const lastMidnight = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayMidnight = new Date(nowMidnight);
  yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);

  // Active if last activity was today or yesterday
  return lastMidnight.getTime() >= yesterdayMidnight.getTime();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
