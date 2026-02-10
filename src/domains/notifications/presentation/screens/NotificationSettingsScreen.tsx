/**
 * NotificationSettingsScreen
 * Clean presentation-only screen for notification settings
 */

import React from 'react';
import { View } from 'react-native';
import { 
  AtomicCard, 
  ScreenLayout, 
  AtomicSpinner,
  NavigationHeader,
  useAppDesignTokens,
  useAppNavigation
} from '@umituz/react-native-design-system';
import { QuietHoursCard } from '../../quietHours/presentation/components/QuietHoursCard';
import { SettingRow } from '../components/SettingRow';
import { RemindersNavRow } from '../components/RemindersNavRow';
import { useNotificationSettingsUI } from '../hooks/useNotificationSettingsUI';
import { useTimePicker } from '../hooks/useTimePicker';
import { useReminders } from '../../reminders/infrastructure/storage/RemindersStore';
import { useQuietHoursActions } from '../../quietHours/infrastructure/hooks/useQuietHoursActions';
import type { NotificationSettingsTranslations, QuietHoursTranslations } from '../../infrastructure/services/types';
import { createStyles } from './NotificationSettingsScreen.styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface NotificationSettingsScreenProps {
  translations: NotificationSettingsTranslations;
  quietHoursTranslations: QuietHoursTranslations;
  onHapticFeedback?: () => void;
}

export const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({
  translations,
  quietHoursTranslations,
  onHapticFeedback,
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const styles = createStyles(tokens);
  const reminders = useReminders();
  const { setStartTime, setEndTime } = useQuietHoursActions();

  const {
    preferences,
    quietHours,
    isLoading,
    handleMasterToggle,
    handleSoundToggle,
    handleVibrationToggle,
    handleQuietHoursToggle,
  } = useNotificationSettingsUI();

  const timePicker = useTimePicker({
    quietHours,
    onStartTimeChange: setStartTime,
    onEndTimeChange: setEndTime,
  });

  const handleRemindersPress = () => {
    // Navigate to reminders screen when implemented
  };

  const headerTitle = translations.screenTitle || "";

  if (isLoading) {
    return (
      <ScreenLayout
        header={
          <NavigationHeader 
            title={headerTitle} 
            onBackPress={() => navigation.goBack()} 
          />
        }
      >
        <AtomicSpinner size="lg" color="primary" fullContainer />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout 
      hideScrollIndicator
      header={
        <NavigationHeader 
          title={headerTitle} 
          onBackPress={() => navigation.goBack()} 
        />
      }
    >
      <View style={styles.container}>
        <AtomicCard style={styles.card}>
          <SettingRow
            iconName="notifications"
            title={translations.masterToggleTitle}
            description={translations.masterToggleDescription}
            value={preferences.enabled}
            onToggle={handleMasterToggle}
            onHapticFeedback={onHapticFeedback}
          />
        </AtomicCard>

        {preferences.enabled && (
          <>
            <AtomicCard style={styles.card}>
              <SettingRow
                iconName="volume-high"
                title={translations.soundTitle}
                description={translations.soundDescription}
                value={preferences.sound}
                onToggle={handleSoundToggle}
                onHapticFeedback={onHapticFeedback}
              />
              <View style={styles.divider} />
              <SettingRow
                iconName="phone-portrait"
                title={translations.vibrationTitle}
                description={translations.vibrationDescription}
                value={preferences.vibration}
                onToggle={handleVibrationToggle}
                onHapticFeedback={onHapticFeedback}
              />
            </AtomicCard>

            <AtomicCard style={styles.card}>
              <RemindersNavRow
                title={translations.remindersTitle}
                description={translations.remindersDescription}
                count={reminders.length}
                onPress={handleRemindersPress}
              />
            </AtomicCard>

            <QuietHoursCard
              config={quietHours}
              translations={quietHoursTranslations}
              onToggle={handleQuietHoursToggle}
              onStartTimePress={timePicker.handleStartTimePress}
              onEndTimePress={timePicker.handleEndTimePress}
            />
          </>
        )}
      </View>
      {timePicker.pickerMode && (
        <DateTimePicker
          value={timePicker.getPickerDate()}
          mode="time"
          is24Hour={true}
          onChange={timePicker.handleTimeChange}
        />
      )}
    </ScreenLayout>
  );
};
