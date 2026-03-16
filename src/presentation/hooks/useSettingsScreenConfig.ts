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
  /** Optional auth data for apps that use authentication */
  auth?: {
    user: {
      displayName?: string;
      userId?: string;
      photoURL?: string;
      isAnonymous?: boolean;
    } | null;
    isLoading?: boolean;
    isAuthReady?: boolean;
    onSignIn: () => void;
    onLogout: () => Promise<void>;
    onDeleteAccount: () => Promise<void>;
    accountTranslations?: AccountTranslations;
  };
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
  const { 
    appInfo, 
    faqData, 
    isPremium, 
    onFeedbackSubmit, 
    features = {}, 
    translations,
    auth
  } = params;

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

  // Auth orchestration
  const loading = auth?.isLoading ?? false;
  const isAuthReady = auth?.isAuthReady ?? true;

  const handleRatePress = useMemo(() => async () => {
    // Default rate behavior - typically handled by app or a separate rating hook
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

    // Apply translations to specific features if available
    if (config.subscription && typeof config.subscription === 'object') {
      config.subscription = {
        ...config.subscription,
        title: translations?.features?.subscription?.title || config.subscription.title,
        description: translations?.features?.subscription?.description || config.subscription.description,
      };
    }

    if (config.gamification) {
      const existingConfig = typeof config.gamification === 'object' ? config.gamification : { enabled: true };
      config.gamification = {
        ...existingConfig,
        title: translations?.features?.gamification?.title || existingConfig.title,
        description: translations?.features?.gamification?.description || existingConfig.description,
      };
    }

    if (config.videoTutorial) {
      const existingConfig = typeof config.videoTutorial === 'object' ? config.videoTutorial : { enabled: true };
      config.videoTutorial = {
        ...existingConfig,
        title: translations?.features?.videoTutorial?.title || existingConfig.title,
        description: translations?.features?.videoTutorial?.description || existingConfig.description,
      };
    }

    return config;
  }, [baseSettingsConfig, translations]);

  // User profile display configuration
  const userProfile = useMemo(() => createUserProfileDisplay({
    profileData: auth?.user ? {
      displayName: auth.user.displayName,
      userId: auth.user.userId,
      isAnonymous: auth.user.isAnonymous,
      avatarUrl: auth.user.photoURL,
    } : null,
    onSignIn: auth?.onSignIn || (() => {}),
  }), [auth?.user, auth?.onSignIn]);

  // Account screen configuration
  const accountConfig = useMemo(() => createAccountConfig({
    displayName: auth?.user?.displayName,
    userId: auth?.user?.userId,
    photoURL: auth?.user?.photoURL,
    isAnonymous: auth?.user?.isAnonymous,
    onSignIn: auth?.onSignIn || (() => {}),
    onLogout: auth?.onLogout || (async () => {}),
    onDeleteAccount: auth?.onDeleteAccount || (async () => {}),
    translations: auth?.accountTranslations,
  }), [auth?.user, auth?.onSignIn, auth?.onLogout, auth?.onDeleteAccount, auth?.accountTranslations]);

  return {
    settingsConfig,
    userProfile,
    accountConfig,
    translatedFaqData: faqData,
    isLoading: loading,
    isAuthReady,
  };
};
