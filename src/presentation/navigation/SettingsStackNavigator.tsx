/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { NotificationSettingsScreen } from "@umituz/react-native-notifications";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppearanceScreen } from "../screens/AppearanceScreen";
import { LegalScreen } from "../../domains/legal";
import { AboutScreen } from "../../domains/about";
import { FAQScreen } from "../../domains/faqs";
import { useNavigationHandlers } from "./hooks";
import type { SettingsStackParamList, SettingsStackNavigatorProps } from "./types";

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator: React.FC<SettingsStackNavigatorProps> = ({
  appInfo,
  legalUrls,
  faqData,
  config = {},
  showUserProfile = false,
  userProfile,
  additionalScreens = [],
  devSettings,
  customSections = [],
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls);

  const screenOptions = useMemo(
    () => ({
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
    }),
    [tokens]
  );

  const SettingsScreenWrapper = useMemo(() => {
    const Wrapper = () => (
      <SettingsScreen
        config={config}
        appVersion={appInfo.version}
        showUserProfile={showUserProfile}
        userProfile={userProfile}
        devSettings={devSettings}
        customSections={customSections}
      />
    );
    Wrapper.displayName = "SettingsScreenWrapper";
    return Wrapper;
  }, [config, appInfo.version, showUserProfile, userProfile, devSettings, customSections]);

  const notificationTranslations = useMemo(
    () => ({
      screenTitle: t("settings.notifications.title"),
      masterToggleTitle: t("settings.notifications.masterToggleTitle"),
      masterToggleDescription: t("settings.notifications.masterToggleDescription"),
      soundTitle: t("settings.notifications.soundTitle"),
      soundDescription: t("settings.notifications.soundDescription"),
      vibrationTitle: t("settings.notifications.vibrationTitle"),
      vibrationDescription: t("settings.notifications.vibrationDescription"),
      remindersTitle: t("settings.notifications.remindersTitle"),
      remindersDescription: t("settings.notifications.remindersDescription"),
      quietHoursTitle: t("settings.notifications.quietHoursTitle"),
      quietHoursDescription: t("settings.notifications.quietHoursDescription"),
    }),
    [t]
  );

  const quietHoursTranslations = useMemo(
    () => ({
      title: t("settings.notifications.quietHours.title"),
      description: t("settings.notifications.quietHours.description"),
      startTimeLabel: t("settings.notifications.quietHours.startTimeLabel"),
      endTimeLabel: t("settings.notifications.quietHours.endTimeLabel"),
      enabledLabel: t("settings.notifications.quietHours.enabledLabel"),
    }),
    [t]
  );

  const LegalScreenWrapper = useMemo(() => {
    const Wrapper = () => (
      <LegalScreen
        title={t("settings.legal.title")}
        description={t("settings.legal.description")}
        documentsHeader={t("settings.legal.documentsHeader")}
        privacyTitle={t("settings.legal.privacyTitle")}
        privacyDescription={t("settings.legal.privacyDescription")}
        termsTitle={t("settings.legal.termsTitle")}
        termsDescription={t("settings.legal.termsDescription")}
        eulaTitle={t("settings.legal.eulaTitle")}
        eulaDescription={t("settings.legal.eulaDescription")}
        onPrivacyPress={handlePrivacyPress}
        onTermsPress={handleTermsPress}
        onEulaPress={handleEulaPress}
      />
    );
    Wrapper.displayName = "LegalScreenWrapper";
    return Wrapper;
  }, [t, handlePrivacyPress, handleTermsPress, handleEulaPress]);

  const AboutScreenWrapper = useMemo(() => {
    const Wrapper = () => <AboutScreen config={aboutConfig} />;
    Wrapper.displayName = "AboutScreenWrapper";
    return Wrapper;
  }, [aboutConfig]);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreenWrapper}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          headerShown: true,
          headerTitle: t("settings.appearance.title"),
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreenWrapper}
        options={{
          headerShown: true,
          headerTitle: t("settings.about.title"),
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Legal"
        component={LegalScreenWrapper}
        options={{
          headerShown: true,
          headerTitle: t("settings.legal.title"),
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Notifications"
        options={{
          headerShown: true,
          headerTitle: t("settings.notifications.title"),
          headerTitleAlign: "center",
        }}
      >
        {() => (
          <NotificationSettingsScreen
            translations={notificationTranslations}
            quietHoursTranslations={quietHoursTranslations}
          />
        )}
      </Stack.Screen>

      {faqData && faqData.categories.length > 0 && (
        <Stack.Screen
          name="FAQ"
          options={{
            headerShown: true,
            headerTitle: t("settings.faqs.title"),
            headerTitleAlign: "center",
          }}
        >
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
    </Stack.Navigator>
  );
};
