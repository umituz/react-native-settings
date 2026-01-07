/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useLocalization, LanguageSelectionScreen } from "@umituz/react-native-localization";
import { NotificationSettingsScreen } from "@umituz/react-native-notifications";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
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
  createScreenOptions,
  createAppearanceScreenOptions,
  createAboutScreenOptions,
  createLegalScreenOptions,
  createNotificationsScreenOptions,
  createFAQScreenOptions,
  createLanguageSelectionScreenOptions,
} from "./utils";
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

  const screenOptions = React.useMemo(() => createScreenOptions(tokens), [tokens]);
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
        options={{ headerShown: false }}
      >
        {() => (
          <SettingsScreenWrapper
            config={config}
            appVersion={appInfo.version}
            showUserProfile={showUserProfile}
            userProfile={userProfile}
            devSettings={devSettings}
            customSections={customSections}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={createAppearanceScreenOptions(t)}
      />

      <Stack.Screen
        name="About"
        options={createAboutScreenOptions(t)}
      >
        {() => <AboutScreenWrapper config={aboutConfig} />}
      </Stack.Screen>

      <Stack.Screen
        name="Legal"
        options={createLegalScreenOptions(t)}
      >
        {() => <LegalScreenWrapper {...legalScreenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Notifications"
        options={createNotificationsScreenOptions(t)}
      >
        {() => (
          <NotificationSettingsScreen
            translations={notificationTranslations}
            quietHoursTranslations={quietHoursTranslations}
          />
        )}
      </Stack.Screen>

      {faqData && faqData.categories.length > 0 && (
        <Stack.Screen name="FAQ" options={createFAQScreenOptions(t)}>
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

      <Stack.Screen
        name="LanguageSelection"
        options={createLanguageSelectionScreenOptions(t)}
      >
        {() => (
          <LanguageSelectionScreen
            searchPlaceholder={t("settings.languageSelection.searchPlaceholder")}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
