/**
 * Disclaimer Card Component
 * Extracted from DisclaimerSetting to follow single responsibility and 200-line rules
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  type TextStyle,
} from 'react-native';

import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import type { IconName } from '@umituz/react-native-design-system';

export interface DisclaimerCardProps {
  title: string;
  shortMessage: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  onPress: () => void;
}

export const DisclaimerCard: React.FC<DisclaimerCardProps> = ({
  title,
  shortMessage,
  iconName,
  iconColor,
  backgroundColor,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      testID="disclaimer-setting"
    >
      {/* Icon and Title Row */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: withAlpha(iconColor, 0.2),
              borderColor: withAlpha(iconColor, 0.4),
              borderWidth: 1,
            },
          ]}
        >
          <AtomicIcon name={iconName as IconName} color="warning" />
        </View>
        <AtomicText type="bodyLarge" color="primary" style={styles.title}>
          {title}
        </AtomicText>
        <AtomicIcon name="arrow-right" color="secondary" size="sm" />
      </View>

      {/* Short Message */}
      <AtomicText
        type="bodySmall"
        color="secondary"
        style={styles.shortMessage}
      >
        {shortMessage}
      </AtomicText>
    </TouchableOpacity>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      marginHorizontal: tokens.spacing.md,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 12,
    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    title: {
      flex: 1,
      fontWeight: tokens.typography.labelLarge.fontWeight as TextStyle['fontWeight'],
      fontSize: tokens.typography.labelLarge.fontSize,
    },

    shortMessage: {
      lineHeight: 18,
      paddingLeft: 52, // Align with title (40px icon + 12px margin)
      fontSize: 13, // Or tokens.typography.bodySmall.responsiveFontSize
    },
  });