/**
 * Auth Handlers Hook
 * Centralized authentication-related handlers for settings screen
 * Uses auth package for all auth operations - no duplication
 */

import { useCallback } from "react";
import { Linking, Alert } from "react-native";
import {
  useAuth,
  useAuthModalStore,
  useAccountManagement,
} from "@umituz/react-native-auth";
import { AlertService } from "@umituz/react-native-design-system";
import type { AppInfo } from "../navigation/types";
import type { SettingsTranslations } from "../screens/types";

declare const __DEV__: boolean;

/**
 * Hook that provides authentication-related handlers
 */
export const useAuthHandlers = (appInfo: AppInfo, translations?: SettingsTranslations["errors"]) => {
  const { signOut } = useAuth();
  const { showAuthModal } = useAuthModalStore();
  const { deleteAccount: deleteAccountFromAuth } = useAccountManagement({
    passwordPromptTitle: translations?.deleteAccountTitle || "Confirm Account Deletion",
    passwordPromptMessage: translations?.deleteAccountMessage || "Please enter your password to permanently delete your account. This action cannot be undone.",
    passwordPromptCancel: translations?.cancel || "Cancel",
    passwordPromptConfirm: translations?.delete || "Delete",
  });

  const handleRatePress = useCallback(async () => {
    const url = appInfo.appStoreUrl;
    if (!url) {
      Alert.alert(translations?.common || "", translations?.appStoreUrlNotConfigured || "");
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert(
          translations?.common || "",
          translations?.unableToOpenAppStore || ""
        );
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Failed to open app store:", error);
      }
      Alert.alert(translations?.common || "", translations?.failedToOpenAppStore || "");
    }
  }, [appInfo.appStoreUrl, translations]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Sign out failed:", error);
      }
      AlertService.createErrorAlert(
        translations?.common || "",
        translations?.unknown || ""
      );
    }
  }, [signOut, translations]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccountFromAuth();
      // Account deleted successfully - auth package handles everything
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Delete account failed:", error);
      }

      AlertService.createErrorAlert(
        translations?.common || "Error",
        errorMessage || translations?.deleteAccountError || "Failed to delete account"
      );
    }
  }, [deleteAccountFromAuth, translations]);

  const handleSignIn = useCallback(() => {
    showAuthModal(undefined, "login");
  }, [showAuthModal]);

  return {
    handleRatePress,
    handleSignOut,
    handleDeleteAccount,
    handleSignIn,
  };
};
