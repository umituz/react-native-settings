import React from "react";
import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import {
  useAppDesignTokens,
  type IconName,
  withAlpha,
} from "@umituz/react-native-design-system";
import { validateTitle, validateDescription, validateSwitchProps } from "../../infrastructure/utils/validators";
import { sanitizeTitle, sanitizeDescription } from "../../infrastructure/utils/sanitizers";
import { TEXT_LENGTH_LIMITS } from "../../infrastructure/utils/constants/textLimits";
import { SettingsItemCardRightElement } from "./settings/SettingsItemCardRightElement";
import { SettingsItemCardContent } from "./settings/SettingsItemCardContent";
import { SettingsItemCardSection } from "./settings/SettingsItemCardSection";

export interface SettingsItemCardProps {
  title: string;
  description?: string;
  icon: IconName;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  sectionTitle?: string;
  rightIcon?: IconName;
  iconBgColor?: string;
  iconColor?: string;
  showChevron?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  disabled?: boolean;
  noBackground?: boolean;
  hideMargin?: boolean;
}

export const SettingsItemCard: React.FC<SettingsItemCardProps> = ({
  title,
  description,
  icon,
  onPress,
  containerStyle: propContainerStyle,
  sectionTitle,
  rightIcon = "chevron-forward",
  iconBgColor,
  iconColor,
  showChevron,
  showSwitch = false,
  switchValue,
  onSwitchChange,
  disabled = false,
  noBackground = false,
  hideMargin = false,
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  // Sanitize props (before hooks)
  const sanitizedTitle = sanitizeTitle(title);
  const sanitizedDescription = sanitizeDescription(description);
  const sanitizedSectionTitle = sectionTitle?.trim().slice(0, TEXT_LENGTH_LIMITS.TITLE_SHORT);

  const defaultIconBg = iconBgColor || withAlpha(colors.primary, 0.15);
  const defaultIconColor = iconColor || colors.primary;
  const isClickable = !!onPress && !showSwitch;
  const shouldShowChevron = !showSwitch && (showChevron ?? isClickable);

  // All hooks must be called before any early returns
  const rightElement = React.useMemo(
    () => (
      <SettingsItemCardRightElement
        showSwitch={showSwitch}
        switchValue={switchValue}
        onSwitchChange={onSwitchChange}
        disabled={disabled}
        shouldShowChevron={shouldShowChevron}
        rightIcon={rightIcon}
      />
    ),
    [showSwitch, switchValue, onSwitchChange, disabled, shouldShowChevron, rightIcon]
  );

  const content = React.useMemo(
    () => (
      <SettingsItemCardContent
        icon={icon}
        title={sanitizedTitle}
        description={sanitizedDescription}
        iconBgColor={defaultIconBg}
        iconColor={defaultIconColor}
        disabled={disabled}
        rightElement={rightElement}
      />
    ),
    [icon, sanitizedTitle, sanitizedDescription, defaultIconBg, defaultIconColor, disabled, rightElement]
  );

  const containerStyle = React.useMemo(
    () => [
      styles.sectionContainer,
      {
        backgroundColor: noBackground ? "transparent" : colors.surface,
        borderRadius: noBackground ? 0 : tokens.borders.radius.lg,
      },
      hideMargin && { marginBottom: 0 },
      propContainerStyle,
    ],
    [noBackground, colors.surface, tokens.borders.radius.lg, hideMargin, propContainerStyle]
  );

  // Validate after hooks (silent validation, no render)
  const titleWarning = validateTitle(title);
  const descWarning = validateDescription(description);
  const switchWarning = validateSwitchProps(showSwitch, onSwitchChange);

  if (titleWarning || descWarning || switchWarning) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <SettingsItemCardSection sectionTitle={sanitizedSectionTitle} />
      {isClickable ? (
        <Pressable
          style={({ pressed }) => [
            styles.itemContainer,
            {
              backgroundColor: pressed ? withAlpha(colors.primary, 0.08) : "transparent",
            },
          ]}
          onPress={onPress}
        >
          {content}
        </Pressable>
      ) : (
        <View style={styles.itemContainer}>
          {content}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 72,
  },
});
