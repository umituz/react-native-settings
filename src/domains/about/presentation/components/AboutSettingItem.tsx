/**
 * About Setting Item Component
 * Reusable setting item for about screen
 * Fully configurable and generic
 * Optimized for performance and memory safety
 */
import React, { useMemo, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

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

import { useAppDesignTokens } from '@umituz/react-native-design-system';

export const AboutSettingItem: React.FC<AboutSettingItemProps> = ({
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
  const colors = tokens.colors;

  // Memoize container type to prevent unnecessary re-renders
  const Container = useMemo(() => {
    return onPress ? TouchableOpacity : View;
  }, [onPress]) as React.ComponentType<React.ComponentProps<typeof TouchableOpacity | typeof View>>;

  // Memoize container styles
  const containerStyles = useMemo(() => {
    return [
      styles.container,
      { backgroundColor: colors.surface },
      disabled && styles.disabled,
      containerStyle
    ];
  }, [disabled, containerStyle, colors.surface]);

  // Memoize icon container styles
  const iconContainerStyles = useMemo(() => {
    return [
      styles.iconContainer,
      iconContainerStyle
    ];
  }, [iconContainerStyle]);

  // Memoize chevron styles
  const chevronStyles = useMemo(() => {
    return [
      styles.chevron,
      { color: chevronColor || colors.textSecondary }
    ];
  }, [chevronColor, colors.textSecondary]);

  // Memoize press handler to prevent unnecessary re-renders
  const handlePress = useCallback(() => {
    if (onPress && !disabled) {
      onPress();
    }
  }, [onPress, disabled]);

  // Memoize icon rendering
  const renderIcon = useMemo(() => {
    if (!icon) {
      return null;
    }

    return (
      <View style={iconContainerStyles}>
        {icon}
      </View>
    );
  }, [icon, iconContainerStyles]);

  // Memoize content rendering
  const renderContent = useMemo(() => {
    return (
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }, titleStyle]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: colors.textSecondary }, descriptionStyle]}>
            {description}
          </Text>
        )}
      </View>
    );
  }, [title, description, titleStyle, descriptionStyle, colors.textPrimary, colors.textSecondary]);

  // Memoize value rendering
  const renderValue = useMemo(() => {
    if (!value) {
      return null;
    }

    return (
      <Text style={[styles.value, { color: colors.textSecondary }, valueStyle]}>{value}</Text>
    );
  }, [value, valueStyle, colors.textSecondary]);

  // Memoize chevron rendering
  const renderChevron = useMemo(() => {
    if (!showChevron) {
      return null;
    }

    return (
      <Text style={chevronStyles}>›</Text>
    );
  }, [showChevron, chevronStyles]);

  return (
    <Container
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
    >
      {renderIcon}
      {renderContent}
      {renderValue}
      {renderChevron}
    </Container>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  value: {
    fontSize: 16,
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