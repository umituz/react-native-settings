/**
 * Account Configuration Utilities
 *
 * Helper functions for creating account screen configurations.
 */

import type { AccountScreenConfig } from "@umituz/react-native-auth";

export interface CreateAccountConfigParams {
  displayName?: string;
  userId?: string;
  photoURL?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
  onSignIn: () => void;
  onLogout: () => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  t: (key: string) => string;
}

/**
 * Create account screen configuration
 */
export function createAccountConfig(params: CreateAccountConfigParams): AccountScreenConfig {
  const {
    displayName,
    userId,
    photoURL,
    isAnonymous,
    avatarUrl,
    onSignIn,
    onLogout,
    onDeleteAccount,
    t,
  } = params;

  const anonymous = isAnonymous ?? true;

  return {
    profile: {
      displayName: displayName || t("settings.profile.anonymousName"),
      userId: userId ?? undefined,
      isAnonymous: anonymous,
      avatarUrl: avatarUrl ?? photoURL ?? undefined,
      benefits: anonymous ? [
        t("settings.profile.benefits.saveHistory"),
        t("settings.profile.benefits.syncDevices"),
        t("settings.profile.benefits.cloudSync"),
        t("settings.profile.benefits.secureBackup"),
      ] : undefined,
    },
    isAnonymous: anonymous,
    editProfileText: t("settings.account.editProfile"),
    onSignIn,
    accountActions: {
      onLogout,
      onDeleteAccount,
      logoutText: t("settings.account.logout"),
      logoutConfirmTitle: t("settings.account.logoutConfirmTitle"),
      logoutConfirmMessage: t("settings.account.logoutConfirmMessage"),
      cancelText: t("common.cancel"),
      deleteAccountText: t("settings.account.deleteAccount"),
      deleteConfirmTitle: t("settings.account.deleteConfirmTitle"),
      deleteConfirmMessage: t("settings.account.deleteConfirmMessage"),
    },
  };
}
