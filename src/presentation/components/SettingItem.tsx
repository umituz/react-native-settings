import React from "react";
import { View, Pressable, StyleSheet, Switch } from "react-native";
import { AtomicIcon, AtomicText, useResponsiveDesignTokens } from "@umituz/react-native-design-system";

export interface SettingItemProps {
  icon: string;
  title: string;
  value?: string;
  onPress?: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isLast?: boolean;
  iconColor?: string;
  titleColor?: string;
  testID?: string;
  disabled?: boolean;
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
}) => {
  const tokens = useResponsiveDesignTokens();
  const colors = tokens.colors;

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { backgroundColor: pressed && !disabled && !showSwitch ? `${colors.primary}08` : 'transparent' },
        ]}
        onPress={onPress}
        disabled={showSwitch || disabled}
        testID={testID}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: iconColor ? `${iconColor}15` : `${colors.primary}15` }]}>
            <AtomicIcon name={icon} customSize={24} customColor={iconColor || colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <AtomicText
              type="bodyLarge"
              style={{
                color: disabled ? colors.textSecondary : titleColor || colors.textPrimary,
                opacity: disabled ? 0.5 : 1,
              }}
              numberOfLines={1}
            >
              {title}
            </AtomicText>
            {value && !showSwitch && (
              <AtomicText type="bodyMedium" style={{ color: colors.textSecondary }} numberOfLines={2}>
                {value}
              </AtomicText>
            )}
          </View>
        </View>

        <View style={styles.rightContainer}>
          {showSwitch ? (
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              trackColor={{ false: `${colors.textSecondary}30`, true: colors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={`${colors.textSecondary}30`}
            />
          ) : (
            <AtomicIcon name="chevron-forward-outline" customSize={20} customColor={colors.textSecondary} />
          )}
        </View>
      </Pressable>
      {!isLast && <View style={[styles.divider, { backgroundColor: `${colors.textSecondary}20` }]} />}
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

