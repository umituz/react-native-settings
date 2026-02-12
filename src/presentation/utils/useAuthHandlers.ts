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
import type { AppInfo } from "../navigation/types";
import type { SettingsTranslations } from "../screens/types";

declare const __DEV__: boolean;

/**
 * Hook that provides authentication-related handlers
 */
export const useAuthHandlers = (appInfo: AppInfo, translations?: SettingsTranslations["errors"]) => {
  const { signOut } = useAuth();

  const passwordPrompt = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      Alert.prompt(
        "Password Required",
        "Please enter your password to delete your account",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(null),
          },
          {
            text: "Confirm",
            onPress: (password) => resolve(password || null),
          },
        ],
        "secure-text"
      );
    });
  }, []);

  const { deleteAccount } = useAccountManagement({
    onPasswordRequired: passwordPrompt,
  });
  const { showAuthModal } = useAuthModalStore();

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
      await deleteAccount();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useAuthHandlers] Delete account failed:", error);
      }

      // More specific error messages
      if (errorMessage.includes("Password required") || errorMessage.includes("password")) {
        Alert.alert(
          "Password Required",
          "Please enter your password when prompted to confirm account deletion.",
          [{ text: "OK" }]
        );
        return;
      }

      AlertService.createErrorAlert(
        translations?.common || "Error",
        errorMessage || translations?.deleteAccountError || "Failed to delete account"
      );
    }
  }, [deleteAccount, translations]);

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
