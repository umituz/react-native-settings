/**
 * Gamification Domain - Types
 * Settings package integration for gamification
 */

import type {
  GamificationConfig,
  GamificationScreenProps,
} from "@umituz/react-native-gamification";

/**
 * Gamification settings configuration
 * Passed from app to settings package
 */
export interface GamificationSettingsConfig {
  enabled: boolean;
  config: GamificationConfig;
  screenProps: Omit<GamificationScreenProps, "levelProps" | "stats" | "achievements">;
  onNavigate?: () => void;
}

/**
 * Gamification menu item configuration
 */
export interface GamificationMenuConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
}
