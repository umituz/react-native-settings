/**
 * Settings Config Creators
 * Utility functions to create standard settings configurations
 * Used across 100+ apps - keep generic and flexible
 */

import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
  FeedbackConfig,
  UserProfileConfig,
  RatingConfig,
  FAQConfig,
  SubscriptionConfig,
} from "../screens/types";
import type {
  GamificationConfig,
  AchievementDefinition,
  LevelDefinition,
} from "../../domains/gamification/types";

/**
 * Translation function type
 */
export type TranslationFunction = (key: string) => string;

/**
 * Create appearance configuration
 */
export const createAppearanceConfig = (t: TranslationFunction): AppearanceConfig => ({
  enabled: true,
  title: t("settings.appearance.title"),
  description: t("settings.appearance.description"),
  icon: "color-palette-outline",
});

/**
 * Create language configuration
 */
export const createLanguageConfig = (t: TranslationFunction): LanguageConfig => ({
  enabled: true,
  title: t("settings.language.title"),
  description: t("settings.language.description"),
  icon: "globe-outline",
});

/**
 * Create notifications configuration
 */
export const createNotificationsConfig = (t: TranslationFunction): NotificationsConfig => ({
  enabled: true,
  showToggle: false,
  route: "Notifications",
  title: t("settings.notifications.title"),
  description: t("settings.notifications.description"),
  sectionTitle: t("settings.notifications.sectionTitle"),
  icon: "notifications-outline",
});

/**
 * Create about configuration
 */
export const createAboutConfig = (t: TranslationFunction): AboutConfig => ({
  enabled: true,
  title: t("settings.about.title"),
  description: t("settings.about.description"),
  icon: "information-circle-outline",
});

/**
 * Create legal configuration
 */
export const createLegalConfig = (t: TranslationFunction): LegalConfig => ({
  enabled: true,
  title: t("settings.legal.title"),
  description: t("settings.legal.description"),
  icon: "document-text-outline",
});

/**
 * Feedback form data interface
 */
export interface FeedbackFormData {
  type: string;
  rating: number;
  description: string;
  title: string;
}

/**
 * Create feedback configuration
 */
export const createFeedbackConfig = (
  t: TranslationFunction,
  onSubmit: (data: FeedbackFormData) => Promise<void>,
): FeedbackConfig => ({
  enabled: true,
  title: t("settings.feedback.title"),
  description: t("settings.feedback.description"),
  icon: "chatbubble-outline",
  sectionTitle: t("settings.sections.support"),
  onSubmit,
});

/**
 * Create rating configuration
 */
export const createRatingConfig = (
  t: TranslationFunction,
  onRate: () => void,
  storeUrl?: string,
): RatingConfig => ({
  enabled: true,
  onRate,
  storeUrl,
});

/**
 * Create FAQ configuration
 */
export const createFAQConfig = (
  t: TranslationFunction,
  onPress: () => void,
): FAQConfig => ({
  enabled: true,
  title: t("settings.faqs.title"),
  description: t("settings.faqs.description"),
  icon: "help-circle-outline",
  sectionTitle: t("settings.sections.support").toUpperCase(),
  onPress,
});

/**
 * Create subscription configuration
 * @param route - Navigation route name (preferred for stack navigation)
 * @param onPress - Callback function (use route instead when possible)
 */
export const createSubscriptionConfig = (
  t: TranslationFunction,
  isPremium: boolean,
  routeOrOnPress: string | (() => void),
): SubscriptionConfig => ({
  enabled: true,
  title: t("settings.subscription.title"),
  description: isPremium
    ? t("subscription.premiumDetails.statusActive")
    : t("settings.subscription.description"),
  icon: "diamond",
  sectionTitle: t("settings.sections.subscription").toUpperCase(),
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
  isPremium,
});

/**
 * Create gamification configuration
 */
export const createGamificationConfig = (
  t: TranslationFunction,
  storageKey: string,
  achievements: AchievementDefinition[],
  levels: LevelDefinition[],
  enabled = true,
): GamificationConfig => ({
  enabled,
  storageKey,
  achievements,
  levels,
  translations: {
    title: t("settings.gamification.title"),
    statsTitle: t("settings.gamification.stats.title"),
    achievementsTitle: t("settings.gamification.achievements.title"),
    streakTitle: t("settings.gamification.streak.title"),
    bestStreak: t("settings.gamification.streak.best"),
    currentStreak: t("settings.gamification.streak.current"),
    days: t("settings.gamification.streak.days"),
    levelTitle: t("settings.gamification.level.title"),
    emptyAchievements: t("settings.gamification.achievements.empty"),
  },
});
