/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Handles auth, feedback, and all settings config internally.
 * Apps pass subscription config from subscription package.
 */

import { useMemo } from "react";
import { useAuth, useUserProfile, useAuthHandlers } from "@umituz/react-native-auth";
import { createUserProfileDisplay } from "../utils/userProfileUtils";
import { createAccountConfig } from "../utils/accountConfigUtils";
import { translateFAQData } from "../utils/faqTranslator";
import { useSettingsConfigFactory } from "../utils/settingsConfigFactory";
import type { SettingsConfig, SettingsTranslations } from "../screens/types";
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
  gamification?: boolean;
  videoTutorial?: boolean;
  subscription?: boolean;
}

export interface UseSettingsScreenConfigParams {
  appInfo: AppInfo;
  faqData?: FAQData;
  isPremium: boolean;
  onFeedbackSubmit: (data: FeedbackFormData) => Promise<void>;
  additionalScreens?: AdditionalScreen[];
  features?: SettingsFeatures;
  translations?: SettingsTranslations;
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
  const { appInfo, faqData, isPremium, onFeedbackSubmit, features = {}, translations } = params;

  const {
    notifications: showNotifications = true,
    appearance: showAppearance = true,
    language: showLanguage = true,
    feedback: showFeedback = true,
    rating: showRating = true,
    faqs: showFaqs = true,
    about: showAbout = true,
    legal: showLegal = true,
    gamification: showGamification = true,
    videoTutorial: showVideoTutorial = true,
    subscription: showSubscription = true,
  } = features;

  const { user, loading, isAuthReady } = useAuth();
  const userProfileData = useUserProfile({});

  // Use centralized auth handlers
  const { handleRatePress, handleSignOut, handleDeleteAccount, handleSignIn } =
    useAuthHandlers(appInfo, translations?.errors);

  // Use settings config factory
  const baseSettingsConfig = useSettingsConfigFactory({
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
      gamification: showGamification,
      videoTutorial: showVideoTutorial,
      subscription: showSubscription,
    },
  });

  const settingsConfig = useMemo(() => {
    const config = {
      ...baseSettingsConfig,
      translations,
    };

    if (config.subscription && typeof config.subscription === 'object') {
      config.subscription = {
        ...config.subscription,
        enabled: true,
        title: translations?.features?.subscription?.title || config.subscription.title || "Subscription",
        description: translations?.features?.subscription?.description || config.subscription.description,
      };
    }

    if (config.gamification) {
      const existingConfig = typeof config.gamification === 'object' ? config.gamification : { enabled: true };
      config.gamification = {
        ...existingConfig,
        enabled: true,
        title: translations?.features?.gamification?.title || existingConfig.title || "Your Progress",
        description: translations?.features?.gamification?.description || existingConfig.description,
      };
    }

    if (config.videoTutorial) {
      const existingConfig = typeof config.videoTutorial === 'object' ? config.videoTutorial : { enabled: true };
      config.videoTutorial = {
        ...existingConfig,
        enabled: true,
        title: translations?.features?.videoTutorial?.title || existingConfig.title || "Video Tutorials",
        description: translations?.features?.videoTutorial?.description || existingConfig.description,
      };
    }

    return config;
  }, [baseSettingsConfig, translations]);

  const userProfile = useMemo(() => createUserProfileDisplay({
    profileData: userProfileData,
    onSignIn: handleSignIn,
  }), [userProfileData, handleSignIn]);

  const accountConfig = useMemo(() => createAccountConfig({
    displayName: userProfileData?.displayName || user?.displayName || undefined,
    userId: userProfileData?.userId || user?.uid || undefined,
    photoURL: user?.photoURL || undefined,
    isAnonymous: user?.isAnonymous,
    avatarUrl: userProfileData?.avatarUrl,
    onSignIn: handleSignIn,
    onLogout: handleSignOut,
    onDeleteAccount: handleDeleteAccount,
    translations: translations?.account as any,
  }), [user, userProfileData, handleSignIn, handleSignOut, handleDeleteAccount, translations]);

  // FAQ data passed through as-is (app sends pre-translated data)
  const translatedFaqData = useMemo(() =>
    translateFAQData(faqData, appInfo),
    [faqData, appInfo]
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
