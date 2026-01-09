/**
 * RemindersNavRow Styles
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from '@umituz/react-native-design-system';

export const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    navRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: tokens.colors.surfaceSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
      marginRight: 12,
    },
    badge: {
      backgroundColor: tokens.colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      marginRight: 8,
    },
    badgeText: {
      color: tokens.colors.surface,
      fontWeight: '600',
    },
  });
