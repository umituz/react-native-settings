import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { SettingsItemCard } from "./SettingsItemCard";

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

/**
 * SettingItem - Enhanced ListItem for Settings
 * Uses design system's ListItem molecule with custom switch support
 */
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
  const tokens = useAppDesignTokens();

  // For switch items, we need custom rendering
  if (showSwitch) {
    return (
      <View
        style={[
          styles.switchContainer,
          {
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: `${tokens.colors.onSurface}10`,
          }
        ]}
      >
        <View style={styles.switchContent}>
          <View style={[
            styles.iconWrapper,
            { backgroundColor: iconColor ? `${iconColor}15` : `${tokens.colors.primary}15` }
          ]}>
            <AtomicIcon
              name={icon}
              size="md"
              customColor={iconColor || tokens.colors.primary}
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
            {value && (
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
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{
            false: tokens.colors.surfaceVariant,
            true: tokens.colors.primary
          }}
          thumbColor={tokens.colors.surface}
          ios_backgroundColor={tokens.colors.surfaceVariant}
          disabled={disabled}
        />
      </View>
    );
  }

  // Use SettingsItemCard for regular items
  return (
    <SettingsItemCard
      title={title}
      description={value}
      icon={icon as any}
      onPress={onPress}
      iconColor={iconColor}
    />
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 64,
  },
  switchContent: {
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
});
