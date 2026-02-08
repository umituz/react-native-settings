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

  const screenProps: GamificationScreenProps = {
    title: config.translations.title,
    statsTitle: config.translations.statsTitle,
    achievementsTitle: config.translations.achievementsTitle,
    streakTitle: config.translations.streakTitle,
    levelProps: {
      level: level.currentLevel,
      points: level.currentPoints,
      pointsToNext: level.pointsToNext,
      progress: level.progress,
      levelTitle: config.translations.levelTitle,
      showPoints: true,
    },
    streakProps: {
      current: streak.current,
      longest: streak.longest,
      currentLabel: config.translations.currentStreak,
      bestLabel: config.translations.bestStreak,
      daysLabel: config.translations.days,
    },
    stats: [
      {
        label: config.translations.statsTitle,
        value: points,
        icon: "star",
      },
    ],
    achievements: achievementItems,
    emptyAchievementsText: config.translations.emptyAchievements,
  };

  return <GamificationScreenInner {...screenProps} />;
};
