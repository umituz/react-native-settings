/**
 * Feature Detection Hook
 * Single Responsibility: Detect which features should be shown
 */

import { useMemo } from "react";
import type { NormalizedConfig } from "../utils/normalizeConfig";


/**
 * Check if navigation screen exists
 */
function hasNavigationScreen(
  navigation: any,
  screenName: string,
): boolean {
  try {
    const state = navigation.getState();
    if (!state) return false;

    const checkRoutes = (routes: any[]): boolean => {
      if (!routes || !Array.isArray(routes)) return false;

      for (const route of routes) {
        if (route.name === screenName) return true;
        if (route.state?.routes && checkRoutes(route.state.routes)) {
          return true;
        }
      }
      return false;
    };

    return checkRoutes(state.routes || []);
  } catch {
    return false;
  }
}

/**
 * Hook to detect which features should be shown
 */
export function useFeatureDetection(
  normalizedConfig: NormalizedConfig,
  navigation: any,
  options?: {
    notificationServiceAvailable?: boolean;
  },
) {
  return useMemo(() => {
    const {
      appearance,
      language,
      notifications,
      about,
      legal,
      disclaimer,
      userProfile,
      feedback,
      rating,
      faqs,
      subscription,
    } = normalizedConfig;

    const notificationServiceAvailable = !!options?.notificationServiceAvailable;

    return {
      appearance:
        appearance.enabled &&
        (appearance.config?.enabled === true ||
          (appearance.config?.enabled !== false &&
            hasNavigationScreen(
              navigation,
              appearance.config?.route || "Appearance",
            ))),
      language:
        language.enabled &&
        (language.config?.enabled === true ||
          (language.config?.enabled !== false &&
            hasNavigationScreen(
              navigation,
              language.config?.route || "LanguageSelection",
            ))),
      notifications:
        notifications.enabled &&
        (notifications.config?.enabled === true ||
          (notifications.config?.enabled !== false &&
            notificationServiceAvailable &&
            hasNavigationScreen(
              navigation,
              notifications.config?.route || "Notifications",
            ))),
      about:
        about.enabled &&
        (about.config?.enabled === true ||
          (about.config?.enabled !== false &&
            hasNavigationScreen(navigation, about.config?.route || "About"))),
      legal:
        legal.enabled &&
        (legal.config?.enabled === true ||
          (legal.config?.enabled !== false &&
            hasNavigationScreen(navigation, legal.config?.route || "Legal"))),
      disclaimer:
        disclaimer.enabled &&
        (disclaimer.config?.enabled === true ||
          (disclaimer.config?.enabled !== false &&
            hasNavigationScreen(
              navigation,
              disclaimer.config?.route || "Disclaimer",
            ))),
      userProfile: userProfile.enabled,
      feedback: feedback.enabled,
      rating: rating.enabled,
      faqs: faqs.enabled,
      subscription: subscription.enabled,
    };
  }, [normalizedConfig, navigation, options]);
}

