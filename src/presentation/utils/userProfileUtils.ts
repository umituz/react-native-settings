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
  onSignIn?: () => void;
}

/**
 * Create user profile display configuration
 */
export function createUserProfileDisplay(params: CreateUserProfileParams): UserProfileDisplay {
  const { profileData, onSignIn } = params;

  const isAnonymous = profileData?.isAnonymous ?? true;

  return {
    displayName: profileData?.displayName,
    userId: profileData?.userId ?? undefined,
    isAnonymous,
    avatarUrl: profileData?.avatarUrl ?? undefined,
    onPress: isAnonymous ? onSignIn : undefined,
    accountSettingsRoute: isAnonymous ? undefined : "Account",
  };
}
