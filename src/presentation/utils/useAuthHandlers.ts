/**
 * Auth Handlers Hook
 * Centralized authentication-related handlers for settings screen
 * FIXED: Added proper error logging and user feedback
 */

import { useCallback } from "react";
import { Linking, Alert } from "react-native";
import {
  useAuth,
  useAccountManagement,
  useAuthModalStore,
} from "@umituz/react-native-auth";
import { AlertService } from "@umituz/react-native-design-system";
import { useLocalization } from "../../domains/localization";
import type { AppInfo } from "../navigation/types";

declare const __DEV__: boolean;

/**
 * Hook that provides authentication-related handlers
 */
export const useAuthHandlers = (appInfo: AppInfo) => {
  const { t } = useLocalization();
  const { signOut } = useAuth();
  const { deleteAccount } = useAccountManagement();
  const { showAuthModal } = useAuthModalStore();

  const handleRatePress = useCallback(async () => {
    const url = appInfo.appStoreUrl;
    if (!url) {
      // FIXED: Provide feedback when URL is missing
      Alert.alert(t("common.error"), "App store URL not configured");
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        // FIXED: Provide feedback when URL cannot be opened
        Alert.alert(
          t("common.error"),
          "Unable to open app store. Please check your device settings."
        );
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      // FIXED: Log actual error for debugging
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Failed to open app store:", error);
      }
      Alert.alert(t("common.error"), "Failed to open app store");
    }
  }, [appInfo.appStoreUrl, t]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      // FIXED: Log actual error for debugging
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Sign out failed:", error);
      }
      AlertService.createErrorAlert(
        t("common.error"),
        t("auth.errors.unknownError")
      );
    }
  }, [signOut, t]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
    } catch (error) {
      // FIXED: Log actual error for debugging
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Delete account failed:", error);
      }
      AlertService.createErrorAlert(
        t("common.error"),
        t("settings.account.deleteError")
      );
    }
  }, [deleteAccount, t]);

  const handleSignIn = useCallback(() => {
    // FIXED: Remove empty callback - pass undefined instead
    showAuthModal(undefined, "login");
  }, [showAuthModal]);

  return {
    handleRatePress,
    handleSignOut,
    handleDeleteAccount,
    handleSignIn,
  };
};
