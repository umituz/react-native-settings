/**
 * SettingItem Component - Paper List.Item Wrapper with Custom Styling
 *
 * Modern settings item built on React Native Paper:
 * - Wraps Paper List.Item for Material Design compliance
 * - Custom gradient icon backgrounds (LinearGradient)
 * - Lucide icons integration (AtomicIcon)
 * - Automatic theme-aware styling
 * - Built-in ripple effects
 * - Accessibility support
 * - Fixed title truncation with proper layout constraints
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import type { IconName } from '@umituz/react-native-design-system';
import type { DesignTokens } from '@umituz/react-native-design-system';

interface SettingItemProps {
  /** Icon name from Lucide library */
  icon: IconName;
  /** Main title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional value to display on the right */
  value?: string;
  /** Callback when pressed */
  onPress?: () => void;
  /** Show chevron arrow on right (default: true if onPress exists) */
  showChevron?: boolean;
  /** Right element to display instead of chevron/value */
  rightElement?: React.ReactNode;
  /** Gradient colors for icon background */
  iconGradient?: string[];
  /** Make item look disabled */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testID?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  value,
  onPress,
  showChevron,
  rightElement,
  iconGradient,
  disabled = false,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  // Gradient colors for icon background
  const gradientColors: readonly [string, string, ...string[]] = (iconGradient && iconGradient.length >= 2) 
    ? (iconGradient as unknown as readonly [string, string, ...string[]])
    : [tokens.colors.surface, tokens.colors.surface] as const;

  const content = (
    <View style={[styles.listItem, disabled && styles.disabled]}>
      {/* Left: Icon with gradient */}
      <View style={styles.leftContainer}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <AtomicIcon name={icon} size="md" color="primary" />
        </LinearGradient>
      </View>

      {/* Center: Title and description */}
      <View style={styles.contentContainer}>
        <AtomicText type="bodyLarge" color="textPrimary" style={styles.title} numberOfLines={2}>
          {title}
        </AtomicText>
        {description && (
          <AtomicText type="bodySmall" color="textSecondary" style={styles.description} numberOfLines={2}>
            {description}
          </AtomicText>
        )}
      </View>

      {/* Right: Value, chevron, or custom element */}
      <View style={styles.rightContainer}>
        {rightElement ? (
          rightElement
        ) : value ? (
          <AtomicText type="bodyMedium" color="textSecondary" style={styles.value} numberOfLines={2}>
            {value}
          </AtomicText>
        ) : (showChevron ?? true) && onPress ? (
          <AtomicIcon name="ChevronRight" size="sm" color="textSecondary" style={styles.chevron} />
        ) : null}
      </View>
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} testID={testID} style={styles.pressable}>
        {content}
      </Pressable>
    );
  }

  return <View testID={testID}>{content}</View>;
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    pressable: {
      borderRadius: tokens.borders.radius.md,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      minHeight: 64,
    },
    disabled: {
      opacity: 0.5,
    },
    contentContainer: {
      flex: 1,
      marginLeft: tokens.spacing.md,
      marginRight: tokens.spacing.md,
    },
    leftContainer: {
      marginRight: tokens.spacing.md,
      justifyContent: 'center',
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: `${tokens.colors.primary}20`,
    },
    title: {
      fontWeight: '600',
      marginBottom: tokens.spacing.xs,
    },
    description: {
      marginTop: tokens.spacing.xs,
      opacity: 0.8,
    },
    rightContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      maxWidth: '50%',
      flexShrink: 0,
    },
    value: {
      fontWeight: '500',
      textAlign: 'right',
    },
    chevron: {
      opacity: 0.6,
    },
  });

