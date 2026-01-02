/**
 * Settings Navigation Types
 */

import type { SettingsConfig, CustomSettingsSection } from "../screens/types";
import type { DevSettingsProps } from "../../domains/dev";
import type { FAQCategory } from "../../domains/faqs";

/**
 * App Info passed from main app (APP_INFO constant)
 */
export interface AppInfo {
  name: string;
  version: string;
  description?: string;
  developer?: string;
  contactEmail?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  moreAppsUrl?: string;
  appStoreId?: string;
  appStoreUrl?: string;
}

/**
 * Legal URLs passed from main app (LEGAL_URLS constant)
 */
export interface LegalUrls {
  privacy: string;
  terms: string;
  eula?: string;
}

/**
 * Navigation param list
 */
export type SettingsStackParamList = {
  SettingsMain: undefined;
  Appearance: undefined;
  About: undefined;
  Legal: undefined;
  Notifications: undefined;
  FAQ: undefined;
};

/**
 * User profile configuration
 */
export interface UserProfileConfig {
  displayName?: string;
  userId?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
  accountSettingsRoute?: string;
  onPress?: () => void;
  anonymousDisplayName?: string;
  avatarServiceUrl?: string;
}

/**
 * Additional screen configuration
 */
export interface AdditionalScreen {
  name: string;
  component?: React.ComponentType<unknown>;
  children?: () => React.ReactElement;
  options?: Record<string, unknown>;
}

/**
 * FAQ Data passed from main app
 */
export interface FAQData {
  categories: FAQCategory[];
}

/**
 * Settings Stack Navigator Props
 */
export interface SettingsStackNavigatorProps {
  appInfo: AppInfo;
  legalUrls: LegalUrls;
  faqData?: FAQData;
  config?: SettingsConfig;
  showUserProfile?: boolean;
  userProfile?: UserProfileConfig;
  additionalScreens?: AdditionalScreen[];
  devSettings?: DevSettingsProps;
  customSections?: CustomSettingsSection[];
}
