/**
 * Settings Navigation Types
 */

import type React from 'react';
import type { SettingsConfig, CustomSettingsSection } from "../screens/types";
import type { DevSettingsProps } from "../../domains/dev";
import type { FAQCategory } from "../../domains/faqs";
import type { DisclaimerScreenParams } from "../../domains/disclaimer/presentation/screens/DisclaimerScreen";
import type { FeedbackScreenParams } from "../../domains/feedback/presentation/screens/FeedbackScreen";
import type { RatingPromptScreenParams } from "../../domains/rating/presentation/screens/RatingPromptScreen";
import type { AIConsentScreenParams } from "../../domains/ai-consent/presentation/screens/AIConsentScreen";

/**
 * App Info passed from main app (APP_INFO constant)
 */
export interface AppInfo {
  name: string;
  appName?: string;
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
  VideoTutorial: undefined;
  FeatureRequest: undefined;
  Disclaimer: DisclaimerScreenParams;
  Feedback: FeedbackScreenParams;
  RatingPrompt: RatingPromptScreenParams;
  AIConsent: AIConsentScreenParams;
  PasswordPrompt: {
    onComplete: (password: string | null) => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
  };
};

/**
 * User profile configuration
 */
export interface UserProfileDisplay {
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
 * Account configuration — auth is an optional peer dependency.
 * Defined locally so the main package does not require @umituz/react-native-auth.
 */
export interface AccountConfig {
  profile?: {
    displayName?: string;
    userId?: string;
    isAnonymous?: boolean;
    avatarUrl?: string;
    accountSettingsRoute?: string;
    benefits?: string[];
  };
  isAnonymous?: boolean;
  editProfileText?: string;
  onSignIn?: () => void;
  PasswordPromptComponent?: React.ReactNode;
  accountActions?: {
    onLogout?: () => Promise<void>;
    onDeleteAccount?: () => Promise<void>;
    logoutText?: string;
    logoutConfirmTitle?: string;
    logoutConfirmMessage?: string;
    cancelText?: string;
    deleteAccountText?: string;
    deleteConfirmTitle?: string;
    deleteConfirmMessage?: string;
    deleteErrorTitle?: string;
    deleteErrorMessage?: string;
  };
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
  userProfile?: UserProfileDisplay;
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
  videoTutorialConfig?: import("../../domains/video-tutorials").VideoTutorialsScreenProps;
}
