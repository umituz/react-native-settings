/**
 * StreakDisplay Component
 * Displays streak information - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, withAlpha, useResponsive } from "@umituz/react-native-design-system";

export interface StreakDisplayProps {
  current: number;
  longest: number;
  currentLabel: string;
  bestLabel: string;
  daysLabel: string;
  icon?: React.ReactNode | string;
  containerStyle?: ViewStyle;
  numberStyle?: TextStyle;
  labelStyle?: TextStyle;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  current,
  longest,
  currentLabel,
  bestLabel,
  daysLabel,
  icon,
  containerStyle,
  numberStyle,
  labelStyle,
  primaryColor,
  backgroundColor,
  textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  const { getFontSize, iconContainerSize } = useResponsive();

  const finalPrimaryColor = primaryColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const renderedIcon = typeof icon === 'string' ? (
    <AtomicIcon name={icon} size="lg" customColor={finalPrimaryColor} />
  ) : icon || <AtomicIcon name="trending-up" size="lg" customColor={finalPrimaryColor} />;

  const numberFontSize = getFontSize(36);
  const labelFontSize = getFontSize(11);
  const currentLabelFontSize = getFontSize(15);
  const bestNumberFontSize = getFontSize(24);
  const bestLabelFontSize = getFontSize(10);

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
      <View style={styles.mainStreak}>
        <View style={[styles.iconContainer, { width: iconContainerSize, height: iconContainerSize }]}>
          {renderedIcon}
        </View>
        <View style={[styles.streakInfo, { minWidth: iconContainerSize + 12 }]}>
          <AtomicText style={[
            styles.number,
            {
              color: finalPrimaryColor,
              fontSize: numberFontSize,
              lineHeight: numberFontSize + 4,
              minHeight: numberFontSize + 4,
            },
            numberStyle
          ]}>
            {current}
          </AtomicText>
          <AtomicText style={[
            styles.label,
            {
              color: finalSubtextColor,
              fontSize: labelFontSize,
              marginTop: tokens.spacing.xs,
            },
            labelStyle
          ]}>
            {daysLabel}
          </AtomicText>
        </View>
        <AtomicText style={[
          styles.currentLabel,
          {
            color: finalTextColor,
            fontSize: currentLabelFontSize,
          }
        ]}>
          {currentLabel}
        </AtomicText>
      </View>

      <View style={[
        styles.bestStreak,
        {
          backgroundColor: withAlpha(finalPrimaryColor, 0.2),
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.borders.radius.md,
          minWidth: 80,
        }
      ]}>
        <AtomicText style={[
          styles.bestLabel,
          {
            color: finalSubtextColor,
            fontSize: bestLabelFontSize,
          }
        ]}>
          {bestLabel}
        </AtomicText>
        <AtomicText style={[
          styles.bestNumber,
          {
            color: finalPrimaryColor,
            fontSize: bestNumberFontSize,
            lineHeight: bestNumberFontSize + 4,
            minHeight: bestNumberFontSize + 4,
            marginTop: tokens.spacing.xs,
          }
        ]}>
          {longest}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainStreak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  streakInfo: {
    alignItems: "center",
  },
  number: {
    fontWeight: "bold",
  },
  label: {
    textTransform: "uppercase",
  },
  currentLabel: {
    fontWeight: "600",
  },
  bestStreak: {
    alignItems: "center",
  },
  bestLabel: {
    textTransform: "uppercase",
    fontWeight: "600",
  },
  bestNumber: {
    fontWeight: "bold",
  },
});
