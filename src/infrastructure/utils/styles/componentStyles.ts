/**
 * Component Style Utilities
 * Reusable component styling patterns
 */

import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '@umituz/react-native-design-system';

/**
 * Creates a header style
 */
export const createHeaderStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  paddingHorizontal: tokens.spacing.lg,
  paddingVertical: tokens.spacing.md,
  ...overrides,
});

/**
 * Creates a section style
 */
export const createSectionStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  padding: tokens.spacing.lg,
  ...overrides,
});

/**
 * Creates a card style
 */
export const createCardStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  backgroundColor: tokens.colors.surface,
  borderRadius: tokens.borders.radius.md,
  padding: tokens.spacing.lg,
  ...overrides,
});

/**
 * Creates a button style
 */
export const createButtonStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  backgroundColor: tokens.colors.primary,
  borderRadius: tokens.borders.radius.md,
  paddingVertical: tokens.spacing.md,
  paddingHorizontal: tokens.spacing.lg,
  ...overrides,
});

/**
 * Creates an icon container style
 */
export const createIconContainerStyle = (
  size: number = 48,
  tokens: DesignTokens,
  overrides: ViewStyle = {}
): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: tokens.colors.surfaceSecondary,
  ...overrides,
});

/**
 * Creates a separator/border style
 */
export const createSeparatorStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  height: 1,
  backgroundColor: tokens.colors.border,
  ...overrides,
});

/**
 * Creates a title text style
 */
export const createTitleStyle = (tokens: DesignTokens, overrides: TextStyle = {}): TextStyle => ({
  fontSize: tokens.typography.headlineMedium.responsiveFontSize,
  fontWeight: '600',
  color: tokens.colors.textPrimary,
  ...overrides,
});

/**
 * Creates a subtitle text style
 */
export const createSubtitleStyle = (tokens: DesignTokens, overrides: TextStyle = {}): TextStyle => ({
  fontSize: tokens.typography.bodyMedium.responsiveFontSize,
  color: tokens.colors.textSecondary,
  ...overrides,
});
