/**
 * About Setting Item Component
 * Reusable setting item for about screen
 * Fully configurable and generic
 * Optimized for performance and memory safety
 */
import React, { memo, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';

export interface AboutSettingItemProps {
  /** Icon component (any React component) */
  icon?: React.ReactNode;
  /** Main title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional value to display on the right */
  value?: string;
  /** Callback when pressed */
  onPress?: () => void;
  /** Show chevron arrow on right */
  showChevron?: boolean;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom title style */
  titleStyle?: TextStyle;
  /** Custom description style */
  descriptionStyle?: TextStyle;
  /** Custom value style */
  valueStyle?: TextStyle;
  /** Custom icon container style */
  iconContainerStyle?: ViewStyle;
  /** Make item look disabled */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testID?: string;
  /** Custom chevron color */
  chevronColor?: string;
}

export const AboutSettingItem: React.FC<AboutSettingItemProps> = memo(({
  icon,
  title,
  description,
  value,
  onPress,
  showChevron = !!onPress,
  containerStyle,
  titleStyle,
  descriptionStyle,
  valueStyle,
  iconContainerStyle,
  disabled = false,
  testID,
  chevronColor,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);
  const colors = tokens.colors;

  const Container = onPress ? TouchableOpacity : View;

  const handlePress = useCallback(() => {
    if (onPress && !disabled) {
      onPress();
    }
  }, [onPress, disabled]);

  const containerStyles = [
    styles.container,
    { backgroundColor: colors.surface },
    disabled && styles.disabled,
    containerStyle,
  ];

  const iconContainerStyles = [
    styles.iconContainer,
    iconContainerStyle,
  ];

  const chevronStyles = [
    styles.chevron,
    { color: chevronColor || colors.textSecondary },
  ];

  return (
    <Container
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
    >
      {icon && <View style={iconContainerStyles}>{icon}</View>}

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }, titleStyle]}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.description, { color: colors.textSecondary }, descriptionStyle]}>
            {description}
          </Text>
        )}
      </View>

      {value && (
        <Text style={[styles.value, { color: colors.textSecondary }, valueStyle]}>
          {value}
        </Text>
      )}

      {showChevron && <Text style={chevronStyles}>›</Text>}
    </Container>
  );
});

const getStyles = (tokens: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: tokens.typography.bodyLarge.responsiveFontSize,
    fontWeight: '500',
  },
  description: {
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    marginTop: 2,
  },
  value: {
    fontSize: tokens.typography.bodyLarge.responsiveFontSize,
    marginRight: 8,
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '60%',
  },
  chevron: {
    fontSize: 20,
    fontWeight: '300',
  },
});
