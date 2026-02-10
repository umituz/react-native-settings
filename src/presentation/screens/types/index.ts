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
  GamificationItemConfig,
  VideoTutorialConfig,
} from "./UserFeatureConfig";
export type { GamificationSettingsConfig as GamificationConfig } from "../../../domains/gamification";
export type { SettingsConfig, SettingsTranslations } from "./SettingsConfig";
export type { CustomSettingsSection } from "./CustomSection";
