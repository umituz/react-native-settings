/**
 * Language Item Component Styles
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from "@umituz/react-native-design-system/theme";

export const createLanguageItemStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: tokens.colors.borderLight,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
      marginBottom: tokens.spacing.sm,
      overflow: 'hidden',
    },
    selectedLanguageItem: {
      borderWidth: 2,
      borderColor: tokens.colors.primary,
    },
    languageContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      padding: tokens.spacing.md,
    },
    flag: {
      fontSize: 24,
      marginRight: tokens.spacing.md,
    },
    languageText: {
      flex: 1,
      flexShrink: 1,
    },
    nativeName: {
      fontSize: 16,
      fontWeight: '500',
      color: tokens.colors.textPrimary,
      marginBottom: 2,
    },
    languageName: {
      fontSize: 14,
      color: tokens.colors.textSecondary,
    },
    checkIcon: {
      padding: tokens.spacing.md,
      // Replaced by AtomicIcon
    },
  });

