/**
 * Settings Config Factory Utility
 * Creates settings configuration based on feature flags
 */

import { useMemo } from "react";
import type { TranslationFunction, FeedbackFormData } from "./config-creators/types";
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
  t: TranslationFunction;
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
  };
}

/**
 * Creates settings configuration based on enabled features
 */
export const createSettingsConfig = (
  params: SettingsConfigFactoryParams
): SettingsConfig => {
  const {
    t,
    onFeedbackSubmit,
    handleRatePress,
    appStoreUrl,
    isPremium,
    features,
  } = params;

  return {
    appearance: features.appearance ? createAppearanceConfig(t) : false,
    language: features.language ? createLanguageConfig(t) : false,
    notifications: features.notifications ? createNotificationsConfig(t) : false,
    feedback: features.feedback ? createFeedbackConfig(t, onFeedbackSubmit) : false,
    about: features.about ? createAboutConfig(t) : false,
    legal: features.legal ? createLegalConfig(t) : false,
    faqs: features.faqs ? createFAQConfig(t) : false,
    rating: features.rating ? createRatingConfig(t, handleRatePress, appStoreUrl) : false,
    subscription: createSubscriptionConfig(t, isPremium, "SubscriptionDetail"),
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
    params.t,
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
  ]);
};
