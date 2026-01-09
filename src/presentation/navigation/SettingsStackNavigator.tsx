/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useLocalization, LanguageSelectionScreen } from "@umituz/react-native-localization";
import { NotificationSettingsScreen } from "../../domains/notifications";
import { AccountScreen } from "@umituz/react-native-auth";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

// ...


import { AppearanceScreen } from "../screens/AppearanceScreen";
import { FAQScreen } from "../../domains/faqs";
import { useNavigationHandlers } from "./hooks";
import {
  SettingsScreenWrapper,
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

const Stack = createStackNavigator<SettingsStackParamList>();

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

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="SettingsMain"
        options={showHeader ? { headerTitle: t("settings.title") } : { headerShown: false }}
      >
        {() => (
          <SettingsScreenWrapper
            config={config}
            appVersion={appInfo.version}
            showUserProfile={showUserProfile}
            userProfile={userProfile}
            devSettings={devSettings}
            customSections={customSections}
            showHeader={showHeader}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="About" options={{ headerTitle: t("settings.about.title") }}>
        {() => <AboutScreenWrapper config={aboutConfig} />}
      </Stack.Screen>

      <Stack.Screen name="Legal" options={{ headerTitle: t("settings.legal.title") }}>
        {() => <LegalScreenWrapper {...legalScreenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Notifications"
        options={{ headerShown: false }}
      >
        {() => (
          <NotificationSettingsScreen
            translations={notificationTranslations}
            quietHoursTranslations={quietHoursTranslations}
          />
        )}
      </Stack.Screen>

      {faqData && faqData.categories.length > 0 && (
        <Stack.Screen name="FAQ" options={{ headerTitle: t("settings.faqs.title") }}>
          {() => (
            <FAQScreen
              categories={faqData.categories}
              searchPlaceholder={t("settings.faqs.searchPlaceholder")}
              emptySearchTitle={t("settings.faqs.emptySearchTitle")}
              emptySearchMessage={t("settings.faqs.emptySearchMessage")}
              headerTitle={t("settings.faqs.headerTitle")}
            />
          )}
        </Stack.Screen>
      )}

      {additionalScreens.map((screen) =>
        screen.children ? (
          <Stack.Screen
            key={screen.name}
            name={screen.name as keyof SettingsStackParamList}
            options={screen.options}
          >
            {screen.children}
          </Stack.Screen>
        ) : screen.component ? (
          <Stack.Screen
            key={screen.name}
            name={screen.name as keyof SettingsStackParamList}
            component={screen.component}
            options={screen.options}
          />
        ) : null
      )}

      {gamificationConfig?.enabled && (
        <Stack.Screen
          name="Gamification"
          options={{ headerTitle: t("settings.gamification.title") }}
        >
          {() => <GamificationScreenWrapper config={gamificationConfig} />}
        </Stack.Screen>
      )}

      <Stack.Screen
        name="LanguageSelection"
        options={{ headerShown: false }}
      >
        {() => (
          <LanguageSelectionScreen
            headerTitle={t("settings.language.title")}
            searchPlaceholder={t("settings.languageSelection.searchPlaceholder")}
          />
        )}
      </Stack.Screen>

      {accountConfig && (
        <Stack.Screen name="Account" options={{ headerTitle: t("settings.account.title") }}>
          {() => <AccountScreen config={accountConfig} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
