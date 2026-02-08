/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React from "react";
import { useAppDesignTokens, StackNavigator, type StackScreen, type StackNavigatorConfig } from "@umituz/react-native-design-system";
import { useLocalization, LanguageSelectionScreen } from "../../domains/localization";
import { NotificationSettingsScreen } from "../../domains/notifications";
import { AccountScreen } from "@umituz/react-native-auth";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppearanceScreen } from "../screens/AppearanceScreen";
import { FAQScreen } from "../../domains/faqs";
import { AboutScreen } from "../../domains/about";
import { LegalScreen } from "../../domains/legal";
import { GamificationScreen } from "../../domains/gamification";
import { useNavigationHandlers } from "./hooks";
import {
  createNotificationTranslations,
  createQuietHoursTranslations,
  createLegalScreenProps,
} from "./utils";
import type { SettingsStackParamList, SettingsStackNavigatorProps, AdditionalScreen } from "./types";

export const SettingsStackNavigator: React.FC<SettingsStackNavigatorProps> = ({
  appInfo,
  legalUrls,
  faqData,
  config = {},
  showUserProfile = false,
  userProfile,
  accountConfig,
  additionalScreens = [],
  devSettings,
  customSections = [],
  showHeader = true,
  showCloseButton = false,
  onClose,
  gamificationConfig,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls);

  const screenOptions = React.useMemo(
    () => ({
      headerStyle: {
        backgroundColor: tokens.colors.surface,
        borderBottomColor: tokens.colors.borderLight,
        borderBottomWidth: 1,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: tokens.colors.textPrimary,
      headerTitleStyle: {
        color: tokens.colors.textPrimary,
        fontWeight: "600" as const,
      },
      headerBackTitle: t("settings.title"),
    }),
    [tokens, t]
  );

  const notificationTranslations = React.useMemo(() => createNotificationTranslations(t), [t]);
  const quietHoursTranslations = React.useMemo(() => createQuietHoursTranslations(t), [t]);
  const legalScreenProps = React.useMemo(
    () => createLegalScreenProps(t, handlePrivacyPress, handleTermsPress, handleEulaPress),
    [t, handlePrivacyPress, handleTermsPress, handleEulaPress]
  );

  const screens = React.useMemo(() => {
    const baseScreens: StackScreen[] = [
      {
        name: "SettingsMain",
        options: { headerShown: false },
        children: () => (
          <SettingsScreen
            config={config}
            appVersion={appInfo.version}
            showUserProfile={showUserProfile}
            userProfile={userProfile}
            devSettings={devSettings}
            customSections={customSections}
            showHeader={showHeader}
            showCloseButton={showCloseButton}
            onClose={onClose}
          />
        ),
      },
      {
        name: "Appearance",
        component: AppearanceScreen,
        options: { headerShown: false },
      },
      {
        name: "About",
        options: { headerTitle: t("settings.about.title") },
        children: () => <AboutScreen config={aboutConfig} />,
      },
      {
        name: "Legal",
        options: { headerTitle: t("settings.legal.title") },
        children: () => <LegalScreen {...legalScreenProps} />,
      },
      {
        name: "Notifications",
        options: { headerShown: false },
        children: () => (
          <NotificationSettingsScreen
            translations={notificationTranslations}
            quietHoursTranslations={quietHoursTranslations}
          />
        ),
      },
    ];

    // FAQ screen - conditionally add
    const faqScreen: StackScreen | null = (faqData && faqData.categories.length > 0)
      ? {
          name: "FAQ",
          options: { headerTitle: t("settings.faqs.title") },
          children: () => (
            <FAQScreen
              categories={faqData.categories}
              searchPlaceholder={t("settings.faqs.searchPlaceholder")}
              emptySearchTitle={t("settings.faqs.emptySearchTitle")}
              emptySearchMessage={t("settings.faqs.emptySearchMessage")}
              headerTitle={t("settings.faqs.headerTitle")}
            />
          ),
        }
      : null;

    // Additional screens - map to StackScreen format
    const additionalStackScreens: StackScreen[] = (additionalScreens as readonly AdditionalScreen[]).map((screen: AdditionalScreen): StackScreen => {
      // Create base screen object
      const stackScreen: Record<string, unknown> = {
        name: screen.name,
      };

      // Conditionally add properties
      if (screen.component) {
        stackScreen.component = screen.component;
      }
      if (screen.children) {
        stackScreen.children = screen.children;
      }
      if (screen.options) {
        stackScreen.options = screen.options;
      }

      // Type assertion to StackScreen
      return stackScreen as unknown as StackScreen;
    });

    // Gamification screen - conditionally add
    const gamificationScreen: StackScreen | null = gamificationConfig?.enabled
      ? {
          name: "Gamification",
          options: { headerTitle: t("settings.gamification.title") },
          children: () => <GamificationScreen config={gamificationConfig} />,
        }
      : null;

    // Language selection screen
    const languageScreen: StackScreen = {
      name: "LanguageSelection",
      options: { headerShown: false },
      children: () => (
        <LanguageSelectionScreen
          headerTitle={t("settings.language.title")}
          searchPlaceholder={t("settings.languageSelection.searchPlaceholder")}
        />
      ),
    };

    // Account screen - conditionally add
    const accountScreen: StackScreen | null = accountConfig
      ? {
          name: "Account",
          options: { headerTitle: t("settings.account.title") },
          children: () => <AccountScreen config={accountConfig} />,
        }
      : null;

    // Compose final list using spread operator (immutable)
    return [
      ...baseScreens,
      ...(faqScreen ? [faqScreen] : []),
      ...additionalStackScreens,
      ...(gamificationScreen ? [gamificationScreen] : []),
      languageScreen,
      ...(accountScreen ? [accountScreen] : []),
    ];
  }, [
    t,
    showHeader,
    showCloseButton,
    onClose,
    config,
    appInfo.version,
    showUserProfile,
    userProfile,
    devSettings,
    customSections,
    aboutConfig,
    legalScreenProps,
    notificationTranslations,
    quietHoursTranslations,
    faqData,
    additionalScreens,
    gamificationConfig,
    accountConfig,
  ]);

  const navigatorConfig: StackNavigatorConfig<SettingsStackParamList> = {
    initialRouteName: "SettingsMain",
    screenOptions,
    screens,
  };

  return <StackNavigator<SettingsStackParamList> config={navigatorConfig} />;
};
