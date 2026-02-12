/**
 * Account Configuration Utilities
 *
 * Helper functions for creating account screen configurations.
 */

import type { AccountScreenConfig } from "@umituz/react-native-auth";

export interface AccountTranslations {
  editProfile?: string;
  logout: string;
  deleteAccount: string;
  logoutConfirmTitle: string;
  logoutConfirmMessage: string;
  deleteConfirmTitle: string;
  deleteConfirmMessage: string;
  deleteErrorTitle?: string;
  deleteErrorMessage?: string;
  cancel: string;
}

export interface CreateAccountConfigParams {
  displayName?: string;
  userId?: string;
  photoURL?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
  onSignIn: () => void;
  onLogout: () => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  translations?: AccountTranslations;
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
    translations,
  } = params;

  const anonymous = isAnonymous ?? true;

  // Helper to check if translation value is valid (not empty or undefined)
  const hasValidTranslation = (value: string | undefined): boolean => {
    return Boolean(value && value.trim().length > 0);
  };

  // Only create accountActions if all required translations are present and non-empty
  const hasValidAccountTranslations = translations &&
    hasValidTranslation(translations.logout) &&
    hasValidTranslation(translations.deleteAccount) &&
    hasValidTranslation(translations.logoutConfirmTitle) &&
    hasValidTranslation(translations.logoutConfirmMessage) &&
    hasValidTranslation(translations.deleteConfirmTitle) &&
    hasValidTranslation(translations.deleteConfirmMessage) &&
    hasValidTranslation(translations.cancel);

  return {
    profile: {
      displayName: displayName || "",
      userId: userId ?? undefined,
      isAnonymous: anonymous,
      avatarUrl: avatarUrl ?? photoURL ?? undefined,
    },
    isAnonymous: anonymous,
    editProfileText: translations?.editProfile || "",
    onSignIn,
    accountActions: hasValidAccountTranslations ? {
      onLogout,
      onDeleteAccount,
      logoutText: translations.logout,
      logoutConfirmTitle: translations.logoutConfirmTitle,
      logoutConfirmMessage: translations.logoutConfirmMessage,
      cancelText: translations.cancel,
      deleteAccountText: translations.deleteAccount,
      deleteConfirmTitle: translations.deleteConfirmTitle,
      deleteConfirmMessage: translations.deleteConfirmMessage,
      deleteErrorTitle: translations.deleteErrorTitle,
      deleteErrorMessage: translations.deleteErrorMessage,
    } : undefined,
  };
}
