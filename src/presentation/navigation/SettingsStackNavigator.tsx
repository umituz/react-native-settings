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
import { useNavigationHandlers } from "./hooks";
import {
  LegalScreenWrapper,
  AboutScreenWrapper,
} from "./components/wrappers";
import {
  createNotificationTranslations,
  createQuietHoursTranslations,
  createLegalScreenProps,
} from "./utils";
import type { SettingsStackParamList, SettingsStackNavigatorProps } from "./types";
import { GamificationScreenWrapper } from "../../domains/gamification";

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
    const list: StackScreen[] = [
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
        children: () => <AboutScreenWrapper config={aboutConfig} />,
      },
      {
        name: "Legal",
        options: { headerTitle: t("settings.legal.title") },
        children: () => <LegalScreenWrapper {...legalScreenProps} />,
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

    if (faqData && faqData.categories.length > 0) {
      list.push({
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
      });
    }

    // Add additional screens
    additionalScreens.forEach((screen) => {
      list.push({
        name: screen.name,
        component: screen.component as StackScreen['component'],
        children: screen.children as StackScreen['children'],
        options: screen.options as StackScreen['options'],
      });
    });

    if (gamificationConfig?.enabled) {
      list.push({
        name: "Gamification",
        options: { headerTitle: t("settings.gamification.title") },
        children: () => <GamificationScreenWrapper config={gamificationConfig} />,
      });
    }

    list.push({
      name: "LanguageSelection",
      options: { headerShown: false },
      children: () => (
        <LanguageSelectionScreen
          headerTitle={t("settings.language.title")}
          searchPlaceholder={t("settings.languageSelection.searchPlaceholder")}
        />
      ),
    });

    if (accountConfig) {
      list.push({
        name: "Account",
        options: { headerTitle: t("settings.account.title") },
        children: () => <AccountScreen config={accountConfig} />,
      });
    }

    return list;
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
