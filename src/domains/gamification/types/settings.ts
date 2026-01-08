/**
 * Gamification Settings Integration Types
 * Wrapper types for integrating gamification into settings
 */

import type { GamificationConfig } from "./index";
import type { GamificationScreenProps } from "../components/GamificationScreen/types";

/**
 * Configuration for gamification in settings
 */
export interface GamificationSettingsConfig {
  enabled: boolean;
  config: GamificationConfig;
  screenProps: Omit<GamificationScreenProps, "levelProps" | "stats" | "achievements">;
  onNavigate?: () => void;
}

/**
 * Configuration for gamification menu item
 */
export interface GamificationMenuConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
}
