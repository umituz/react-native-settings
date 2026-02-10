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
import type { TranslationFunction } from "./types";
import { createBaseConfig, createConfigWithExtensions } from "../../../infrastructure/utils/configFactory";

/**
 * Create appearance configuration
 */
export const createAppearanceConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): AppearanceConfig => {
  return createBaseConfig<AppearanceConfig>({
    t,
    titleKey: "settings.appearance.title",
    descriptionKey: "settings.appearance.description",
    icon: "color-palette-outline",
    routeOrOnPress,
  });
};

/**
 * Create language configuration
 */
export const createLanguageConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): LanguageConfig => {
  return createBaseConfig<LanguageConfig>({
    t,
    titleKey: "settings.language.title",
    descriptionKey: "settings.language.description",
    icon: "globe-outline",
    routeOrOnPress,
  });
};

/**
 * Create notifications configuration
 */
export const createNotificationsConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): NotificationsConfig => {
  return createConfigWithExtensions<NotificationsConfig>(
    {
      t,
      titleKey: "settings.notifications.title",
      descriptionKey: "settings.notifications.description",
      icon: "notifications-outline",
      routeOrOnPress,
      defaultRoute: "Notifications",
    },
    {
      showToggle: false,
      sectionTitle: t("settings.notifications.sectionTitle"),
    }
  );
};

/**
 * Create about configuration
 */
export const createAboutConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): AboutConfig => {
  return createBaseConfig<AboutConfig>({
    t,
    titleKey: "settings.about.title",
    descriptionKey: "settings.about.description",
    icon: "information-circle-outline",
    routeOrOnPress,
  });
};

/**
 * Create legal configuration
 */
export const createLegalConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): LegalConfig => {
  return createBaseConfig<LegalConfig>({
    t,
    titleKey: "settings.legal.title",
    descriptionKey: "settings.legal.description",
    icon: "document-text-outline",
    routeOrOnPress,
  });
};
