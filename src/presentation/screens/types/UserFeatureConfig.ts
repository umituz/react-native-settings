/**
 * User Feature Configuration Types
 * Types for user-related features (Profile, Feedback, FAQ, etc.)
 */

import type { FeatureVisibility } from "./BaseTypes";
import type { FeedbackType } from "../../../domains/feedback/domain/entities/FeedbackEntity";
import type { FAQCategory } from "../../../domains/faqs/domain/entities/FAQEntity";

/**
 * User Profile Settings Configuration
 */
export interface UserProfileConfig {
  /** Show user profile header */
  enabled?: boolean;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Custom display name for anonymous users */
  anonymousDisplayName?: string;
  /** Custom avatar service URL */
  avatarServiceUrl?: string;
  /** Navigation route for account settings (shows chevron if set) */
  accountSettingsRoute?: string;
}

/**
 * Feedback Settings Configuration
 */
export interface FeedbackConfig {
  /** Enable feedback feature */
  enabled?: FeatureVisibility;
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
  onSubmit?: (data: { type: FeedbackType; rating: number; description: string; title: string }) => Promise<void>;
  /** Custom handler to open feedback screen (overrides default modal) */
  onPress?: () => void;
}

/**
 * FAQ Settings Configuration
 */
export interface FAQConfig {
  /** Enable FAQ feature */
  enabled?: FeatureVisibility;
  /** Custom title for the FAQ section */
  title?: string;
  /** Custom label for the FAQ button */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** FAQ items passed from app */
  items?: FAQCategory[];
  /** Handler to open FAQ screen */
  onPress?: () => void;
}

/**
 * Rating Settings Configuration
 */
export interface RatingConfig {
  /** Enable rating feature */
  enabled?: FeatureVisibility;
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

/**
 * Subscription Settings Configuration
 */
export interface SubscriptionConfig {
  /** Show subscription section */
  enabled?: FeatureVisibility;
  /** Custom title for the subscription section */
  title?: string;
  /** Custom label for the subscription item */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Navigation route for subscription screen (preferred over onPress) */
  route?: string;
  /** Handler to open subscription screen (use route instead for stack navigation) */
  onPress?: () => void;
  /** Whether user is premium (to show active status) */
  isPremium?: boolean;
}

/**
 * Wallet Settings Configuration
 */
export interface WalletConfig {
  /** Show wallet section */
  enabled?: FeatureVisibility;
  /** Custom title for the wallet section */
  title?: string;
  /** Custom label for the wallet item */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Navigation route for wallet screen */
  route?: string;
  /** Current balance to display */
  balance?: number;
}

/**
 * Gamification Settings Item Configuration
 */
export interface GamificationItemConfig {
  /** Show gamification section */
  enabled?: FeatureVisibility;
  /** Custom title for the gamification section */
  title?: string;
  /** Custom label for the gamification item */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
  /** Navigation route for gamification screen */
  route?: string;
  /** Achievements to display */
  achievementsCount?: number;
}

