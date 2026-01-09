/**
 * Gamification Domain
 * Part of @umituz/react-native-settings
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
  GamificationScreenWrapper,
} from "./components";
