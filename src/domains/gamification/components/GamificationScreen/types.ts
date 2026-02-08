/**
 * GamificationScreen Types
 * Generic types for 100+ apps - NO app-specific code
 */

import type React from 'react';
import type { LevelProgressProps } from "../LevelProgress";
import type { StatsCardProps } from "../StatsCard";
import type { AchievementItemProps } from "../AchievementItem";
import type { StreakDisplayProps } from "../StreakDisplay";
import type { ViewStyle, TextStyle } from "react-native";
import type { GamificationConfig } from "../../types";

export interface GamificationConfigProps extends Partial<Omit<GamificationScreenProps, 'config'>> {
  config: GamificationConfig;
}

export interface GamificationScreenProps {
  // Section titles (all via props)
  title: string;
  statsTitle: string;
  achievementsTitle: string;
  streakTitle: string;

  // Level data
  levelProps: Omit<
    LevelProgressProps,
    "primaryColor" | "backgroundColor" | "textColor" | "subtextColor"
  >;

  // Stats data
  stats: Array<
    Omit<
      StatsCardProps,
      "accentColor" | "backgroundColor" | "textColor" | "subtextColor"
    >
  >;

  // Achievements data
  achievements: Array<
    Omit<
      AchievementItemProps,
      | "accentColor"
      | "backgroundColor"
      | "textColor"
      | "subtextColor"
      | "lockedOpacity"
    >
  >;

  // Streak data (optional)
  streakProps?: Omit<
    StreakDisplayProps,
    "primaryColor" | "backgroundColor" | "textColor" | "subtextColor"
  >;

  // Empty state
  emptyAchievementsText?: string;

  // Customization
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  sectionTitleStyle?: TextStyle;

  // Colors (applied to all child components)
  accentColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  textColor?: string;
  subtextColor?: string;

  // Header component (optional - for back button etc)
  headerComponent?: React.ReactNode;
}

export interface GamificationScreenStyleProps {
  accentColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  subtextColor: string;
}
