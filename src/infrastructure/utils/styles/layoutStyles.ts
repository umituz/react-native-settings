/**
 * Layout Style Utilities
 * Common layout patterns
 */

import type { ViewStyle } from 'react-native';
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
 * Creates a scroll content style
 */
export const createScrollContentStyle = (tokens: DesignTokens, overrides: ViewStyle = {}): ViewStyle => ({
  padding: tokens.spacing.lg,
  ...overrides,
});

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
