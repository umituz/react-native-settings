/**
 * Base Settings Config Creators
 * Standard settings: appearance, language, notifications, about, legal
 */

import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
} from "../../screens/types";
import type { TranslationFunction } from "./types";

/**
 * Create appearance configuration
 */
export const createAppearanceConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): AppearanceConfig => ({
  enabled: true,
  title: t("settings.appearance.title"),
  description: t("settings.appearance.description"),
  icon: "color-palette-outline",
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
});

/**
 * Create language configuration
 */
export const createLanguageConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): LanguageConfig => ({
  enabled: true,
  title: t("settings.language.title"),
  description: t("settings.language.description"),
  icon: "globe-outline",
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
});

/**
 * Create notifications configuration
 */
export const createNotificationsConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): NotificationsConfig => ({
  enabled: true,
  showToggle: false,
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : "Notifications",
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
  title: t("settings.notifications.title"),
  description: t("settings.notifications.description"),
  sectionTitle: t("settings.notifications.sectionTitle"),
  icon: "notifications-outline",
});

/**
 * Create about configuration
 */
export const createAboutConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): AboutConfig => ({
  enabled: true,
  title: t("settings.about.title"),
  description: t("settings.about.description"),
  icon: "information-circle-outline",
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
});

/**
 * Create legal configuration
 */
export const createLegalConfig = (
  t: TranslationFunction,
  routeOrOnPress?: string | (() => void),
): LegalConfig => ({
  enabled: true,
  title: t("settings.legal.title"),
  description: t("settings.legal.description"),
  icon: "document-text-outline",
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
});
