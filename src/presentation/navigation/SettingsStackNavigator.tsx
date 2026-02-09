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
import { useLocalization } from "../../domains/localization";
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
  } = props;
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
