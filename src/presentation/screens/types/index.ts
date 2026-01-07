/**
 * Settings Types - Public API
 * Exports all settings-related types
 */

export type { FeatureVisibility } from "./BaseTypes";
export type {
  AboutConfig,
  LegalConfig,
  DisclaimerConfig,
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
} from "./ContentConfig";
export type {
  UserProfileConfig,
  FeedbackConfig,
  FAQConfig,
  RatingConfig,
  CloudSyncConfig,
  SubscriptionConfig,
  WalletConfig,
} from "./UserFeatureConfig";
export type { SettingsConfig } from "./SettingsConfig";
export type { CustomSettingsSection } from "./CustomSection";
