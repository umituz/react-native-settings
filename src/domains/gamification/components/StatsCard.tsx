/**
 * StatsCard Component
 * Displays a stat with icon - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, withAlpha } from "@umituz/react-native-design-system";

export interface StatsCardProps {
  value: number;
  label: string;
  icon: React.ReactNode | string;
  suffix?: string;
  containerStyle?: ViewStyle;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  icon,
  suffix,
  containerStyle,
  valueStyle,
  labelStyle,
  accentColor,
  backgroundColor,
  textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  
  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const renderedIcon = typeof icon === 'string' ? (
    <AtomicIcon name={icon} size="sm" customColor={finalAccentColor} />
  ) : icon;

  return (
    <View style={[styles.container, { backgroundColor: finalBackgroundColor }, containerStyle]}>
      <View style={[styles.iconContainer, { backgroundColor: withAlpha(finalAccentColor, 0.15) }]}>
        {renderedIcon}
      </View>
      <View style={styles.valueRow}>
        <AtomicText style={[styles.value, { color: finalTextColor }, valueStyle]}>
          {value}
        </AtomicText>
        {suffix && (
          <AtomicText style={[styles.suffix, { color: finalSubtextColor }]}>{suffix}</AtomicText>
        )}
      </View>
      <AtomicText style={[styles.label, { color: finalSubtextColor }, labelStyle]}>
        {label}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "45%",
    borderRadius: 12,
    padding: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  suffix: {
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
