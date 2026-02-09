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
import type { SettingsStackNavigatorProps, AdditionalScreen } from "../types";

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
    const baseScreens: StackScreen[] = [
      {
        name: "SettingsMain",
        options: { headerShown: false },
        children: () => React.createElement(SettingsScreen, {
          config,
          appVersion: appInfo.version,
          showUserProfile,
          userProfile,
          devSettings,
          customSections,
          showHeader,
          showCloseButton,
          onClose,
        }),
      },
      {
        name: "Appearance",
        component: AppearanceScreen as any,
        options: { headerShown: false },
      },
      {
        name: "About",
        options: { headerShown: false },
        children: () => React.createElement(AboutScreen, { config: aboutConfig }),
      },
      {
        name: "Legal",
        options: { headerShown: false },
        children: () => React.createElement(LegalScreen, legalProps),
      },
      {
        name: "Notifications",
        options: { headerShown: false },
        children: () => React.createElement(NotificationSettingsScreen, {
          translations: notificationTranslations,
          quietHoursTranslations,
        }),
      },
    ];

    const faqScreen: StackScreen | null = (faqData && faqData.categories?.length > 0)
      ? {
          name: "FAQ",
          options: { headerShown: false },
          children: () => React.createElement(FAQScreen, {
            categories: faqData.categories,
            searchPlaceholder: t("settings.faqs.searchPlaceholder"),
            emptySearchTitle: t("settings.faqs.emptySearchTitle"),
            emptySearchMessage: t("settings.faqs.emptySearchMessage"),
            headerTitle: t("settings.faqs.headerTitle"),
          }),
        }
      : null;

    const additionalStackScreens: StackScreen[] = (additionalScreens || []).map((screen: AdditionalScreen): StackScreen => {
      const stackScreen: any = { name: screen.name };
      if (screen.component) stackScreen.component = screen.component;
      if (screen.children) stackScreen.children = screen.children;
      if (screen.options) stackScreen.options = screen.options;
      return stackScreen as StackScreen;
    });

    const gamificationScreen: StackScreen | null = gamificationConfig?.enabled
      ? {
          name: "Gamification",
          options: { headerShown: false },
          children: () => React.createElement(GamificationScreen, { config: gamificationConfig }),
        }
      : null;

    const languageScreen: StackScreen = {
      name: "LanguageSelection",
      options: { headerShown: false },
      children: () => React.createElement(LanguageSelectionScreen, {
        headerTitle: t("settings.language.title"),
        searchPlaceholder: t("settings.languageSelection.searchPlaceholder"),
      }),
    };

    const accountScreen: StackScreen | null = accountConfig
      ? {
          name: "Account",
          options: { headerShown: false },
          children: () => React.createElement(AccountScreen, { config: accountConfig }),
        }
      : null;

    const allScreens: StackScreen[] = [
      ...baseScreens,
      ...(faqScreen ? [faqScreen] : []),
      ...additionalStackScreens,
      ...(gamificationScreen ? [gamificationScreen] : []),
      languageScreen,
      ...(accountScreen ? [accountScreen] : []),
    ];

    return allScreens;
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
