/**
 * Navigation Handlers Hook
 * Provides URL handlers and config generation for settings screens
 */

import { useCallback, useMemo } from "react";
import { Linking } from "react-native";
import type { AppInfo, LegalUrls } from "../types";
import type { AboutConfig } from "../../../domains/about";

interface NavigationHandlersResult {
  handlePrivacyPress: () => void;
  handleTermsPress: () => void;
  handleEulaPress: () => void;
  aboutConfig: AboutConfig;
}

export const useNavigationHandlers = (
  appInfo: AppInfo,
  legalUrls: LegalUrls
): NavigationHandlersResult => {
  const handlePrivacyPress = useCallback(() => {
    Linking.openURL(legalUrls.privacy);
  }, [legalUrls.privacy]);

  const handleTermsPress = useCallback(() => {
    Linking.openURL(legalUrls.terms);
  }, [legalUrls.terms]);

  const handleEulaPress = useCallback(() => {
    if (legalUrls.eula) {
      Linking.openURL(legalUrls.eula);
    }
  }, [legalUrls.eula]);

  const aboutConfig: AboutConfig = useMemo(
    () => ({
      appInfo: {
        name: appInfo.name,
        version: appInfo.version,
        description: appInfo.description,
        developer: appInfo.developer,
        contactEmail: appInfo.contactEmail,
        websiteUrl: appInfo.websiteUrl,
        websiteDisplay: appInfo.websiteDisplay,
        moreAppsUrl: appInfo.moreAppsUrl,
      },
    }),
    [appInfo]
  );

  return {
    handlePrivacyPress,
    handleTermsPress,
    handleEulaPress,
    aboutConfig,
  };
};
