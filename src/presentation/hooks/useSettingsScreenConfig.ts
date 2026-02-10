/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Handles auth, feedback, and all settings config internally.
 * Apps pass subscription config from subscription package.
 */

import { useMemo } from "react";
import { useAuth, useUserProfile } from "@umituz/react-native-auth";
import { useLocalization } from "../../domains/localization";
import { createUserProfileDisplay } from "../utils/userProfileUtils";
import { createAccountConfig } from "../utils/accountConfigUtils";
import { useAuthHandlers } from "../utils/useAuthHandlers";
import { translateFAQData } from "../utils/faqTranslator";
import { useSettingsConfigFactory } from "../utils/settingsConfigFactory";
import type { SettingsConfig } from "../screens/types";
import type { FeedbackFormData } from "../utils/config-creators";
import type { AppInfo, FAQData, UserProfileDisplay, AdditionalScreen } from "../navigation/types";
import type { AccountScreenConfig } from "@umituz/react-native-auth";

export interface SettingsFeatures {
  notifications?: boolean;
  appearance?: boolean;
  language?: boolean;
  feedback?: boolean;
  rating?: boolean;
  faqs?: boolean;
  about?: boolean;
  legal?: boolean;
}

export interface UseSettingsScreenConfigParams {
  appInfo: AppInfo;
  faqData?: FAQData;
  isPremium: boolean;
  onFeedbackSubmit: (data: FeedbackFormData) => Promise<void>;
  additionalScreens?: AdditionalScreen[];
  features?: SettingsFeatures;
}

export interface SettingsScreenConfigResult {
  settingsConfig: SettingsConfig;
  userProfile: UserProfileDisplay;
  accountConfig: AccountScreenConfig;
  translatedFaqData: FAQData | undefined;
  isLoading: boolean;
  isAuthReady: boolean;
}

export const useSettingsScreenConfig = (
  params: UseSettingsScreenConfigParams
): SettingsScreenConfigResult => {
  const { appInfo, faqData, isPremium, onFeedbackSubmit, features = {} } = params;

  const {
    notifications: showNotifications = true,
    appearance: showAppearance = true,
    language: showLanguage = true,
    feedback: showFeedback = true,
    rating: showRating = true,
    faqs: showFaqs = true,
    about: showAbout = true,
    legal: showLegal = true,
  } = features;

  const { t } = useLocalization();
  const { user, loading, isAuthReady } = useAuth();
  const userProfileData = useUserProfile({});

  // Use centralized auth handlers
  const { handleRatePress, handleSignOut, handleDeleteAccount, handleSignIn } =
    useAuthHandlers(appInfo);

  // Use settings config factory
  const settingsConfig = useSettingsConfigFactory({
    t,
    onFeedbackSubmit,
    handleRatePress,
    appStoreUrl: appInfo.appStoreUrl || "",
    isPremium,
    features: {
      notifications: showNotifications,
      appearance: showAppearance,
      language: showLanguage,
      feedback: showFeedback,
      rating: showRating,
      faqs: showFaqs,
      about: showAbout,
      legal: showLegal,
    },
  });

  const userProfile = useMemo(() => createUserProfileDisplay({
    profileData: userProfileData,
    t,
    onSignIn: handleSignIn,
  }), [userProfileData, t, handleSignIn]);

  const accountConfig = useMemo(() => createAccountConfig({
    displayName: userProfileData?.displayName || user?.displayName || undefined,
    userId: userProfileData?.userId ?? user?.uid ?? undefined,
    photoURL: user?.photoURL ?? undefined,
    isAnonymous: user?.isAnonymous,
    avatarUrl: userProfileData?.avatarUrl ?? undefined,
    onSignIn: handleSignIn,
    onLogout: handleSignOut,
    onDeleteAccount: handleDeleteAccount,
    t,
  }), [user, userProfileData, handleSignIn, handleSignOut, handleDeleteAccount, t]);

  // Use centralized FAQ translation
  const translatedFaqData = useMemo(() =>
    translateFAQData(faqData, t, appInfo),
    [faqData, t, appInfo]
  );

  return {
    settingsConfig,
    userProfile,
    accountConfig,
    translatedFaqData,
    isLoading: loading,
    isAuthReady,
  };
};
