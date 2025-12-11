/**
 * Feature Configuration Types
 * Core types for feature visibility and configuration
 */
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
}
/**
 * Notifications Settings Configuration
 */
export interface NotificationsConfig {
    /** Show notifications section */
    enabled?: FeatureVisibility;
    /** Custom navigation route for notifications screen */
    route?: string;
    /** Show notifications toggle switch */
    showToggle?: boolean;
    /** Initial notifications state */
    initialValue?: boolean;
    /** Custom toggle handler */
    onToggleChange?: (value: boolean) => void;
    /** Custom notifications title */
    title?: string;
    /** Custom notifications description */
    description?: string;
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
}
//# sourceMappingURL=FeatureConfig.d.ts.map