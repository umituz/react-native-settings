/**
 * Base Settings Config Creators
 * Standard settings: appearance, language, notifications, about, legal
 * Refactored to use configFactory pattern for consistency
 */

import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
} from "../../screens/types";
import { createBaseConfig, createConfigWithExtensions } from "../../../infrastructure/utils/configFactory";

/**
 * Create appearance configuration
 */
export const createAppearanceConfig = (
  routeOrOnPress?: string | (() => void),
): AppearanceConfig => {
  return createBaseConfig<AppearanceConfig>({
    routeOrOnPress,
  });
};

/**
 * Create language configuration
 */
export const createLanguageConfig = (
  routeOrOnPress?: string | (() => void),
): LanguageConfig => {
  return createBaseConfig<LanguageConfig>({
    routeOrOnPress,
  });
};

/**
 * Create notifications configuration
 */
export const createNotificationsConfig = (
  routeOrOnPress?: string | (() => void),
): NotificationsConfig => {
  return createConfigWithExtensions<NotificationsConfig>(
    {
      routeOrOnPress,
      defaultRoute: "Notifications",
    },
    {
      showToggle: false,
    }
  );
};

/**
 * Create about configuration
 */
export const createAboutConfig = (
  routeOrOnPress?: string | (() => void),
): AboutConfig => {
  return createBaseConfig<AboutConfig>({
    routeOrOnPress,
  });
};

/**
 * Create legal configuration
 */
export const createLegalConfig = (
  routeOrOnPress?: string | (() => void),
): LegalConfig => {
  return createBaseConfig<LegalConfig>({
    routeOrOnPress,
  });
};
