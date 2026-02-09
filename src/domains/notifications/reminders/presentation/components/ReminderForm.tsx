/**
 * ReminderForm Component
 * Form for creating and editing reminders
 */

import React, { useState, useMemo, useCallback } from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { TimePresetSelector } from './TimePresetSelector';
import { FrequencySelector } from './FrequencySelector';
import { WeekdaySelector } from './WeekdaySelector';
import { FormButton } from './FormButton';
import { 
  DEFAULT_HOUR, 
  DEFAULT_MINUTE, 
  DEFAULT_WEEKDAY, 
  MAX_TITLE_LENGTH, 
  MAX_BODY_LENGTH, 
  VALID_HOUR_RANGE, 
  VALID_MINUTE_RANGE, 
  VALID_WEEKDAY_RANGE,
  type ReminderFormProps,
} from './ReminderForm.constants';
import { createReminderFormStyles as createStyles } from './ReminderForm.styles';
import { DEFAULT_TIME_PRESETS, FREQUENCY_OPTIONS } from '../../infrastructure/config/reminderPresets';
import type { ReminderFrequency, TimePreset } from '../../../infrastructure/services/types';

export const ReminderForm: React.FC<ReminderFormProps> = ({
  initialData,
  translations,
  onSave,
  onCancel,
  timePresets = DEFAULT_TIME_PRESETS,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [frequency, setFrequency] = useState<ReminderFrequency>(initialData?.frequency || 'daily');
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(initialData?.timePresetId);
  const [hour, setHour] = useState(initialData?.hour ?? DEFAULT_HOUR);
  const [minute, setMinute] = useState(initialData?.minute ?? DEFAULT_MINUTE);
  const [weekday, setWeekday] = useState(initialData?.weekday ?? DEFAULT_WEEKDAY);
  const [isCustomTime, setIsCustomTime] = useState(!initialData?.timePresetId);

  // Validation helper functions
  const isValidHour = useCallback((h: number): boolean => {
    return h >= VALID_HOUR_RANGE.min && h <= VALID_HOUR_RANGE.max;
  }, []);

  const isValidMinute = useCallback((m: number): boolean => {
    return m >= VALID_MINUTE_RANGE.min && m <= VALID_MINUTE_RANGE.max;
  }, []);

  const isValidWeekday = useCallback((w: number): boolean => {
    return w >= VALID_WEEKDAY_RANGE.min && w <= VALID_WEEKDAY_RANGE.max;
  }, []);

  const handlePresetSelect = useCallback((preset: TimePreset) => {
    setSelectedPresetId(preset.id);
    setHour(preset.hour);
    setMinute(preset.minute);
    setIsCustomTime(false);
  }, []);

  const handleCustomSelect = useCallback(() => {
    setSelectedPresetId(undefined);
    setIsCustomTime(true);
  }, []);

  const handleSave = useCallback(() => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // Validate title
    if (!trimmedTitle) {
      console.warn('Reminder title is required');
      return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      console.warn(`Reminder title exceeds maximum length of ${MAX_TITLE_LENGTH}`);
      return;
    }

    // Validate body length
    if (trimmedBody.length > MAX_BODY_LENGTH) {
      console.warn(`Reminder body exceeds maximum length of ${MAX_BODY_LENGTH}`);
      return;
    }

    // Validate time values
    if (!isValidHour(hour) || !isValidMinute(minute)) {
      console.warn('Invalid time values');
      return;
    }

    // Validate weekday if frequency is weekly
    if (frequency === 'weekly' && !isValidWeekday(weekday)) {
      console.warn('Invalid weekday value');
      return;
    }

    // Sanitize input (React Native handles XSS, but we trim extra whitespace)
    const sanitizedTitle = trimmedTitle.replace(/\s+/g, ' ').trim();
    const sanitizedBody = trimmedBody.replace(/\s+/g, ' ').trim();

    onSave({
      title: sanitizedTitle,
      body: sanitizedBody,
      frequency,
      timePresetId: isCustomTime ? undefined : selectedPresetId,
      hour,
      minute,
      weekday: frequency === 'weekly' ? weekday : undefined,
      dayOfMonth: frequency === 'monthly' ? 1 : undefined,
    });
  }, [title, body, frequency, selectedPresetId, hour, minute, weekday, isCustomTime, onSave, isValidHour, isValidMinute, isValidWeekday]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.titleLabel}</AtomicText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder={translations.titlePlaceholder}
          placeholderTextColor={tokens.colors.textSecondary}
        />
      </View>

      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.bodyLabel}</AtomicText>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={body}
          onChangeText={setBody}
          placeholder={translations.bodyPlaceholder}
          placeholderTextColor={tokens.colors.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.frequencyLabel}</AtomicText>
        <FrequencySelector
          options={FREQUENCY_OPTIONS}
          selectedFrequency={frequency}
          onSelect={setFrequency}
          getLabel={translations.getFrequencyLabel}
        />
      </View>

      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.timeLabel}</AtomicText>
        <TimePresetSelector
          presets={timePresets}
          selectedPresetId={selectedPresetId}
          customTime={isCustomTime ? { hour, minute } : undefined}
          onSelectPreset={handlePresetSelect}
          onSelectCustom={handleCustomSelect}
          getPresetLabel={translations.getPresetLabel}
          customLabel={translations.customTimeLabel}
          isCustomSelected={isCustomTime}
        />
      </View>

      {frequency === 'weekly' && (
        <View style={styles.section}>
          <AtomicText type="bodyMedium" style={styles.label}>{translations.weekdayLabel}</AtomicText>
          <WeekdaySelector selectedWeekday={weekday} onSelect={setWeekday} getLabel={translations.getWeekdayLabel} />
        </View>
      )}

      <View style={styles.buttonRow}>
        <FormButton label={translations.cancelButton} onPress={onCancel} variant="secondary" />
        <FormButton label={translations.saveButton} onPress={handleSave} disabled={!title.trim()} />
      </View>
    </ScrollView>
  );
};
