/**
 * StatsCard Component - Modern Design
 * Clean card-based stat display with large emoji icons
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, useResponsive, withAlpha } from "@umituz/react-native-design-system";

export interface StatsCardProps {
  value: number;
  label: string;
  icon?: React.ReactNode | string;
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
  textColor: _textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  const { getFontSize, getIconSize } = useResponsive();

  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const valueFontSize = getFontSize(48);
  const suffixFontSize = getFontSize(16);
  const labelFontSize = getFontSize(12);
  const iconSize = getIconSize(56);

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: finalBackgroundColor,
        borderRadius: tokens.borders.radius.xl,
        padding: tokens.spacing.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
      containerStyle
    ]}>
      {/* Emoji Icon in Circle */}
      {icon && (
        <View style={[
          styles.iconContainer,
          {
            width: iconSize,
            height: iconSize,
            backgroundColor: withAlpha(finalAccentColor, 0.15),
            borderRadius: iconSize / 2,
            marginBottom: tokens.spacing.md,
          }
        ]}>
          <AtomicText style={[
            styles.emoji,
            {
              fontSize: iconSize * 0.55,
            }
          ]}>
            {icon}
          </AtomicText>
        </View>
      )}

      {/* Large Value in Center */}
      <View style={styles.valueRow}>
        <AtomicText style={[
          styles.value,
          {
            color: finalAccentColor,
            fontSize: valueFontSize,
            lineHeight: valueFontSize + 8,
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

      {/* Small Label Below */}
      <AtomicText style={[
        styles.label,
        {
          color: finalSubtextColor,
          fontSize: labelFontSize,
          marginTop: tokens.spacing.xs,
        },
        labelStyle
      ]}>
        {label.toUpperCase()}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    textAlign: "center",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontWeight: "800",
    letterSpacing: -1,
    textAlign: "center",
  },
  suffix: {
    fontWeight: "600",
  },
  label: {
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
