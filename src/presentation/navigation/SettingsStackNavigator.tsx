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
        name="Settings"
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
