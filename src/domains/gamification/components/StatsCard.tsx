/**
 * StatsCard Component
 * Displays a stat with icon - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, withAlpha, useResponsive } from "@umituz/react-native-design-system";

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
  const { getFontSize, getIconSize } = useResponsive();

  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const renderedIcon = typeof icon === 'string' ? (
    <AtomicIcon name={icon} size="md" customColor={finalAccentColor} />
  ) : icon;

  const valueFontSize = getFontSize(32);
  const suffixFontSize = getFontSize(14);
  const labelFontSize = getFontSize(13);
  const iconSize = getIconSize(44);

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: finalBackgroundColor,
        borderRadius: tokens.borders.radius.lg,
        padding: tokens.spacing.lg,
      },
      containerStyle
    ]}>
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: withAlpha(finalAccentColor, 0.15),
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize / 2,
          marginBottom: tokens.spacing.md,
        }
      ]}>
        {renderedIcon}
      </View>
      <View style={[styles.valueRow, { minHeight: valueFontSize + 4 }]}>
        <AtomicText style={[
          styles.value,
          {
            color: finalTextColor,
            fontSize: valueFontSize,
            lineHeight: valueFontSize + 4,
          },
          valueStyle
        ]}>
          {value}
        </AtomicText>
        {suffix && (
          <AtomicText style={[
            styles.suffix,
            {
              color: finalSubtextColor,
              fontSize: suffixFontSize,
            }
          ]}>
            {suffix}
          </AtomicText>
        )}
      </View>
      <AtomicText style={[
        styles.label,
        {
          color: finalSubtextColor,
          fontSize: labelFontSize,
          marginTop: tokens.spacing.xs,
        },
        labelStyle
      ]}>
        {label}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "45%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontWeight: "bold",
  },
  suffix: {
    fontWeight: "500",
  },
  label: {
    fontWeight: "500",
  },
});
