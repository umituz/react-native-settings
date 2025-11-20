/**
 * Feature Detection Hook
 * Single Responsibility: Detect which features should be shown
 */

import { useMemo } from "react";
import type { NormalizedConfig } from "../utils/normalizeConfig";

// Optional notification service
let notificationService: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  notificationService = require("@umituz/react-native-notifications")
    .notificationService;
} catch {
  // Package not available
}

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
) {
  return useMemo(() => {
    const { appearance, notifications, about, legal, account, support, developer } =
      normalizedConfig;

    return {
      appearance:
        appearance.enabled &&
        (appearance.config?.enabled === true ||
          (appearance.config?.enabled !== false &&
            hasNavigationScreen(
              navigation,
              appearance.config?.route || "Appearance",
            ))),
      notifications:
        notifications.enabled &&
        (notifications.config?.enabled === true ||
          (notifications.config?.enabled !== false &&
            notificationService !== null &&
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
      account:
        account.enabled &&
        (account.config?.enabled === true ||
          (account.config?.enabled !== false &&
            hasNavigationScreen(
              navigation,
              account.config?.route || "AccountSettings",
            ))),
      support: support.enabled,
      developer: developer.enabled && __DEV__,
    };
  }, [normalizedConfig, navigation]);
}

