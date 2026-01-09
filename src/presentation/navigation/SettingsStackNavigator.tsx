/**
 * Settings Stack Navigator
 *
 * Complete settings navigation with all screens.
 * Receives appInfo and legalUrls from app.
 */

import React, { useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useLocalization, LanguageSelectionScreen } from "@umituz/react-native-localization";
import { NotificationSettingsScreen } from "@umituz/react-native-notifications";
import { AccountScreen, useAuth, useAuthModalStore } from "@umituz/react-native-auth";
import { useAppDesignTokens, AlertService } from "@umituz/react-native-design-system";
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
  createGamificationScreenOptions,
  createAccountScreenOptions,
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
  additionalScreens = [],
  devSettings,
  customSections = [],
  showHeader = true,
  gamificationConfig,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { user, deleteAccount, signOut } = useAuth();
  const { showAuthModal } = useAuthModalStore();
  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      AlertService.createErrorAlert(t("common.error"), t("auth.errors.unknownError"));
    }
  }, [signOut, t]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
    } catch (error) {
      AlertService.createErrorAlert(t("common.error"), t("account.deleteErrorMessage"));
    }
  }, [deleteAccount, t]);

  const handleSignIn = useCallback(() => {
    showAuthModal(() => {}, "login");
  }, [showAuthModal]);

  const isAnonymous = user?.isAnonymous ?? true;

  const accountConfig = {
    profile: {
      displayName: userProfile?.displayName || user?.displayName || t("settings.profile.anonymousName"),
      userId: userProfile?.userId || user?.uid,
      isAnonymous,
      avatarUrl: userProfile?.avatarUrl || user?.photoURL || undefined,
    },
    isAnonymous,
    editProfileText: t("settings.account.editProfile"),
    onSignIn: handleSignIn,
    accountActions: {
      onSignOut: handleSignOut,
      onDeleteAccount: handleDeleteAccount,
      signOutText: t("auth.signOut"),
      deleteAccountText: t("account.deleteAccount"),
      confirmDeleteTitle: t("auth.deleteAccountConfirmTitle"),
      confirmDeleteMessage: t("auth.deleteAccountConfirmMessage"),
    },
  };

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
            showHeader={showHeader}
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

      {gamificationConfig?.enabled && (
        <Stack.Screen
          name="Gamification"
          options={createGamificationScreenOptions(t)}
        >
          {() => <GamificationScreenWrapper config={gamificationConfig} />}
        </Stack.Screen>
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

      <Stack.Screen
        name="Account"
        options={createAccountScreenOptions(t)}
      >
        {() => <AccountScreen config={accountConfig} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
