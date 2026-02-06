import React from 'react';
import { useGamification } from '../hooks/useGamification';
import { GamificationScreen } from './GamificationScreen';
import type { GamificationConfig } from '../types';
import type { AchievementItemProps } from '../components';

interface GamificationScreenWrapperProps {
  config: GamificationConfig;
}

export const GamificationScreenWrapper: React.FC<GamificationScreenWrapperProps> = ({ config }) => {
  const {
    points,
    totalTasksCompleted,
    level,
    streak,
    achievements,
  } = useGamification(config);

  // Transform store achievements to UI props
  const achievementItems: AchievementItemProps[] = achievements.map(a => ({
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

  return (
    <GamificationScreen
      title={config.translations.title}
      statsTitle={config.translations.statsTitle}
      achievementsTitle={config.translations.achievementsTitle}
      streakTitle={config.translations.streakTitle}
      levelProps={{
        level: level.currentLevel,
        points: level.currentPoints,
        pointsToNext: level.pointsToNext,
        progress: level.progress,
        levelTitle: config.translations.levelTitle,
        showPoints: true,
      }}
      streakProps={{
        current: streak.current,
        longest: streak.longest,
        currentLabel: config.translations.currentStreak,
        bestLabel: config.translations.bestStreak,
        daysLabel: config.translations.days,
      }}
      stats={[
        {
          label: config.translations.statsTitle,
          value: points, // Pass number directly
          icon: "star",
        },
      ]}
      achievements={achievementItems}
      emptyAchievementsText={config.translations.emptyAchievements}
    />
  );
};
