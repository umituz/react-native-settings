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
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
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

  // Render gradient icon container for left prop
  const renderLeft = (props: any) => (
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
  );

  // Render right side content for right prop
  const renderRight = (props: any) => {
    if (rightElement) {
      return <View style={styles.rightContainer}>{rightElement}</View>;
    }

    if (value) {
      return (
        <View style={styles.rightContainer}>
          <AtomicText type="bodyMedium" color="secondary" style={styles.value} numberOfLines={2}>
            {value}
          </AtomicText>
        </View>
      );
    }

    // Show chevron if onPress exists and not explicitly disabled
    if ((showChevron ?? true) && onPress) {
      return (
        <View style={styles.rightContainer}>
          <AtomicIcon name="ChevronRight" size="sm" color="secondary" style={styles.chevron} />
        </View>
      );
    }

    return null;
  };

  return (
    <List.Item
      title={title}
      description={description}
      left={renderLeft}
      right={renderRight}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={styles.listItem}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      titleNumberOfLines={2}
      titleEllipsizeMode="tail"
      descriptionNumberOfLines={2}
      descriptionEllipsizeMode="tail"
    />
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    listItem: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      minHeight: 64,
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
      fontSize: tokens.typography.bodyLarge.fontSize,
      fontWeight: '600',
      color: tokens.colors.textPrimary,
      flexShrink: 1,
    },
    description: {
      fontSize: tokens.typography.bodySmall.fontSize,
      color: tokens.colors.textSecondary,
      marginTop: tokens.spacing.xs,
      opacity: 0.8,
      flexShrink: 1,
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

