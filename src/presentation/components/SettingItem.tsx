/**
 * Setting Item Component
 * Single Responsibility: Render a single settings item
 * Material Design 3 style with hover effects and modern spacing
 */

import React from "react";
import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";

export interface SettingItemProps {
  /** Icon name (Ionicons) */
  icon: string;
  /** Main title text */
  title: string;
  /** Optional description/value text */
  value?: string;
  /** Callback when pressed */
  onPress?: () => void;
  /** Show switch instead of chevron */
  showSwitch?: boolean;
  /** Switch value */
  switchValue?: boolean;
  /** Switch change handler */
  onSwitchChange?: (value: boolean) => void;
  /** Is last item in section (no divider) */
  isLast?: boolean;
  /** Custom icon color */
  iconColor?: string;
  /** Custom title color */
  titleColor?: string;
  /** Test ID for E2E testing */
  testID?: string;
  /** Disable the item */
  disabled?: boolean;
  /** Custom switch thumb color */
  switchThumbColor?: string;
  /** Custom switch track colors */
  switchTrackColors?: {
    false: string;
    true: string;
  };
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  value,
  onPress,
  showSwitch = false,
  switchValue,
  onSwitchChange,
  isLast = false,
  iconColor,
  titleColor,
  testID,
  disabled = false,
  switchThumbColor,
  switchTrackColors,
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: pressed && !disabled && !showSwitch
              ? `${colors.primary}08`
              : 'transparent',
          },
        ]}
        onPress={onPress}
        disabled={showSwitch || disabled}
        testID={testID}
      >
        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconColor
                  ? `${iconColor}15`
                  : `${colors.primary}15`,
              },
            ]}
          >
            <AtomicIcon
              name={icon}
              customSize={24}
              customColor={iconColor || colors.primary}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: disabled
                    ? colors.textSecondary
                    : titleColor || colors.textPrimary,
                  opacity: disabled ? 0.5 : 1,
                },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {value && !showSwitch && (
              <Text
                style={[styles.value, { color: colors.textSecondary }]}
                numberOfLines={2}
              >
                {value}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.rightContainer}>
          {showSwitch ? (
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              trackColor={switchTrackColors || {
                false: `${colors.textSecondary}30`,
                true: colors.primary,
              }}
              thumbColor={switchThumbColor || "#FFFFFF"}
              ios_backgroundColor={`${colors.textSecondary}30`}
            />
          ) : (
            <AtomicIcon
              name="chevron-forward-outline"
              customSize={20}
              customColor={colors.textSecondary}
            />
          )}
        </View>
      </Pressable>

      {!isLast && (
        <View
          style={[
            styles.divider,
            { backgroundColor: `${colors.textSecondary}20` },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 72,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  value: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
    lineHeight: 18,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  divider: {
    height: 1,
    marginLeft: 80,
  },
});
