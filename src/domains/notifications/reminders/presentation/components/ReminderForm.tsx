/**
 * ReminderForm Component
 * Form for creating and editing reminders
 */

import React, { useState, useMemo, useCallback } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { TimePresetSelector } from './TimePresetSelector';
import { FrequencySelector } from './FrequencySelector';
import { WeekdaySelector } from './WeekdaySelector';
import { FormButton } from './FormButton';
import { validateReminderForm } from '../../../../../infrastructure/utils/validation';
import {
  DEFAULT_HOUR,
  DEFAULT_MINUTE,
  DEFAULT_WEEKDAY,
  MAX_TITLE_LENGTH,
  MAX_BODY_LENGTH,
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
  // FIXED: Add error state for user feedback
  const [error, setError] = useState<string | null>(null);

  const handlePresetSelect = useCallback((preset: TimePreset) => {
    setSelectedPresetId(preset.id);
    setHour(preset.hour);
    setMinute(preset.minute);
    setIsCustomTime(false);
    // Clear error when user changes something
    setError(null);
  }, []);

  const handleCustomSelect = useCallback(() => {
    setSelectedPresetId(undefined);
    setIsCustomTime(true);
  }, []);

  const handleSave = useCallback(() => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // Validate using centralized validation
    const validationResult = validateReminderForm({
      title: trimmedTitle,
      body: trimmedBody,
      frequency,
      hour,
      minute,
      weekday,
      maxTitleLength: MAX_TITLE_LENGTH,
      maxBodyLength: MAX_BODY_LENGTH,
    });

    if (!validationResult.isValid) {
      // FIXED: Show error to user
      setError(validationResult.error || "Validation failed");
      return;
    }

    // Clear error and proceed
    setError(null);

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
  }, [title, body, frequency, selectedPresetId, hour, minute, weekday, isCustomTime, onSave]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.titleLabel}</AtomicText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setError(null); // Clear error on input
          }}
          placeholder={translations.titlePlaceholder}
          placeholderTextColor={tokens.colors.textSecondary}
        />
      </View>

      <View style={styles.section}>
        <AtomicText type="bodyMedium" style={styles.label}>{translations.bodyLabel}</AtomicText>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={body}
          onChangeText={(text) => {
            setBody(text);
            setError(null); // Clear error on input
          }}
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

      {/* FIXED: Show error message to user */}
      {error && (
        <View style={styles.section}>
          <AtomicText type="bodySmall" color="error">
            {error}
          </AtomicText>
        </View>
      )}

      <View style={styles.buttonRow}>
        <FormButton label={translations.cancelButton} onPress={onCancel} variant="secondary" />
        {/* FIXED: Disable button when form is invalid */}
        <FormButton
          label={translations.saveButton}
          onPress={handleSave}
          disabled={!title.trim() || !frequency}
        />
      </View>
    </ScrollView>
  );
};
