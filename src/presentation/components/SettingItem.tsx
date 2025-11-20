/**
 * Setting Item Component
 * Single Responsibility: Render a single settings item
 * Modern design with Lucide icons and switch support
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

export interface SettingItemProps {
  /** Icon component from lucide-react-native */
  icon: LucideIcon | React.ComponentType<{ size?: number; color?: string }>;
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
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon: Icon,
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
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;
  const spacing = tokens.spacing;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
        onPress={onPress}
        disabled={showSwitch}
        activeOpacity={0.7}
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
            <Icon size={20} color={iconColor || colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: titleColor || colors.textPrimary },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {value && !showSwitch && (
              <Text
                style={[styles.value, { color: colors.textSecondary }]}
                numberOfLines={1}
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
              trackColor={{
                false: `${colors.textSecondary}30`,
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          ) : (
            <ChevronRight size={18} color={colors.textSecondary} />
          )}
        </View>
      </TouchableOpacity>

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
    paddingVertical: 14,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2,
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
