import { StyleSheet } from 'react-native';
import type { useAppDesignTokens } from '@umituz/react-native-design-system';

export const createReminderFormStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: tokens.colors.surface,
    },
    section: { marginBottom: 20 },
    label: { color: tokens.colors.textPrimary, marginBottom: 8 },
    input: {
      backgroundColor: tokens.colors.surfaceSecondary,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: tokens.colors.textPrimary,
    },
    multilineInput: { minHeight: 80, textAlignVertical: 'top' },
    buttonRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  });
