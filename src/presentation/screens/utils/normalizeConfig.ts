/**
 * Config Normalization Utilities
 * Single Responsibility: Normalize config values to consistent format
 */

import type {
  FeatureVisibility,
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
  DisclaimerConfig,
  UserProfileConfig,
  FeedbackConfig,
  RatingConfig,
  FAQConfig,
  SubscriptionConfig,
  WalletConfig,
  GamificationItemConfig,
  SettingsConfig,
} from "../types";

export interface NormalizedConfig {
  appearance: {
    enabled: boolean;
    config?: AppearanceConfig;
  };
  language: {
    enabled: boolean;
    config?: LanguageConfig;
  };
  notifications: {
    enabled: boolean;
    config?: NotificationsConfig;
  };
  about: {
    enabled: boolean;
    config?: AboutConfig;
  };
  legal: {
    enabled: boolean;
    config?: LegalConfig;
  };
  disclaimer: {
    enabled: boolean;
    config?: DisclaimerConfig;
  };
  userProfile: {
    enabled: boolean;
    config?: UserProfileConfig;
  };
  feedback: {
    enabled: boolean;
    config?: FeedbackConfig;
  };
  rating: {
    enabled: boolean;
    config?: RatingConfig;
  };
  faqs: {
    enabled: boolean;
    config?: FAQConfig;
  };
  subscription: {
    enabled: boolean;
    config?: SubscriptionConfig;
  };
  wallet: {
    enabled: boolean;
    config?: WalletConfig;
  };
  gamification: {
    enabled: boolean;
    config?: GamificationItemConfig;
  };
}

/**
 * Normalize a config value to enabled boolean and optional config object
 */
function normalizeConfigValue<T>(
  value: FeatureVisibility | T | undefined,
  defaultValue: FeatureVisibility,
): { enabled: boolean; config?: T } {
  if (value === undefined) {
    return { enabled: defaultValue === true || defaultValue === "auto" };
  }

  if (typeof value === "boolean" || value === "auto") {
    return { enabled: value === true || value === "auto" };
  }

  // It's a config object
  const config = value as T;
  const enabledValue = (config as { enabled?: FeatureVisibility })?.enabled;
  const enabled = enabledValue !== undefined ? enabledValue : defaultValue;
  
  return {
    enabled: enabled === true || enabled === "auto",
    config,
  };
}

/**
 * Normalize entire SettingsConfig to consistent format
 */
export function normalizeSettingsConfig(
  config: SettingsConfig | undefined,
): NormalizedConfig {
  return {
    appearance: normalizeConfigValue(config?.appearance, "auto"),
    language: normalizeConfigValue(config?.language, "auto"),
    notifications: normalizeConfigValue(config?.notifications, "auto"),
    about: normalizeConfigValue(config?.about, "auto"),
    legal: normalizeConfigValue(config?.legal, "auto"),
    disclaimer: normalizeConfigValue(config?.disclaimer, false),
    userProfile: normalizeConfigValue(config?.userProfile, false),
    feedback: normalizeConfigValue(config?.feedback, false),
    rating: normalizeConfigValue(config?.rating, false),
    faqs: normalizeConfigValue(config?.faqs, false),
    subscription: normalizeConfigValue(config?.subscription, false),
    wallet: normalizeConfigValue(config?.wallet, false),
    gamification: normalizeConfigValue(config?.gamification, false),
  };
}
