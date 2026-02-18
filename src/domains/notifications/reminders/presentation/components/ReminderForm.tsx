/**
 * ReminderForm Component
 * Form for creating and editing reminders
 */

import React, { useReducer, useMemo, useCallback } from 'react';
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

interface ReminderFormState {
  title: string;
  body: string;
  frequency: ReminderFrequency;
  selectedPresetId: string | undefined;
  hour: number;
  minute: number;
  weekday: number;
  isCustomTime: boolean;
  error: string | null;
}

type ReminderFormAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_BODY'; payload: string }
  | { type: 'SET_FREQUENCY'; payload: ReminderFrequency }
  | { type: 'SET_WEEKDAY'; payload: number }
  | { type: 'SELECT_PRESET'; payload: TimePreset }
  | { type: 'SELECT_CUSTOM' }
  | { type: 'SET_ERROR'; payload: string | null };

function reminderFormReducer(state: ReminderFormState, action: ReminderFormAction): ReminderFormState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload, error: null };
    case 'SET_BODY':
      return { ...state, body: action.payload, error: null };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.payload };
    case 'SET_WEEKDAY':
      return { ...state, weekday: action.payload };
    case 'SELECT_PRESET':
      return {
        ...state,
        selectedPresetId: action.payload.id,
        hour: action.payload.hour,
        minute: action.payload.minute,
        isCustomTime: false,
        error: null,
      };
    case 'SELECT_CUSTOM':
      return { ...state, selectedPresetId: undefined, isCustomTime: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
  }
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  initialData,
  translations,
  onSave,
  onCancel,
  timePresets = DEFAULT_TIME_PRESETS,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const [state, dispatch] = useReducer(reminderFormReducer, {
    title: initialData?.title || '',
    body: initialData?.body || '',
    frequency: initialData?.frequency || 'daily',
    selectedPresetId: initialData?.timePresetId,
    hour: initialData?.hour ?? DEFAULT_HOUR,
    minute: initialData?.minute ?? DEFAULT_MINUTE,
    weekday: initialData?.weekday ?? DEFAULT_WEEKDAY,
    isCustomTime: !initialData?.timePresetId,
    error: null,
  });

  const { title, body, frequency, selectedPresetId, hour, minute, weekday, isCustomTime, error } = state;

  const handlePresetSelect = useCallback((preset: TimePreset) => {
    dispatch({ type: 'SELECT_PRESET', payload: preset });
  }, []);

  const handleCustomSelect = useCallback(() => {
    dispatch({ type: 'SELECT_CUSTOM' });
  }, []);

  const handleSave = useCallback(() => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

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
      dispatch({ type: 'SET_ERROR', payload: validationResult.error || "Validation failed" });
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: null });

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
            dispatch({ type: 'SET_TITLE', payload: text });
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
            dispatch({ type: 'SET_BODY', payload: text });
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
          onSelect={(freq: ReminderFrequency) => dispatch({ type: 'SET_FREQUENCY', payload: freq })}
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
          <WeekdaySelector selectedWeekday={weekday} onSelect={(day: number) => dispatch({ type: 'SET_WEEKDAY', payload: day })} getLabel={translations.getWeekdayLabel} />
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
