/**
 * Content Feature Configuration Types
 * Types for content-related features (About, Legal, Disclaimer)
 */

import type { FeatureVisibility } from "./BaseTypes";
import type { AppearanceTexts } from "../../../domains/appearance/types";

/**
 * Base configuration interface for content features
 */
interface BaseContentConfig {
  /** Show section */
  enabled?: FeatureVisibility;
  /** Custom navigation route */
  route?: string;
  /** Custom navigation handler (overrides route) */
  onPress?: () => void;
  /** Custom title */
  title?: string;
  /** Custom description */
  description?: string;
  /** Custom icon name (Ionicons) */
  icon?: string;
  /** Custom section title for grouping */
  sectionTitle?: string;
}

/**
 * About Settings Configuration
 */
export interface AboutConfig extends BaseContentConfig {
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * Legal Settings Configuration
 */
export interface LegalConfig extends BaseContentConfig {
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}

/**
 * Disclaimer Settings Configuration
 */
export interface DisclaimerConfig extends BaseContentConfig {
  // Disclaimer-specific properties can be added here if needed
}

/**
 * Appearance Settings Configuration
 */
export interface AppearanceConfig extends BaseContentConfig {
  /** Show theme toggle */
  showTheme?: boolean;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
  /** Appearance screen texts (theme mode labels, descriptions, etc.) */
  texts?: AppearanceTexts;
}

/**
 * Language Settings Configuration
 */
export interface LanguageConfig extends BaseContentConfig {
  /** Default language display when no language is detected */
  defaultLanguageDisplay?: string;
}

/**
 * Notifications Settings Configuration
 */
export interface NotificationsConfig extends BaseContentConfig {
  /** Show notification toggle switch */
  showToggle?: boolean;
  /** Initial toggle value */
  initialValue?: boolean;
  /** Toggle change handler */
  onToggleChange?: (value: boolean) => void;
  /** Default route name when no custom route provided */
  defaultRoute?: string;
}
