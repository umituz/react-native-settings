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
  const { colors, spacing } = tokens;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed && !disabled && !showSwitch ? tokens.colors.surfaceVariant : 'transparent',
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: `${colors.onSurface}10`,
        },
      ]}
      onPress={onPress}
      disabled={showSwitch || disabled}
      testID={testID}
    >
      <View style={styles.content}>
        <View style={[styles.iconWrapper, { backgroundColor: iconColor ? `${iconColor}15` : `${colors.primary}15` }]}>
          <AtomicIcon
            name={icon}
            size="md"
            customColor={iconColor || colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <AtomicText
            type="bodyLarge"
            color={disabled ? "surfaceVariant" : "onSurface"}
            style={[
              titleColor ? { color: titleColor } : {},
              { opacity: disabled ? 0.6 : 1 }
            ]}
            numberOfLines={1}
          >
            {title}
          </AtomicText>
          {value && !showSwitch && (
            <AtomicText
              type="bodySmall"
              color="secondary"
              numberOfLines={2}
              style={{ marginTop: 2 }}
            >
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
            trackColor={{ false: colors.surfaceVariant, true: colors.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.surfaceVariant}
          />
        ) : (
          <AtomicIcon
            name="chevron-forward"
            size="sm"
            color="secondary"
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 64,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});


