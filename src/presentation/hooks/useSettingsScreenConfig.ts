/**
 * useSettingsScreenConfig Hook
 *
 * One-stop hook for settings screen configuration.
 * Handles auth, feedback, and all settings config internally.
 * Apps pass subscription config from subscription package.
 */

import { useMemo, useCallback } from "react";
import { Linking } from "react-native";
import {
  useAuth,
  useAccountManagement,
  useAuthModalStore,
  useUserProfile,
} from "@umituz/react-native-auth";
import { AlertService } from "@umituz/react-native-design-system";
import { useLocalization } from "../../domains/localization";
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
} from "../utils/config-creators";
import type { SettingsConfig } from "../screens/types";
import type { FeedbackFormData } from "../utils/config-creators";
import type { AppInfo, FAQData, UserProfileConfig, AdditionalScreen } from "../navigation/types";
import type { AccountScreenConfig } from "@umituz/react-native-auth";

export interface UseSettingsScreenConfigParams {
  appInfo: AppInfo;
  faqData?: FAQData;
  isPremium: boolean;
  onFeedbackSubmit: (data: FeedbackFormData) => Promise<void>;
  additionalScreens?: AdditionalScreen[];
}

export interface SettingsScreenConfigResult {
  settingsConfig: SettingsConfig;
  userProfile: UserProfileConfig;
  accountConfig: AccountScreenConfig;
  translatedFaqData: FAQData | undefined;
  isLoading: boolean;
  isAuthReady: boolean;
}

export const useSettingsScreenConfig = (
  params: UseSettingsScreenConfigParams
): SettingsScreenConfigResult => {
  const { appInfo, faqData, isPremium, onFeedbackSubmit } = params;

  const { t } = useLocalization();
  const { user, loading, isAuthReady, signOut } = useAuth();
  const { deleteAccount } = useAccountManagement();
  const userProfileData = useUserProfile({});
  const { showAuthModal } = useAuthModalStore();

  const handleRatePress = useCallback(async () => {
    const url = appInfo.appStoreUrl;
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    }
  }, [appInfo.appStoreUrl]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch {
      AlertService.createErrorAlert(t("common.error"), t("auth.errors.unknownError"));
    }
  }, [signOut, t]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
    } catch {
      AlertService.createErrorAlert(t("common.error"), t("settings.account.deleteError"));
    }
  }, [deleteAccount, t]);

  const handleSignIn = useCallback(() => {
    showAuthModal(() => {}, "login");
  }, [showAuthModal]);

  const settingsConfig = useMemo((): SettingsConfig => ({
    appearance: createAppearanceConfig(t),
    language: createLanguageConfig(t),
    notifications: createNotificationsConfig(t),
    feedback: createFeedbackConfig(t, onFeedbackSubmit),
    about: createAboutConfig(t),
    legal: createLegalConfig(t),
    faqs: createFAQConfig(t),
    rating: createRatingConfig(t, handleRatePress, appInfo.appStoreUrl || ""),
    subscription: createSubscriptionConfig(t, isPremium, "SubscriptionDetail"),
    disclaimer: false,
  }), [t, onFeedbackSubmit, handleRatePress, appInfo.appStoreUrl, isPremium]);

  const userProfile = useMemo((): UserProfileConfig => {
    const isAnonymous = userProfileData?.isAnonymous ?? true;
    return {
      displayName: userProfileData?.displayName || t("settings.profile.anonymousName"),
      userId: userProfileData?.userId,
      isAnonymous,
      avatarUrl: userProfileData?.avatarUrl,
      onPress: isAnonymous ? handleSignIn : undefined,
      accountSettingsRoute: isAnonymous ? undefined : "Account",
    };
  }, [userProfileData, t, handleSignIn]);

  const accountConfig = useMemo((): AccountScreenConfig => {
    const isAnonymous = user?.isAnonymous ?? true;
    return {
      profile: {
        displayName: userProfileData?.displayName || user?.displayName || t("settings.profile.anonymousName"),
        userId: userProfileData?.userId || user?.uid,
        isAnonymous,
        avatarUrl: userProfileData?.avatarUrl || user?.photoURL || undefined,
        benefits: isAnonymous ? [
          t("settings.profile.benefits.freeCredits"),
          t("settings.profile.benefits.saveHistory"),
          t("settings.profile.benefits.syncDevices"),
          t("settings.profile.benefits.cloudSync"),
          t("settings.profile.benefits.secureBackup"),
        ] : undefined,
      },
      isAnonymous,
      editProfileText: t("settings.account.editProfile"),
      onSignIn: handleSignIn,
      accountActions: {
        onLogout: handleSignOut,
        onDeleteAccount: handleDeleteAccount,
        logoutText: t("settings.account.logout"),
        logoutConfirmTitle: t("settings.account.logoutConfirmTitle"),
        logoutConfirmMessage: t("settings.account.logoutConfirmMessage"),
        cancelText: t("common.cancel"),
        deleteAccountText: t("settings.account.deleteAccount"),
        deleteConfirmTitle: t("settings.account.deleteConfirmTitle"),
        deleteConfirmMessage: t("settings.account.deleteConfirmMessage"),
      },
    };
  }, [user, userProfileData, handleSignIn, handleSignOut, handleDeleteAccount, t]);

  const translatedFaqData = useMemo((): FAQData | undefined => {
    if (!faqData) return undefined;
    return {
      categories: faqData.categories.map((category) => ({
        id: category.id,
        title: t(category.title),
        items: category.items.map((item) => ({
          id: item.id,
          question: t(item.question, { appName: appInfo.name }),
          answer: t(item.answer, { appName: appInfo.name }),
        })),
      })),
    };
  }, [faqData, t, appInfo.name]);

  return {
    settingsConfig,
    userProfile,
    accountConfig,
    translatedFaqData,
    isLoading: loading,
    isAuthReady,
  };
};
