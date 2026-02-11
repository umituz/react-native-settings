/**
 * Settings Content Component Props
 */

import type { NormalizedConfig } from "../../utils/normalizeConfig";
import type { CustomSettingsSection } from "../../types";
import type { DevSettingsProps } from "../../../../domains/dev";
import type { GamificationSettingsConfig } from "../../../../domains/gamification";

export interface SettingsContentFeatures {
  [key: string]: boolean;
  appearance: boolean;
  language: boolean;
  notifications: boolean;
  about: boolean;
  legal: boolean;
  disclaimer: boolean;
  userProfile: boolean;
  feedback: boolean;
  rating: boolean;
  faqs: boolean;
  subscription: boolean;
  wallet: boolean;
  gamification: boolean;
  videoTutorial: boolean;
}

export interface SettingsContentUserProfile {
  displayName?: string;
  userId?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
  accountSettingsRoute?: string;
  onPress?: () => void;
  anonymousDisplayName?: string;
  avatarServiceUrl?: string;
}

export interface SettingsContentProps {
  normalizedConfig: NormalizedConfig;
  features: SettingsContentFeatures;
  showUserProfile?: boolean;
  userProfile?: SettingsContentUserProfile;
  showFooter?: boolean;
  footerText?: string;
  appVersion?: string;
  customSections?: CustomSettingsSection[];
  emptyStateText?: string;
  devSettings?: DevSettingsProps;
  gamificationConfig?: GamificationSettingsConfig;
}
