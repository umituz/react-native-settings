/**
 * Feature Configuration Types
 * Core types for feature visibility and configuration
 */

import type { ComponentType, ReactNode } from "react";

/**
 * Feature visibility configuration
 * - true: Always show (if navigation screen exists)
 * - false: Never show
 * - 'auto': Automatically detect (check if navigation screen exists and package is available)
 */
export type FeatureVisibility = boolean | "auto";

/**
 * Appearance Settings Configuration
 */
export interface AppearanceConfig {
  /** Show appearance section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for appearance screen */
  route?: string;
  /** Show theme toggle */
  showTheme?: boolean;
  /** Custom appearance title */
  title?: string;
  /** Custom appearance description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * Language Settings Configuration
 */
export interface LanguageConfig {
  /** Show language section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for language selection screen */
  route?: string;
  /** Custom language title */
  title?: string;
  /** Custom language description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Default language display when no language is detected */
  defaultLanguageDisplay?: string;
}

/**
 * Notifications Settings Configuration
 */
export interface NotificationsConfig {
  /** Show notifications section */
  enabled?: FeatureVisibility;
  /** Show notification toggle switch */
  showToggle?: boolean;
  /** Initial toggle value */
  initialValue?: boolean;
  /** Toggle change handler */
  onToggleChange?: (value: boolean) => void;
  /** Custom navigation route for notifications screen */
  route?: string;
  /** Custom notifications title */
  title?: string;
  /** Custom notifications description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * About Settings Configuration
 */
export interface AboutConfig {
  /** Show about section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for about screen */
  route?: string;
  /** Custom about title */
  title?: string;
  /** Custom about description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * Legal Settings Configuration
 */
export interface LegalConfig {
  /** Show legal section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for legal screen */
  route?: string;
  /** Custom legal title */
  title?: string;
  /** Custom legal description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * Disclaimer Settings Configuration
 */
export interface DisclaimerConfig {
  /** Show disclaimer section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for disclaimer screen */
  route?: string;
  /** Custom disclaimer title */
  title?: string;
  /** Custom disclaimer description */
  description?: string;
}

/**
 * User Profile Settings Configuration
 */
export interface UserProfileConfig {
  /** Show user profile header */
  enabled?: boolean;
  /** Custom display name for anonymous users */
  anonymousDisplayName?: string;
  /** Custom avatar service URL */
  avatarServiceUrl?: string;
  /** Navigation route for account settings (shows chevron if set) */
  accountSettingsRoute?: string;
}

import type { FeedbackType } from "../../../domains/feedback/domain/entities/FeedbackEntity";

/**
 * Feedback Settings Configuration
 */
export interface FeedbackConfig {
  /** Enable feedback feature */
  enabled?: boolean;
  /** Custom title for the feedback section */
  title?: string;
  /** Custom label for the feedback item */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Initial feedback type */
  initialType?: FeedbackType;
  /** Feedback submission handler */
  onSubmit?: (data: { type: any; rating: number; description: string; title: string }) => Promise<void>;
}

export interface FAQConfig {
  /** Enable FAQ feature */
  enabled?: boolean;
  /** Custom title for the FAQ section */
  title?: string;
  /** Custom label for the FAQ button */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** FAQ items passed from app */
  items?: any[];
  /** Handler to open FAQ screen */
  onPress?: () => void;
}

export interface RatingConfig {
  /** Enable rating feature */
  enabled?: boolean;
  /** Custom title for the rating section */
  title?: string;
  /** Custom label for the rate app button */
  description?: string;
  /** Store URL for direct linking (optional) */
  storeUrl?: string;
  /** Custom handler for rating action (e.g. open store review) */
  onRate?: () => void;
}

/**
 * Cloud Sync Settings Configuration
 */
export interface CloudSyncConfig {
  /** Enable cloud sync feature */
  enabled?: FeatureVisibility;
  /** Custom title for the sync section */
  title?: string;
  /** Custom description for the sync toggle */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Firestore collection name */
  collectionName?: string;
}
