/**
 * Gamification Screen Component
 * Wrapper for gamification screen
 */

import React, { useMemo } from "react";
import { GamificationScreen as BaseGamificationScreen } from "./GamificationScreen";
import { useGamification } from "../hooks/useGamification";
import { useLocalization } from "@umituz/react-native-localization";
import type { GamificationSettingsConfig } from "../types/settings";

export interface GamificationScreenWrapperProps {
  config: GamificationSettingsConfig;
}

/**
 * Gamification Screen for Settings
 * Displays achievements, levels, streaks, and stats
 */
export const GamificationScreenWrapper: React.FC<GamificationScreenWrapperProps> = ({
  config,
}) => {
  const { t } = useLocalization();
  const gamification = useGamification(config.config);

  const screenProps = useMemo(() => {
    // Map achievements to screen format
    const achievements = gamification.achievements.map((achievement) => ({
      id: achievement.id,
      title: t(`gamification.achievements.${achievement.id}.title`),
      description: t(`gamification.achievements.${achievement.id}.description`),
      icon: "trophy",
      isUnlocked: achievement.isUnlocked,
      progress: achievement.progress,
      threshold: achievement.threshold,
    }));

    // Map stats
    const stats = [
      {
        icon: "star",
        value: gamification.points,
        label: t("gamification.stats.totalPoints"),
      },
      {
        icon: "check-circle",
        value: gamification.totalTasksCompleted,
        label: t("gamification.stats.tasksCompleted"),
      },
      {
        icon: "award",
        value: gamification.achievements.filter((a) => a.isUnlocked).length,
        label: t("gamification.stats.achievementsUnlocked"),
      },
    ];

    // Level props
    const levelProps = {
      level: gamification.level.currentLevel,
      points: gamification.level.currentPoints,
      levelTitle: t("gamification.level.title", {
        level: gamification.level.currentLevel,
      }),
      pointsToNext: gamification.level.pointsToNext,
      progress: gamification.level.progress,
      showPoints: true,
    };

    // Streak props
    const streakProps = gamification.streak.current > 0
      ? {
          current: gamification.streak.current,
          longest: gamification.streak.longest,
          currentLabel: t("gamification.streak.current"),
          bestLabel: t("gamification.streak.best"),
          daysLabel: t("gamification.streak.days"),
        }
      : undefined;

    return {
      ...config.screenProps,
      levelProps,
      stats,
      achievements,
      streakProps,
      emptyAchievementsText: t("gamification.achievements.empty"),
    };
  }, [gamification, config.screenProps, t]);

  return <BaseGamificationScreen {...screenProps} />;
};
