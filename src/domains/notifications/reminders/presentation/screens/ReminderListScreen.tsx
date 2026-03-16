/**
 * ReminderListScreen
 * Displays list of reminders with add, edit, delete functionality
 */

import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AtomicText, AtomicIcon, AtomicSpinner } from '@umituz/react-native-design-system/atoms';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import { ReminderItem } from '../components/ReminderItem';
import { useReminders, useRemindersLoading } from '../../../infrastructure/storage/UnifiedNotificationStore';
import { useReminderActions } from '../../infrastructure/hooks/useReminderActions';
import type { Reminder, ReminderTranslations } from '../../../infrastructure/services/types';
import { devError } from '../../../../../utils/devUtils';

export interface ReminderListScreenProps {
  translations: ReminderTranslations;
  onAddPress: () => void;
  onEditPress: (reminder: Reminder) => void;
  maxReminders?: number;
}

export const ReminderListScreen: React.FC<ReminderListScreenProps> = ({
  translations,
  onAddPress,
  onEditPress,
  maxReminders = 20,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const reminders = useReminders();
  const isLoading = useRemindersLoading();
  const { toggleReminderEnabled, removeReminder } = useReminderActions();

  const handleToggle = useCallback(async (id: string) => {
    try {
      await toggleReminderEnabled(id);
    } catch (error) {
      devError('[ReminderListScreen] Failed to toggle reminder:', error);
    }
  }, [toggleReminderEnabled]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await removeReminder(id);
    } catch (error) {
      devError('[ReminderListScreen] Failed to delete reminder:', error);
    }
  }, [removeReminder]);

  const canAddMore = reminders.length < maxReminders;

  const fab = canAddMore ? (
    <TouchableOpacity style={styles.fab} onPress={onAddPress} activeOpacity={0.8}>
      <AtomicIcon
        svgPath="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
        customSize={20}
        customColor={tokens.colors.onPrimary}
      />
      <AtomicText type="bodyMedium" style={styles.fabText}>{translations.addButtonLabel}</AtomicText>
    </TouchableOpacity>
  ) : null;

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <AtomicIcon
          svgPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 18c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          customSize={48}
          customColor={tokens.colors.secondary}
        />
      </View>
      <AtomicText type="bodyLarge" style={styles.emptyTitle}>{translations.emptyTitle}</AtomicText>
      <AtomicText type="bodySmall" style={styles.emptyDescription}>{translations.emptyDescription}</AtomicText>
    </View>
  ), [translations.emptyTitle, translations.emptyDescription, tokens.colors]);

  const renderItem = useCallback(({ item }: { item: Reminder }) => (
    <ReminderItem
      reminder={item}
      translations={{
        frequencyOnce: translations.frequencyOnce,
        frequencyDaily: translations.frequencyDaily,
        frequencyWeekly: translations.frequencyWeekly,
        frequencyMonthly: translations.frequencyMonthly,
      }}
      onToggle={handleToggle}
      onEdit={onEditPress}
      onDelete={handleDelete}
    />
  ), [translations, handleToggle, onEditPress, handleDelete]);

  const keyExtractor = useCallback((item: Reminder) => item.id, []);

  if (isLoading) {
    return (
      <ScreenLayout footer={fab}>
        <AtomicSpinner size="lg" color="primary" fullContainer />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout footer={fab} scrollable={false}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={reminders.length === 0 ? styles.listEmptyContent : styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={8}
        windowSize={5}
      />
    </ScreenLayout>
  );
};

const createStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    listContent: { padding: 16, flexGrow: 1 },
    listEmptyContent: { flexGrow: 1 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, paddingTop: 100 },
    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: tokens.colors.surfaceSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    emptyTitle: { color: tokens.colors.textPrimary, textAlign: 'center', marginBottom: 8 },
    emptyDescription: { color: tokens.colors.textSecondary, textAlign: 'center' },
    fab: {
      backgroundColor: tokens.colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    fabText: { color: tokens.colors.onPrimary, fontWeight: '600' },
  });
