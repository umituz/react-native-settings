/**
 * Spacing Style Utilities
 * Margin and padding helpers
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '@umituz/react-native-design-system';

type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Creates a margin utility style
 */
export const createMarginStyle = (
  spacing: SpacingSize,
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
  spacing: SpacingSize,
  tokens: DesignTokens,
  overrides: ViewStyle = {}
): ViewStyle => ({
  padding: tokens.spacing[spacing],
  ...overrides,
});
