/**
 * Style Helper Utilities
 * Generic style manipulation functions
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

/**
 * Combines multiple styles into one
 */
export const combineStyles = (
  ...styles: (ViewStyle | TextStyle | ImageStyle | undefined | false | null)[]
): ViewStyle | TextStyle | ImageStyle => {
  return StyleSheet.flatten(styles.filter(Boolean));
};

/**
 * Type guard for ViewStyle
 */
export const isViewStyle = (style: unknown): style is ViewStyle => {
  return typeof style === 'object' && style !== null;
};
