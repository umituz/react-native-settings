/**
 * Style Utilities
 * Centralized style creation functions to reduce code duplication
 */
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import type { DesignTokens } from '@umituz/react-native-design-system';

/**
 * Creates a container style with flex 1
 */
export const createContainerStyle = (overrides: ViewStyle = {}): ViewStyle => ({
  flex: 1,
  ...overrides,
});

/**
 * Creates a centered container style
 */
export const createCenteredContainerStyle = (overrides: ViewStyle = {}): ViewStyle => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  ...overrides,
});

/**
 * Creates a row style for horizontal layouts
 */
export const createRowStyle = (overrides: ViewStyle = {}): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  ...overrides,
});

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
 * Creates a scroll content style
 */
export const createScrollContentStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  padding: tokens.spacing.lg,
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
 * Creates a margin utility style
 */
export const createMarginStyle = (
  spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tokens: DesignTokens,
  overrides: ViewStyle = {}
): ViewStyle => ({
  margin: tokens.spacing[spacing],
  ...overrides,
});

/**
 * Creates a padding utility style
 */
export const createPaddingStyle = (
  spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tokens: DesignTokens,
  overrides: ViewStyle = {}
): ViewStyle => ({
  padding: tokens.spacing[spacing],
  ...overrides,
});

/**
 * Combines multiple styles into one
 */
export const combineStyles = (
  ...styles: (ViewStyle | TextStyle | ImageStyle | undefined | false)[]
): ViewStyle | TextStyle | ImageStyle => {
  return StyleSheet.flatten(styles.filter(Boolean));
};

/**
 * Creates a responsive style based on screen dimensions
 */
export const createResponsiveStyle = (
  _tokens: DesignTokens,
  phoneStyle: ViewStyle,
  _tabletStyle?: ViewStyle
): ViewStyle => {
  // For now, return phone style. Can be enhanced with actual responsive logic
  return phoneStyle;
};

/**
 * Type guard for ViewStyle
 */
export const isViewStyle = (style: any): style is ViewStyle => {
  return style && typeof style === 'object';
};

/**
 * Creates a safe area aware style
 */
export const createSafeAreaStyle = (
  insets: { top?: number; bottom?: number; left?: number; right?: number },
  overrides: ViewStyle = {}
): ViewStyle => ({
  paddingTop: insets.top,
  paddingBottom: insets.bottom,
  paddingLeft: insets.left,
  paddingRight: insets.right,
  ...overrides,
});
