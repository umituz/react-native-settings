/**
 * Domain Entity - Application Information
 * Pure business logic, no external dependencies
 * Part of About Domain
 */
export interface AppInfo {
  /** Application name */
  name: string;
  /** Application version (semver format) */
  version: string;
  /** Application description */
  description?: string;
  /** Developer/Company name */
  developer?: string;
  /** Contact email */
  contactEmail?: string;
  /** Website URL */
  websiteUrl?: string;
  /** Website display text */
  websiteDisplay?: string;
  /** More apps URL */
  moreAppsUrl?: string;
}

/**
 * Configuration interface for About component
 * Fully configurable by parent application
 */
export interface AboutConfig {
  /** Application information */
  appInfo?: Partial<AppInfo>;
  /** Custom theme colors */
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    border?: string;
  };
  /** Custom styling options */
  style?: {
    containerStyle?: Record<string, unknown>;
    itemStyle?: Record<string, unknown>;
    textStyle?: Record<string, unknown>;
    iconStyle?: Record<string, unknown>;
  };
  /** Custom actions */
  actions?: {
    onWebsitePress?: () => void;
    onEmailPress?: () => void;
    onMoreAppsPress?: () => void;
  };
  /** Localized texts for section headers and labels */
  texts?: {
    contact?: string;
    more?: string;
    developer?: string;
    email?: string;
    website?: string;
    moreApps?: string;
    loading?: string;
    errorPrefix?: string;
    noInfo?: string;
    versionPrefix?: string;
  };
  /** Navigation route name */
  route?: string;
  /** Default navigation route name */
  defaultRoute?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Custom onPress handler (overrides navigation) */
  onPress?: () => void;
}