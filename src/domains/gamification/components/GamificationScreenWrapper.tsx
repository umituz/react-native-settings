import React from 'react';
import { useGamification } from '../hooks/useGamification';
import { GamificationScreen } from './GamificationScreen';
import type { GamificationConfig } from '../types';

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

  return (
    <GamificationScreen
      title={config.translations.title}
      statsTitle={config.translations.statsTitle}
      achievementsTitle={config.translations.achievementsTitle}
      streakTitle={config.translations.streakTitle}
      levelProps={{
        level: level.currentLevel,
        currentPoints: level.currentPoints,
        pointsToNext: level.pointsToNext,
        progress: level.progress,
        levelTitle: config.translations.levelTitle,
      }}
      streakProps={{
        streak: streak.current,
        longestStreak: streak.longest,
        title: config.translations.streakTitle,
      }}
      stats={{
        points,
        tasksCompleted: totalTasksCompleted,
        streak: streak.current,
      }}
      achievements={achievements}
      emptyAchievementsText={config.translations.emptyAchievements}
    />
  );
};
