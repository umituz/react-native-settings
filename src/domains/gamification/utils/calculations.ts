/**
 * Gamification Calculations
 * Pure utility functions - NO side effects
 */

import type { LevelDefinition, LevelState, Achievement, AchievementDefinition } from "../types";

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
      nextLevelDef = sortedLevels[i + 1] || null;
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
      return tasksCompleted >= definition.threshold;
    case "streak":
      return currentStreak >= definition.threshold;
    case "milestone":
      return tasksCompleted >= definition.threshold;
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

export const isStreakActive = (lastActivityDate: string | null): boolean => {
  if (!lastActivityDate) return false;

  const last = new Date(lastActivityDate);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays <= 1;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
