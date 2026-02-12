/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Handles auth, feedback, and all settings config internally.
 * Apps pass subscription config from subscription package.
 */

import { useMemo } from "react";
import { useAuth, useUserProfile } from "@umituz/react-native-auth";
import { createUserProfileDisplay } from "../utils/userProfileUtils";
import { createAccountConfig } from "../utils/accountConfigUtils";
import { useAuthHandlers } from "../utils/useAuthHandlers";
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

    // Add subscription title and description from translations if available
    if (config.subscription && typeof config.subscription === 'object' && translations?.features?.subscription) {
      config.subscription = {
        ...config.subscription,
        title: translations.features.subscription.title,
        description: translations.features.subscription.description,
      };
    }

    // Add subscription title and description from translations if available
    if (config.subscription && typeof config.subscription === 'object') {
      config.subscription = {
        ...config.subscription,
        enabled: true,
        title: translations?.features?.subscription?.title || config.subscription.title || "Subscription",
        description: translations?.features?.subscription?.description || config.subscription.description,
      };
    }

    // Add gamification title and description
    if (config.gamification) {
      const existingConfig = typeof config.gamification === 'object' ? config.gamification : { enabled: true };
      config.gamification = {
        ...(existingConfig as any),
        enabled: true,
        title: translations?.features?.gamification?.title || (existingConfig as any).title || "Your Progress",
        description: translations?.features?.gamification?.description || (existingConfig as any).description,
      };
    }

    // Add videoTutorial title and description
    if (config.videoTutorial) {
      const existingConfig = typeof config.videoTutorial === 'object' ? config.videoTutorial : { enabled: true };
      config.videoTutorial = {
        ...(existingConfig as any),
        enabled: true,
        title: translations?.features?.videoTutorial?.title || (existingConfig as any).title || "Video Tutorials",
        description: translations?.features?.videoTutorial?.description || (existingConfig as any).description,
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
    userId: userProfileData?.userId ?? user?.uid ?? undefined,
    photoURL: user?.photoURL ?? undefined,
    isAnonymous: user?.isAnonymous,
    avatarUrl: userProfileData?.avatarUrl ?? undefined,
    onSignIn: handleSignIn,
    onLogout: handleSignOut,
    onDeleteAccount: handleDeleteAccount,
    translations: translations?.account as any,
  }), [user, userProfileData, handleSignIn, handleSignOut, handleDeleteAccount, translations]);

  // Use centralized FAQ translation
  const translatedFaqData = useMemo(() =>
    translateFAQData(faqData, (_key: string) => "", appInfo),
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
