import React, { useMemo } from 'react';
import type { StackScreen } from "@umituz/react-native-design-system";
import { LanguageSelectionScreen } from "../../../domains/localization";
import { NotificationSettingsScreen } from "../../../domains/notifications";
import { AccountScreen } from "@umituz/react-native-auth";
import { SettingsScreen } from "../../screens/SettingsScreen";
import { AppearanceScreen } from "../../screens/AppearanceScreen";
import { FAQScreen } from "../../../domains/faqs";
import { AboutScreen } from "../../../domains/about";
import { LegalScreen } from "../../../domains/legal";
import { GamificationScreen } from "../../../domains/gamification";
import {
  createScreenWithProps,
  convertAdditionalScreen,
  createConditionalScreen,
  combineScreens,
} from "../../utils/screenFactory";
import type { SettingsStackNavigatorProps } from "../types";

export interface UseSettingsScreensProps extends SettingsStackNavigatorProps {
  aboutConfig: any;
  legalProps: any;
  notificationTranslations: any;
  quietHoursTranslations: any;
  t: (key: string) => string;
}

export const useSettingsScreens = (props: UseSettingsScreensProps): StackScreen[] => {
  const {
    appInfo,
    config,
    showUserProfile,
    userProfile,
    devSettings,
    customSections,
    showHeader,
    showCloseButton,
    onClose,
    aboutConfig,
    legalProps,
    notificationTranslations,
    quietHoursTranslations,
    faqData,
    additionalScreens,
    gamificationConfig,
    accountConfig,
    t,
  } = props;

  return useMemo(() => {
    const settingsMainScreen = createScreenWithProps(
      "SettingsMain",
      SettingsScreen,
      {
        config,
        appVersion: appInfo.version,
        showUserProfile,
        userProfile,
        devSettings,
        customSections,
        showHeader,
        showCloseButton,
        onClose,
      }
    );

    const appearanceScreen = {
      name: "Appearance",
      component: AppearanceScreen as any,
      options: { headerShown: false },
    };

    const aboutScreen = createScreenWithProps("About", AboutScreen, { config: aboutConfig });
    const legalScreen = createScreenWithProps("Legal", LegalScreen, legalProps);

    const notificationScreen = createScreenWithProps(
      "Notifications",
      NotificationSettingsScreen,
      {
        translations: notificationTranslations,
        quietHoursTranslations,
      }
    );

    const baseScreens: StackScreen[] = [
      settingsMainScreen,
      appearanceScreen,
      aboutScreen,
      legalScreen,
      notificationScreen,
    ];

    const faqScreen = createConditionalScreen(
      !!(faqData && faqData.categories?.length > 0),
      () => createScreenWithProps("FAQ", FAQScreen, {
        categories: faqData!.categories,
        searchPlaceholder: t("settings.faqs.searchPlaceholder"),
        emptySearchTitle: t("settings.faqs.emptySearchTitle"),
        emptySearchMessage: t("settings.faqs.emptySearchMessage"),
        headerTitle: t("settings.faqs.headerTitle"),
      })
    );

    const additionalStackScreens: StackScreen[] = (additionalScreens || []).map(convertAdditionalScreen);

    const gamificationScreen = createConditionalScreen(
      !!(gamificationConfig?.enabled),
      () => createScreenWithProps("Gamification", GamificationScreen as any, { config: gamificationConfig })
    );

    const languageScreen = createScreenWithProps("LanguageSelection", LanguageSelectionScreen, {
      headerTitle: t("settings.language.title"),
      searchPlaceholder: t("settings.languageSelection.searchPlaceholder"),
    });

    const accountScreen = createConditionalScreen(
      !!accountConfig,
      () => createScreenWithProps("Account", AccountScreen as any, { config: accountConfig })
    );

    return combineScreens(
      baseScreens,
      faqScreen,
      additionalStackScreens,
      gamificationScreen,
      languageScreen,
      accountScreen
    );
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
    legalProps,
    notificationTranslations,
    quietHoursTranslations,
    faqData,
    additionalScreens,
    gamificationConfig,
    accountConfig,
  ]);
};
