/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React from "react";
import {
  useAppDesignTokens,
  StackNavigator,
  type StackScreen,
  type StackNavigatorConfig,
} from "@umituz/react-native-design-system";
import { useLocalization, LanguageSelectionScreen } from "../../domains/localization";
import { NotificationSettingsScreen } from "../../domains/notifications";
import { AccountScreen } from "@umituz/react-native-auth";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppearanceScreen } from "../screens/AppearanceScreen";
import { FAQScreen } from "../../domains/faqs";
import { AboutScreen } from "../../domains/about";
import { LegalScreen } from "../../domains/legal";
import { GamificationScreen } from "../../domains/gamification";
import { useNavigationHandlers, useSettingsScreens } from "./hooks";
import {
  createNotificationTranslations,
  createQuietHoursTranslations,
  createLegalScreenProps,
} from "./utils";
import type { SettingsStackParamList, SettingsStackNavigatorProps } from "./types";

export const SettingsStackNavigator: React.FC<SettingsStackNavigatorProps> = (props) => {
  const {
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
  } = props;
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls);

  const screenOptions = React.useMemo(
    () => ({
      headerShown: false,
    }),
    []
  );

  const notificationTranslations = React.useMemo(() => createNotificationTranslations(t), [t]);
  const quietHoursTranslations = React.useMemo(() => createQuietHoursTranslations(t), [t]);
  const legalScreenProps = React.useMemo(
    () => createLegalScreenProps(t, handlePrivacyPress, handleTermsPress, handleEulaPress),
    [t, handlePrivacyPress, handleTermsPress, handleEulaPress]
  );

  const screens = useSettingsScreens({
    ...props,
    aboutConfig,
    legalProps: legalScreenProps,
    notificationTranslations,
    quietHoursTranslations,
    t,
  });

  const navigatorConfig: StackNavigatorConfig<SettingsStackParamList> = {
    initialRouteName: "SettingsMain",
    screenOptions,
    screens,
  };

  return <StackNavigator<SettingsStackParamList> config={navigatorConfig} />;
};
