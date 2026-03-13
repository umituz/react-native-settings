/**
 * Gamification Calculations
 * Pure utility functions - NO side effects
 */

import type { LevelDefinition, LevelState, AchievementDefinition } from "../types";

export const calculateLevel = (
  points: number,
  levels: LevelDefinition[]
): LevelState => {
  const sortedLevels = [...levels].sort((a, b) => a.minPoints - b.minPoints);

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
    : 100;
  const progress = Math.min(100, (pointsInLevel / levelRange) * 100);
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
  return Math.min(100, (value / definition.threshold) * 100);
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
