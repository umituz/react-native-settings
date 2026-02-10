/**
 * Settings Config Factory Utility
 * Creates settings configuration based on feature flags
 */

import { useMemo } from "react";
import type { FeedbackFormData } from "./config-creators/types";
import type { SettingsConfig } from "../screens/types";
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
} from "./config-creators";

export interface SettingsConfigFactoryParams {
  onFeedbackSubmit: (data: FeedbackFormData) => Promise<void>;
  handleRatePress: () => void;
  appStoreUrl: string;
  isPremium: boolean;
  features: {
    notifications: boolean;
    appearance: boolean;
    language: boolean;
    feedback: boolean;
    rating: boolean;
    faqs: boolean;
    about: boolean;
    legal: boolean;
    gamification: boolean;
    videoTutorial: boolean;
    subscription: boolean;
  };
}

/**
 * Creates settings configuration based on enabled features
 */
export const createSettingsConfig = (
  params: SettingsConfigFactoryParams
): SettingsConfig => {
  const {
    onFeedbackSubmit,
    handleRatePress,
    appStoreUrl,
    isPremium,
    features,
  } = params;

  return {
    appearance: features.appearance ? createAppearanceConfig() : false,
    language: features.language ? createLanguageConfig() : false,
    notifications: features.notifications ? createNotificationsConfig() : false,
    feedback: features.feedback ? createFeedbackConfig(onFeedbackSubmit) : false,
    about: features.about ? createAboutConfig() : false,
    legal: features.legal ? createLegalConfig() : false,
    faqs: features.faqs ? createFAQConfig() : false,
    rating: features.rating ? createRatingConfig(handleRatePress, appStoreUrl) : false,
    subscription: features.subscription ? createSubscriptionConfig(isPremium, "SubscriptionDetail") : false,
    gamification: features.gamification ? true : false,
    videoTutorial: features.videoTutorial ? true : false,
    disclaimer: false,
  };
};

/**
 * Hook for creating settings config with memoization
 */
export const useSettingsConfigFactory = (
  params: SettingsConfigFactoryParams
): SettingsConfig => {
  return useMemo(() => createSettingsConfig(params), [
    params.onFeedbackSubmit,
    params.handleRatePress,
    params.appStoreUrl,
    params.isPremium,
    params.features.appearance,
    params.features.language,
    params.features.notifications,
    params.features.feedback,
    params.features.about,
    params.features.legal,
    params.features.faqs,
    params.features.rating,
    params.features.gamification,
    params.features.videoTutorial,
    params.features.subscription,
  ]);
};
