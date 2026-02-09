import React from "react";
import { View } from "react-native";
import { useAppDesignTokens, AtomicIcon, AtomicText, type IconName } from "@umituz/react-native-design-system";

export interface SettingsItemCardContentProps {
  icon: IconName;
  title: string;
  description?: string;
  iconBgColor: string;
  iconColor: string;
  disabled?: boolean;
  rightElement: React.ReactElement;
}

export const SettingsItemCardContent: React.FC<SettingsItemCardContentProps> = React.memo(({
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
  disabled,
  rightElement,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.content}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor, borderRadius: tokens.borders.radius.md }]}>
        <AtomicIcon name={icon} size="lg" customColor={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <AtomicText
          type="bodyLarge"
          color={disabled ? "onSurfaceVariant" : "onSurface"}
          numberOfLines={1}
          style={{ marginBottom: description ? tokens.spacing.xs : 0, opacity: disabled ? 0.6 : 1 }}
        >
          {title}
        </AtomicText>
        {!!description && (
          <AtomicText type="bodyMedium" color="textSecondary" numberOfLines={2}>
            {description}
          </AtomicText>
        )}
      </View>
      {rightElement}
    </View>
  );
});

SettingsItemCardContent.displayName = "SettingsItemCardContent";

const styles = {
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
} as const;
