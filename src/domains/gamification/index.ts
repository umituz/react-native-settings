/**
 * Gamification Domain - Public API
 */

// Types
export type {
  GamificationSettingsConfig,
  GamificationMenuConfig,
} from "./types";

// Components
export { GamificationScreenWrapper } from "./components/GamificationScreenWrapper";
export type { GamificationScreenWrapperProps } from "./components/GamificationScreenWrapper";

export { GamificationSettingsItem } from "./components/GamificationSettingsItem";
export type { GamificationSettingsItemProps } from "./components/GamificationSettingsItem";

// Re-export from gamification package for convenience
export {
  useGamification,
  useGamificationStore,
  LevelProgress,
  PointsBadge,
  AchievementCard,
  AchievementToast,
  StreakDisplay,
  StatsCard,
  AchievementItem,
} from "@umituz/react-native-gamification";

export type {
  GamificationConfig,
  GamificationState,
  Achievement,
  LevelState,
  StreakState,
  UseGamificationReturn,
} from "@umituz/react-native-gamification";
