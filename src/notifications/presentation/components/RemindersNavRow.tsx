/**
 * RemindersNavRow Component
 * Reusable navigation row for reminders section with badge
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { createStyles } from './RemindersNavRow.styles';
import { useAppDesignTokens } from '@umituz/react-native-design-system';

export interface RemindersNavRowProps {
  title: string;
  description: string;
  count: number;
  onPress: () => void;
}

export const RemindersNavRow: React.FC<RemindersNavRowProps> = ({
  title,
  description,
  count,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const styles = createStyles(tokens);

  return (
    <TouchableOpacity style={styles.navRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <AtomicIcon name="time" size="md" color="primary" />
      </View>
      <View style={styles.textContainer}>
        <AtomicText type="bodyLarge" style={{ color: tokens.colors.textPrimary }}>
          {title}
        </AtomicText>
        <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary }}>
          {description}
        </AtomicText>
      </View>
      {count > 0 && (
        <View style={styles.badge}>
          <AtomicText type="bodySmall" style={styles.badgeText}>
            {count}
          </AtomicText>
        </View>
      )}
      <AtomicIcon name="chevron-forward" size="md" color="secondary" />
    </TouchableOpacity>
  );
};
