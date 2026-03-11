/**
 * @umituz/react-native-settings/account
 *
 * Subpath export for apps that use @umituz/react-native-auth.
 * Import auth-dependent hooks and components from here.
 *
 * Usage:
 *   import {
 *     useSettingsScreenConfig,
 *     AccountScreen,
 *     ProfileSection,
 *   } from '@umituz/react-native-settings/account';
 *
 *   // Pass AccountScreen and ProfileSection as props to SettingsStackNavigator:
 *   <SettingsStackNavigator
 *     AccountScreenComponent={AccountScreen}
 *     ProfileSectionComponent={ProfileSection}
 *     ...
 *   />
 */

// Auth components - inject these into SettingsStackNavigator props
export { AccountScreen, ProfileSection } from "@umituz/react-native-auth";

// Auth hooks (re-export for direct use if needed)
export { useAuth, useUserProfile, useAuthHandlers } from "@umituz/react-native-auth";

// Auth types
export type { AccountScreenConfig } from "@umituz/react-native-auth";

// Base hook (already handles auth internally via useAuth/useUserProfile/useAuthHandlers)
export { useSettingsScreenConfig } from './presentation/hooks/useSettingsScreenConfig';

// Re-export types
export type {
  UseSettingsScreenConfigParams,
  SettingsScreenConfigResult,
  SettingsFeatures,
} from './presentation/hooks/useSettingsScreenConfig';

export type { AccountConfig } from './presentation/navigation/types';
