/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React from "react";
import {
  StackNavigator,
  type StackNavigatorConfig,
} from "@umituz/react-native-design-system";
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
    config,
  } = props;
  const translations = config?.translations?.features;
  const aboutTranslations = translations?.about;

  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls, aboutTranslations);

  const screenOptions = React.useMemo(
    () => ({
      headerShown: false,
    }),
    []
  );

  const notificationTranslations = React.useMemo(() => createNotificationTranslations(translations), [translations]);
  const quietHoursTranslations = React.useMemo(() => createQuietHoursTranslations(translations), [translations]);
  const legalScreenProps = React.useMemo(
    () => createLegalScreenProps(translations, handlePrivacyPress, handleTermsPress, handleEulaPress),
    [translations, handlePrivacyPress, handleTermsPress, handleEulaPress]
  );

  const screens = useSettingsScreens({
    ...props,
    aboutConfig,
    legalProps: legalScreenProps,
    notificationTranslations,
    quietHoursTranslations,
  });

  const navigatorConfig: StackNavigatorConfig<SettingsStackParamList> = {
    id: "SettingsStack",
    initialRouteName: "SettingsMain",
    screenOptions,
    screens,
  };

  return <StackNavigator<SettingsStackParamList> config={navigatorConfig} />;
};
