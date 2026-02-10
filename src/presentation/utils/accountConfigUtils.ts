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
  } = params;

  const anonymous = isAnonymous ?? true;

  return {
    profile: {
      displayName: displayName || "",
      userId: userId ?? undefined,
      isAnonymous: anonymous,
      avatarUrl: avatarUrl ?? photoURL ?? undefined,
    },
    isAnonymous: anonymous,
    editProfileText: "",
    onSignIn,
    accountActions: {
      onLogout,
      onDeleteAccount,
      logoutText: "",
      logoutConfirmTitle: "",
      logoutConfirmMessage: "",
      cancelText: "",
      deleteAccountText: "",
      deleteConfirmTitle: "",
      deleteConfirmMessage: "",
    },
  };
}
