/**
 * Navigation Screen Options Utility
 * Creates screen options for settings navigation
 */

import type { DesignTokens } from "@umituz/react-native-design-system";

export const createScreenOptions = (tokens: DesignTokens) => ({
  headerStyle: {
    backgroundColor: tokens.colors.surface,
    borderBottomColor: tokens.colors.borderLight,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: tokens.colors.textPrimary,
  },
  headerTintColor: tokens.colors.textPrimary,
});

export const createAppearanceScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.appearance.title"),
  headerTitleAlign: "center" as const,
});

export const createAboutScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.about.title"),
  headerTitleAlign: "center" as const,
});

export const createLegalScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.legal.title"),
  headerTitleAlign: "center" as const,
});

export const createNotificationsScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.notifications.title"),
  headerTitleAlign: "center" as const,
});

export const createFAQScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.faqs.title"),
  headerTitleAlign: "center" as const,
});

export const createLanguageSelectionScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.language.title"),
  headerTitleAlign: "center" as const,
});

export const createGamificationScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.gamification.title"),
  headerTitleAlign: "center" as const,
});

export const createAccountScreenOptions = (t: any) => ({
  headerShown: true,
  headerTitle: t("settings.account.title"),
  headerTitleAlign: "center" as const,
});

