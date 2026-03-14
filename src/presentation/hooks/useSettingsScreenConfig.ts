/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Auth has been removed - this is a no-auth version.
 */

import { useMemo } from "react";
import { createUserProfileDisplay } from "../utils/userProfileUtils";
import { createAccountConfig, type AccountTranslations } from "../utils/accountConfigUtils";
import { useSettingsConfigFactory } from "../utils/settingsConfigFactory";
import type { SettingsConfig, SettingsTranslations } from "../screens/types";
import type { FeedbackFormData } from "../utils/config-creators";
import type { AppInfo, FAQData, UserProfileDisplay, AdditionalScreen, AccountConfig } from "../navigation/types";

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
  accountConfig: AccountConfig;
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

  // No-auth version - always ready
  const loading = false;
  const isAuthReady = true;

  // Default handlers (no-ops for no-auth version)
  const handleRatePress = useMemo(() => async () => {
    // Default rate behavior - could be implemented with expo-store-review
    console.warn("[useSettingsScreenConfig] Rate press handler not implemented in no-auth version");
  }, []);

  const handleSignOut = useMemo(() => async () => {
    // No-op in no-auth version
  }, []);

  const handleDeleteAccount = useMemo(() => async () => {
    // No-op in no-auth version
  }, []);

  const handleSignIn = useMemo(() => async () => {
    // No-op in no-auth version
  }, []);

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

  // Empty user profile (no-auth version)
  const userProfile = useMemo(() => createUserProfileDisplay({
    profileData: null,
    onSignIn: handleSignIn,
  }), [handleSignIn]);

  // Minimal account config (no-auth version)
  const accountConfig = useMemo(() => createAccountConfig({
    displayName: undefined,
    userId: undefined,
    photoURL: undefined,
    isAnonymous: true,
    avatarUrl: undefined,
    onSignIn: handleSignIn,
    onLogout: handleSignOut,
    onDeleteAccount: handleDeleteAccount,
    translations: undefined,
  }), [handleSignIn, handleSignOut, handleDeleteAccount]);

  return {
    settingsConfig,
    userProfile,
    accountConfig,
    translatedFaqData: faqData,
    isLoading: loading,
    isAuthReady,
  };
};
