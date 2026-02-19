/**
 * GamificationScreen With Config
 * Component that uses the hook to fetch data and render the screen
 * Separated to satisfy React Hooks rules
 */

import React from "react";
import { GamificationScreenInner } from "./GamificationScreen";
import type { GamificationConfigProps } from "./types";
import type { GamificationScreenProps } from "./types";
import type { Achievement } from "../../types";

/**
 * Component that uses the hook - separated to satisfy React Hooks rules
 */
export const GamificationScreenWithConfig: React.FC<GamificationConfigProps> = ({ config }) => {
  // Import hook here to avoid conditional hook usage
  const { useGamification } = require("../../hooks/useGamification");

  const {
    points,
    totalTasksCompleted,
    level,
    streak,
    achievements,
  } = useGamification(config);

  // Transform store achievements to UI props
  const achievementItems = achievements.map((a: Achievement) => ({
    ...a,
    title: a.title,
    description: a.description,
    icon: a.icon,
    isUnlocked: a.isUnlocked,
    progress: a.progress,
    threshold: a.threshold,
    id: a.id,
    type: a.type
  }));

  const t = config.translations ?? {};
  const screenProps: GamificationScreenProps = {
    title: t.title ?? 'Gamification',
    statsTitle: t.statsTitle ?? 'Stats',
    achievementsTitle: t.achievementsTitle ?? 'Achievements',
    streakTitle: t.streakTitle ?? 'Streak',
    levelProps: {
      level: level.currentLevel,
      points: level.currentPoints,
      pointsToNext: level.pointsToNext,
      progress: level.progress,
      levelTitle: t.levelTitle ?? 'Level',
      showPoints: true,
    },
    streakProps: {
      current: streak.current,
      longest: streak.longest,
      bestLabel: t.bestStreak ?? 'Best',
      daysLabel: t.days ?? 'days',
    },
    stats: [
      {
        label: t.pointsLabel ?? 'Points',
        value: points,
        icon: "⭐",
      },
      {
        label: t.totalCompletedLabel ?? 'Completed',
        value: totalTasksCompleted,
        icon: "✅",
      },
    ],
    achievements: achievementItems,
    emptyAchievementsText: t.emptyAchievements ?? 'No achievements yet',
  };

  return <GamificationScreenInner {...screenProps} />;
};
