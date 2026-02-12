/**
 * ReminderListScreen
 * Displays list of reminders with add, edit, delete functionality
 */

import React, { useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {
  AtomicText,
  AtomicIcon,
  AtomicSpinner,
  ScreenLayout,
  NavigationHeader,
  useAppNavigation,
  useAppDesignTokens
} from '@umituz/react-native-design-system';
import { ReminderItem } from '../components/ReminderItem';
import { useReminders, useRemindersLoading } from '../../infrastructure/storage/RemindersStore';
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
  const navigation = useAppNavigation();
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
      // TODO: Show error toast to user
    }
  }, [toggleReminderEnabled]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await removeReminder(id);
    } catch (error) {
      devError('[ReminderListScreen] Failed to delete reminder:', error);
      // TODO: Show error toast to user
    }
  }, [removeReminder]);

  const canAddMore = reminders.length < maxReminders;

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

  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <AtomicIcon name="notifications-off" size="xl" color="secondary" />
      </View>
      <AtomicText type="bodyLarge" style={styles.emptyTitle}>{translations.emptyTitle}</AtomicText>
      <AtomicText type="bodySmall" style={styles.emptyDescription}>{translations.emptyDescription}</AtomicText>
    </View>
  ), [translations, styles]);

  const keyExtractor = useCallback((item: Reminder) => item.id, []);

  const header = (
    <NavigationHeader
      title={translations.screenTitle}
      onBackPress={() => navigation.goBack()}
    />
  );

  if (isLoading) {
    return (
      <ScreenLayout header={header}>
        <AtomicSpinner size="lg" color="primary" fullContainer />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout header={header}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {canAddMore && (
        <TouchableOpacity style={styles.fab} onPress={onAddPress} activeOpacity={0.8}>
          <AtomicIcon name="add" size="md" color="onPrimary" />
          <AtomicText type="bodyMedium" style={styles.fabText}>{translations.addButtonLabel}</AtomicText>
        </TouchableOpacity>
      )}
    </ScreenLayout>
  );
};

const createStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: 16, paddingBottom: 100, flexGrow: 1 },
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
      position: 'absolute',
      bottom: 24,
      left: 16,
      right: 16,
      backgroundColor: tokens.colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    fabText: { color: tokens.colors.onPrimary, fontWeight: '600' },
  });
