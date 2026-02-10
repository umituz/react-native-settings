/**
 * Main Settings Configuration Type
 * Combines all feature configurations
 */

import type { FeatureVisibility } from "./BaseTypes";
import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
  DisclaimerConfig,
} from "./ContentConfig";
import type {
  UserProfileConfig,
  FeedbackConfig,
  RatingConfig,
  FAQConfig,
  CloudSyncConfig,
  SubscriptionConfig,
  WalletConfig,
  GamificationItemConfig,
  VideoTutorialConfig,
} from "./UserFeatureConfig";

/**
 * Main Settings Configuration
 *
 * Controls which settings features are visible in the SettingsScreen.
 * Each feature can be configured with:
 * - Simple: boolean | 'auto' (quick setup)
 * - Advanced: Detailed config object (full control)
 *
 * @example
 * // Simple configuration
 * const config: SettingsConfig = {
 *   appearance: true,
 *   notifications: 'auto',
 *   about: false,
 * };
 *
 * @example
 * // Advanced configuration
 * const config: SettingsConfig = {
 *   appearance: {
 *     enabled: true,
 *     route: 'CustomAppearance',
 *     showTheme: true,
 *   },
 *   notifications: {
 *     enabled: 'auto',
 *     showToggle: true,
 *     initialValue: false,
 *   },
 * };
 */
/**
 * Global Settings Translations
 */
export interface SettingsTranslations {
  sections?: {
    app?: string;
    progress?: string;
    about?: string;
    support?: string;
    subscription?: string;
  };
  features?: {
    appearance?: { title?: string; description?: string };
    language?: { title?: string };
    notifications?: { title?: string; description?: string };
    about?: { title?: string; description?: string };
    legal?: { title?: string; description?: string };
    feedback?: { title?: string; description?: string };
    rating?: { title?: string; description?: string };
    faqs?: { title?: string; description?: string };
  };
  feedbackModal?: {
    title?: string;
    ratingLabel?: string;
    descriptionPlaceholder?: string;
    submitButton?: string;
    submittingButton?: string;
    types?: {
      general?: string;
      bugReport?: string;
      featureRequest?: string;
      improvement?: string;
      other?: string;
    };
  };
  noOptionsAvailable?: string;
  footer?: {
    version?: string;
  };
}

export interface SettingsConfig {
  /**
   * Application-wide translations
   */
  translations?: SettingsTranslations;

  /**
   * Appearance settings (Theme customization)
   * @default 'auto'
   */
  appearance?: FeatureVisibility | AppearanceConfig;

  /**
   * Language settings
   * @default 'auto'
   */
  language?: FeatureVisibility | LanguageConfig;

  /**
   * Notifications settings
   * @default 'auto'
   */
  notifications?: FeatureVisibility | NotificationsConfig;

  /**
   * About settings
   * @default 'auto'
   */
  about?: FeatureVisibility | AboutConfig;

  /**
   * Legal settings (Terms, Privacy Policy)
   * @default 'auto'
   */
  legal?: FeatureVisibility | LegalConfig;

  /**
   * Disclaimer settings (Important notices)
   * @default false
   */
  disclaimer?: FeatureVisibility | DisclaimerConfig;

  /**
   * User profile header settings
   * @default false
   */
  userProfile?: boolean | UserProfileConfig;

  /**
   * Feedback settings
   * @default 'auto'
   */
  feedback?: FeatureVisibility | FeedbackConfig;

  /**
   * Rating settings configuration
   */
  rating?: FeatureVisibility | RatingConfig;

  /**
   * FAQ settings configuration
   */
  faqs?: FeatureVisibility | FAQConfig;

  /**
   * Cloud sync settings configuration
   * @default false
   */
  cloudSync?: FeatureVisibility | CloudSyncConfig;

  /**
   * Subscription settings configuration
   * @default false
   */
  subscription?: FeatureVisibility | SubscriptionConfig;

  /**
   * Wallet settings configuration
   * @default false
   */
  wallet?: FeatureVisibility | WalletConfig;

  /**
   * Gamification settings configuration
   * @default 'auto'
   */
  gamification?: FeatureVisibility | GamificationItemConfig;

  /**
   * Video tutorial settings configuration
   * @default 'auto'
   */
  videoTutorial?: FeatureVisibility | VideoTutorialConfig;

  /**
   * Custom empty state text when no settings are available
   */
  emptyStateText?: string;
}
