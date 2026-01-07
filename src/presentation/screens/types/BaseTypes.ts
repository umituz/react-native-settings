/**
 * Base Feature Types
 * Core types for feature visibility and configuration
 */

/**
 * Feature visibility configuration
 * - true: Always show (if navigation screen exists)
 * - false: Never show
 * - 'auto': Automatically detect (check if navigation screen exists and package is available)
 */
export type FeatureVisibility = boolean | "auto";
