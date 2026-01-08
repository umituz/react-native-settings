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
 */
export const createSubscriptionConfig = (
  t: TranslationFunction,
  isPremium: boolean,
  onPress: () => void,
): SubscriptionConfig => ({
  enabled: true,
  title: t("settings.subscription.title"),
  description: isPremium
    ? t("subscription.premiumDetails.statusActive")
    : t("settings.subscription.description"),
  icon: "diamond",
  sectionTitle: t("settings.sections.subscription").toUpperCase(),
  onPress,
  isPremium,
});
