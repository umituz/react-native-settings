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
  legalUrls: LegalUrls,
  aboutTranslations?: AboutConfig["texts"]
): NavigationHandlersResult => {
  const handlePrivacyPress = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(legalUrls.privacy);
      if (canOpen) {
        await Linking.openURL(legalUrls.privacy);
      } else {
        console.warn('Cannot open privacy policy URL:', legalUrls.privacy);
      }
    } catch (error) {
      console.error('Failed to open privacy policy:', error);
    }
  }, [legalUrls.privacy]);

  const handleTermsPress = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(legalUrls.terms);
      if (canOpen) {
        await Linking.openURL(legalUrls.terms);
      } else {
        console.warn('Cannot open terms of service URL:', legalUrls.terms);
      }
    } catch (error) {
      console.error('Failed to open terms of service:', error);
    }
  }, [legalUrls.terms]);

  const handleEulaPress = useCallback(async () => {
    if (legalUrls.eula) {
      try {
        const canOpen = await Linking.canOpenURL(legalUrls.eula);
        if (canOpen) {
          await Linking.openURL(legalUrls.eula);
        } else {
          console.warn('Cannot open EULA URL:', legalUrls.eula);
        }
      } catch (error) {
        console.error('Failed to open EULA:', error);
      }
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
      texts: aboutTranslations,
    }),
    [appInfo, aboutTranslations]
  );

  return {
    handlePrivacyPress,
    handleTermsPress,
    handleEulaPress,
    aboutConfig,
  };
};
