/**
 * @umituz/react-native-gamification
 *
 * Generic gamification system for React Native apps
 * All text via props - NO hardcoded strings
 * Designed for 100+ apps
 */

// Types
export type {
  AchievementDefinition,
  Achievement,
  LevelDefinition,
  LevelState,
  StreakState,
  GamificationConfig,
  GamificationState,
  GamificationActions,
  GamificationStore,
} from "./types";

// Settings Integration Types
export type {
  GamificationSettingsConfig,
  GamificationMenuConfig,
} from "./types/settings";

// Store
export { useGamificationStore } from "./store/gamificationStore";

// Hooks
export { useGamification, type UseGamificationReturn } from "./hooks/useGamification";

// Utils
export {
  calculateLevel,
  checkAchievementUnlock,
  updateAchievementProgress,
  isStreakActive,
  isSameDay,
} from "./utils/calculations";

// Components
export {
  LevelProgress,
  type LevelProgressProps,
  PointsBadge,
  type PointsBadgeProps,
  AchievementCard,
  type AchievementCardProps,
  AchievementToast,
  type AchievementToastProps,
  StreakDisplay,
  type StreakDisplayProps,
  StatsCard,
  type StatsCardProps,
  AchievementItem,
  type AchievementItemProps,
  GamificationScreen,
  type GamificationScreenProps,
} from "./components";

// Settings Integration Components
export { GamificationScreenWrapper } from "./components/GamificationScreenWrapper";
export { GamificationSettingsItem } from "./components/GamificationSettingsItem";
