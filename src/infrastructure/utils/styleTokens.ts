/**
 * Style Tokens
 * Centralized design tokens to replace magic numbers across the codebase
 */

/**
 * Spacing tokens - replaces magic numbers for padding, margins, gaps
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * Font size tokens - replaces magic numbers for font sizes
 */
export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
} as const;

/**
 * Border radius tokens - replaces magic numbers for border radius
 */
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/**
 * Opacity tokens - replaces magic numbers for opacity values
 */
export const OPACITY = {
  disabled: 0.3,
  hover: 0.7,
  focus: 0.8,
  pressed: 0.9,
  overlay: 0.5,
  icon: 0.6,
} as const;

/**
 * Icon size tokens
 */
export const ICON_SIZE = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
} as const;

/**
 * Layout dimension tokens
 */
export const DIMENSION = {
  touchTarget: {
    minHeight: 44,
    minWidth: 44,
  },
  card: {
    minHeight: 72,
  },
  input: {
    minHeight: 48,
  },
  button: {
    minHeight: 44,
    height: 48,
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    xxl: 96,
  },
} as const;

/**
 * Z-index tokens for layering
 */
export const Z_INDEX = {
  base: 0,
  overlay: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  toast: 700,
} as const;

/**
 * Animation duration tokens (in ms)
 */
export const DURATION = {
  fast: 150,
  normal: 250,
  slow: 350,
  extraSlow: 500,
} as const;

/**
 * Type exports for token values
 */
export type SpacingToken = typeof SPACING[keyof typeof SPACING];
export type FontSizeToken = typeof FONT_SIZE[keyof typeof FONT_SIZE];
export type BorderRadiusToken = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS];
export type OpacityToken = typeof OPACITY[keyof typeof OPACITY];
export type IconSizeToken = typeof ICON_SIZE[keyof typeof ICON_SIZE];
export type ZIndexToken = typeof Z_INDEX[keyof typeof Z_INDEX];
export type DurationToken = typeof DURATION[keyof typeof DURATION];
