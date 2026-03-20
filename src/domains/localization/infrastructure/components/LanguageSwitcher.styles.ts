/**
 * Language Switcher Component Styles
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from "@umituz/react-native-design-system/theme";

const DEFAULT_CONFIG = {
  defaultIconSize: 20,
};

export const createLanguageSwitcherStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.xs,
      paddingVertical: tokens.spacing.xs,
    },
    disabled: {
      opacity: 0.5,
    },
    flag: {
      fontSize: DEFAULT_CONFIG.defaultIconSize,
      textAlign: 'center',
    },
    languageName: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      color: tokens.colors.textPrimary,
    },
    icon: {
      fontSize: DEFAULT_CONFIG.defaultIconSize,
      textAlign: 'center',
    },
  });

export const DEFAULT_CONFIG_VALUES = {
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 } as const,
  activeOpacity: 0.7,
};
