/**
 * NotificationSettingsScreen Styles
 * Extracted styles for better organization and maintainability
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from '@umituz/react-native-design-system';

export const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: tokens.colors.surface,
    },
    divider: {
      height: 1,
      backgroundColor: tokens.colors.surfaceSecondary,
      marginVertical: 12,
    },
  });
