/**
 * Main Settings Configuration Type
 * Combines all feature configurations
 */

import type { FeatureVisibility } from "./FeatureConfig";
import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
  DisclaimerConfig,
  UserProfileConfig,
  SubscriptionConfig,
  FeedbackConfig,
  RatingConfig,
  FAQConfig,
} from "./FeatureConfig";

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
export interface SettingsConfig {
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
   * Subscription/Premium settings
   * App must provide all data via sectionConfig
   * @default false
   */
  subscription?: FeatureVisibility | SubscriptionConfig;

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
   * Custom empty state text when no settings are available
   */
  emptyStateText?: string;
}