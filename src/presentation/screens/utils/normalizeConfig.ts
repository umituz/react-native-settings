/**
 * Config Normalization Utilities
 * Single Responsibility: Normalize config values to consistent format
 */

import type {
  FeatureVisibility,
  AppearanceConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
  AccountConfig,
  SupportConfig,
  DeveloperConfig,
} from "../types";

export interface NormalizedConfig {
  appearance: {
    enabled: boolean;
    config?: AppearanceConfig;
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
  account: {
    enabled: boolean;
    config?: AccountConfig;
  };
  support: {
    enabled: boolean;
    config?: SupportConfig;
  };
  developer: {
    enabled: boolean;
    config?: DeveloperConfig;
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
    return { enabled: defaultValue === true };
  }

  if (typeof value === "boolean" || value === "auto") {
    return { enabled: value === true };
  }

  // It's a config object
  const config = value as T;
  const enabled =
    (config as { enabled?: FeatureVisibility })?.enabled ?? defaultValue;
  return {
    enabled: enabled === true,
    config,
  };
}

/**
 * Normalize entire SettingsConfig to consistent format
 */
export function normalizeSettingsConfig(
  config: any,
): NormalizedConfig {
  return {
    appearance: normalizeConfigValue(config?.appearance, "auto"),
    notifications: normalizeConfigValue(config?.notifications, "auto"),
    about: normalizeConfigValue(config?.about, "auto"),
    legal: normalizeConfigValue(config?.legal, "auto"),
    account: normalizeConfigValue(config?.account, false),
    support: normalizeConfigValue(config?.support, false),
    developer: normalizeConfigValue(config?.developer, false),
  };
}

