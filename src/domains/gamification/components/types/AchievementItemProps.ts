/**
 * AchievementItem Props Types
 */

import type { ViewStyle, TextStyle } from 'react-native';

export interface AchievementItemProps {
  title: string;
  description: string;
  icon: React.ReactNode | string;
  isUnlocked: boolean;
  progress: number;
  threshold: number;
  progressLabel?: string;
  // Customization
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  // Colors
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
  lockedOpacity?: number;
}
