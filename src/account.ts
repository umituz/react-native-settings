/**
 * @umituz/react-native-settings/account
 *
 * NOTE: Auth has been removed from this application.
 * This file provides empty exports for compatibility.
 *
 * Apps that use @umituz/react-native-auth should import directly from that package:
 *   import { AccountScreen, ProfileSection } from '@umituz/react-native-auth';
 */

// Empty exports
export const AccountScreen: React.ComponentType<Record<string, never>> | null = null;
export const ProfileSection: React.ComponentType<Record<string, never>> | null = null;

// Stub hooks that return default values
export const useAuth = () => ({
  user: null,
  loading: false,
  isAuthReady: true,
  isAnonymous: true,
});

export const useUserProfile = () => null;

export const useAuthHandlers = () => ({
  handleRatePress: async () => {},
  handleSignOut: async () => {},
  handleDeleteAccount: async () => {},
  handleSignIn: async () => {},
});

// Empty types
export type AccountScreenConfig = Record<string, never>;

// Base hook (no auth version)
export { useSettingsScreenConfig } from './presentation/hooks/useSettingsScreenConfig';

// Re-export types
export type {
  UseSettingsScreenConfigParams,
  SettingsScreenConfigResult,
  SettingsFeatures,
} from './presentation/hooks/useSettingsScreenConfig';

export type { AccountConfig } from './presentation/navigation/types';
