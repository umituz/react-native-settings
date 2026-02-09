/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Handles auth, feedback, and all settings config internally.
 * Apps pass subscription config from subscription package.
 */

import { useMemo, useCallback } from "react";
import { Linking } from "react-native";
import {
  useAuth,
  useAccountManagement,
  useAuthModalStore,
  useUserProfile,
} from "@umituz/react-native-auth";
import { AlertService } from "@umituz/react-native-design-system";
import { useLocalization } from "../../domains/localization";
import {
  createAppearanceConfig,
  createLanguageConfig,
  createNotificationsConfig,
  createAboutConfig,
  createLegalConfig,
  createFeedbackConfig,
  createRatingConfig,
  createFAQConfig,
  createSubscriptionConfig,
} from "../utils/config-creators";
import { createUserProfileDisplay } from "../utils/userProfileUtils";
import { createAccountConfig } from "../utils/accountConfigUtils";
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
  const { user, loading, isAuthReady, signOut } = useAuth();
  const { deleteAccount } = useAccountManagement();
  const userProfileData = useUserProfile({});
  const { showAuthModal } = useAuthModalStore();

  const handleRatePress = useCallback(async () => {
    const url = appInfo.appStoreUrl;
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    }
  }, [appInfo.appStoreUrl]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch {
      AlertService.createErrorAlert(t("common.error"), t("auth.errors.unknownError"));
    }
  }, [signOut, t]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
    } catch {
      AlertService.createErrorAlert(t("common.error"), t("settings.account.deleteError"));
    }
  }, [deleteAccount, t]);

  const handleSignIn = useCallback(() => {
    showAuthModal(() => {}, "login");
  }, [showAuthModal]);

  const settingsConfig = useMemo((): SettingsConfig => ({
    appearance: showAppearance ? createAppearanceConfig(t) : false,
    language: showLanguage ? createLanguageConfig(t) : false,
    notifications: showNotifications ? createNotificationsConfig(t) : false,
    feedback: showFeedback ? createFeedbackConfig(t, onFeedbackSubmit) : false,
    about: showAbout ? createAboutConfig(t) : false,
    legal: showLegal ? createLegalConfig(t) : false,
    faqs: showFaqs ? createFAQConfig(t) : false,
    rating: showRating ? createRatingConfig(t, handleRatePress, appInfo.appStoreUrl || "") : false,
    subscription: createSubscriptionConfig(t, isPremium, "SubscriptionDetail"),
    disclaimer: false,
  }), [
    t, onFeedbackSubmit, handleRatePress, appInfo.appStoreUrl, isPremium,
    showAppearance, showLanguage, showNotifications, showFeedback,
    showAbout, showLegal, showFaqs, showRating,
  ]);

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

  const translatedFaqData = useMemo((): FAQData | undefined => {
    if (!faqData) return undefined;
    return {
      categories: faqData.categories.map((category) => ({
        id: category.id,
        title: t(category.title),
        items: category.items.map((item) => ({
          id: item.id,
          question: t(item.question, { appName: appInfo.name }),
          answer: t(item.answer, { appName: appInfo.name }),
        })),
      })),
    };
  }, [faqData, t, appInfo.name]);

  return {
    settingsConfig,
    userProfile,
    accountConfig,
    translatedFaqData,
    isLoading: loading,
    isAuthReady,
  };
};
