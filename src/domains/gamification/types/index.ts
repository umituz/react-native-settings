/**
 * Gamification Types
 * Generic types for 100+ apps - NO app-specific code
 */

// Achievement Definition (provided by app)
export interface AchievementDefinition {
  id: string;
  threshold: number;
  type: "count" | "streak" | "milestone";
  title: string;
  description: string;
  icon: string;
}

// Achievement State (internal)
export interface Achievement extends AchievementDefinition {
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
}

// Level Definition (provided by app)
export interface LevelDefinition {
  level: number;
  minPoints: number;
  maxPoints: number;
}

// Level State (internal)
export interface LevelState {
  currentLevel: number;
  currentPoints: number;
  pointsToNext: number;
  progress: number;
}

// Streak State
export interface StreakState {
  current: number;
  longest: number;
  lastActivityDate: string | null;
}

// Gamification Translations
export interface GamificationTranslations {
  title: string;
  statsTitle: string;
  achievementsTitle: string;
  streakTitle: string;
  bestStreak: string;
  currentStreak: string;
  days: string;
  levelTitle: string;
  emptyAchievements: string;
}

// Gamification Config (provided by app via props)
export interface GamificationConfig {
  storageKey: string;
  achievements: AchievementDefinition[];
  levels: LevelDefinition[];
  pointsPerAction?: number;
  streakBonusMultiplier?: number;
  enabled?: boolean;
  translations: GamificationTranslations;
}

export type GamificationSettingsConfig = GamificationConfig;

// Store State
export interface GamificationState {
  points: number;
  totalTasksCompleted: number;
  achievements: Achievement[];
  streak: StreakState;
  isLoading: boolean;
  isInitialized: boolean;
}

// Store Actions
export interface GamificationActions {
  initialize: (config: GamificationConfig) => Promise<void>;
  addPoints: (amount: number) => void;
  completeTask: () => void;
  updateStreak: () => void;
  checkAchievements: () => Achievement[];
  reset: () => Promise<void>;
}

// Combined Store
export type GamificationStore = GamificationState & GamificationActions;

// UI Component Props (all text via props - NO hardcoded strings)
export interface LevelProgressProps {
  level: number;
  points: number;
  levelTitle: string;
  pointsToNext: number;
  progress: number;
  showPoints?: boolean;
}

export interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  threshold: number;
}

export interface StreakDisplayProps {
  current: number;
  longest: number;
  streakLabel: string;
  bestLabel: string;
}

export interface PointsBadgeProps {
  points: number;
  label?: string;
}
