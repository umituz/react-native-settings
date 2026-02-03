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
  LanguageSelection: undefined;
  Gamification: undefined;
  Account: undefined;
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
 * Import AccountScreenConfig from auth package
 */
import type { AccountScreenConfig } from "@umituz/react-native-auth";

export type AccountConfig = AccountScreenConfig;

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
  accountConfig?: AccountConfig;
  additionalScreens?: AdditionalScreen[];
  devSettings?: DevSettingsProps;
  customSections?: CustomSettingsSection[];
  showHeader?: boolean;
  /** Show close button in header (useful for modal presentation) */
  showCloseButton?: boolean;
  /** Custom close handler */
  onClose?: () => void;
  gamificationConfig?: import("../../domains/gamification").GamificationSettingsConfig;
}
