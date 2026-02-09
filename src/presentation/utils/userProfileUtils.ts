/**
 * User Profile Utilities
 *
 * Helper functions for creating user profile configurations.
 */

import type { UserProfileDisplay } from "../navigation/types";

export interface UserProfileConfig {
  displayName?: string;
  userId?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
}

export interface CreateUserProfileParams {
  profileData?: UserProfileConfig;
  t: (key: string, params?: Record<string, string | number>) => string;
  onSignIn?: () => void;
}

/**
 * Create user profile display configuration
 */
export function createUserProfileDisplay(params: CreateUserProfileParams): UserProfileDisplay {
  const { profileData, t, onSignIn } = params;

  const isAnonymous = profileData?.isAnonymous ?? true;
  const anonymousName = t("settings.profile.anonymousName");

  return {
    displayName: profileData?.displayName || anonymousName,
    userId: profileData?.userId ?? undefined,
    isAnonymous,
    avatarUrl: profileData?.avatarUrl ?? undefined,
    onPress: isAnonymous ? onSignIn : undefined,
    accountSettingsRoute: isAnonymous ? undefined : "Account",
  };
}

/**
 * Create benefits list for anonymous users
 */
export function createAnonymousBenefits(t: (key: string) => string): string[] {
  return [
    t("settings.profile.benefits.saveHistory"),
    t("settings.profile.benefits.syncDevices"),
    t("settings.profile.benefits.cloudSync"),
    t("settings.profile.benefits.secureBackup"),
  ];
}
