/**
 * Feature Detection Hook
 * Single Responsibility: Detect which features should be shown
 */

import { useMemo } from "react";
import type { NormalizedConfig } from "../utils/normalizeConfig";


/**
 * Check if navigation screen exists or is likely available
 */
function isFeatureAvailable(
  navigation: any,
  route?: string,
  onPress?: any
): boolean {
  // If we have an onPress, it's definitely available
  if (onPress) return true;
  
  // If we have a navigation and a route, we assume it's available 
  // since most apps won't provide a route that doesn't exist.
  // The previous getState check was unreliable.
  if (navigation && route) return true;
  
  return false;
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
      wallet,
      gamification,
    } = normalizedConfig;

    const notificationServiceAvailable = !!options?.notificationServiceAvailable;

    return {
      appearance:
        appearance.enabled &&
        (appearance.config?.enabled === true ||
          (appearance.config?.enabled !== false &&
            isFeatureAvailable(
              navigation,
              appearance.config?.route || "Appearance",
              appearance.config?.onPress,
            ))),
      language:
        language.enabled &&
        (language.config?.enabled === true ||
          (language.config?.enabled !== false &&
            isFeatureAvailable(
              navigation,
              language.config?.route || "LanguageSelection",
              language.config?.onPress,
            ))),
      notifications:
        notifications.enabled &&
        (notifications.config?.enabled === true ||
          (notifications.config?.enabled !== false &&
            (notificationServiceAvailable ||
              isFeatureAvailable(
                navigation,
                notifications.config?.route || "Notifications",
                notifications.config?.onPress,
              )))),
      about:
        about.enabled &&
        (about.config?.enabled === true ||
          (about.config?.enabled !== false &&
            isFeatureAvailable(
              navigation,
              about.config?.route || "About",
              about.config?.onPress,
            ))),
      legal:
        legal.enabled &&
        (legal.config?.enabled === true ||
          (legal.config?.enabled !== false &&
            isFeatureAvailable(
              navigation,
              legal.config?.route || "Legal",
              legal.config?.onPress,
            ))),
      disclaimer:
        disclaimer.enabled &&
        (disclaimer.config?.enabled === true ||
          (disclaimer.config?.enabled !== false &&
            isFeatureAvailable(
              navigation,
              disclaimer.config?.route || "Disclaimer",
              disclaimer.config?.onPress,
            ))),
      userProfile: userProfile.enabled,
      feedback: feedback.enabled,
      rating: rating.enabled,
      faqs: faqs.enabled,
      subscription: subscription.enabled,
      wallet: wallet.enabled,
      gamification: gamification.enabled,
    };
  }, [normalizedConfig, navigation, options]);
}

