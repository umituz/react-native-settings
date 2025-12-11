/**
 * Extended Configuration Types
 * Account, Support, and Developer configurations
 */

import type { ComponentType } from "react";
import type { FeatureVisibility } from "./FeatureConfig";

/**
 * Account Settings Configuration
 */
export interface AccountConfig {
  /** Show account section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for account screen */
  route?: string;
  /** Custom account title */
  title?: string;
  /** Custom account description */
  description?: string;
}

/**
 * Support Settings Configuration
 */
export interface SupportConfig {
  /** Show support section */
  enabled?: FeatureVisibility;
  /** Support items configuration */
  items?: {
    /** Live support configuration */
    liveSupport?: {
      enabled?: boolean;
      route?: string;
      title?: string;
      description?: string;
    };
    /** Help support configuration */
    helpSupport?: {
      enabled?: boolean;
      route?: string;
      title?: string;
      description?: string;
    };
  };
  /** Custom support section title */
  title?: string;
}

/**
 * Developer Settings Configuration
 */
export interface DeveloperConfig {
  /** Show developer section (only in __DEV__ mode) */
  enabled?: boolean;
  /** Developer settings items */
  items?: Array<{
    title: string;
    description?: string;
    route?: string;
    onPress?: () => void;
    icon?: ComponentType<{ size?: number; color?: string }>;
    iconColor?: string;
    titleColor?: string;
  }>;
  /** Custom developer section title */
  title?: string;
}