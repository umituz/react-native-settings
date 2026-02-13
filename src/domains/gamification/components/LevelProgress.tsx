/**
 * LevelProgress Component
 * Displays level and progress - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha, useResponsive } from "@umituz/react-native-design-system";

export interface LevelProgressProps {
  level: number;
  points: number;
  levelTitle: string;
  pointsToNext: number;
  progress: number;
  showPoints?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  progressBarStyle?: ViewStyle;
  progressFillStyle?: ViewStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  points,
  levelTitle,
  pointsToNext,
  progress,
  showPoints = true,
  containerStyle,
  titleStyle,
  subtitleStyle,
  progressBarStyle,
  progressFillStyle,
  badgeStyle,
  badgeTextStyle,
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  const { getFontSize, getIconSize } = useResponsive();

  const finalPrimaryColor = primaryColor || tokens.colors.primary;
  const finalSecondaryColor = secondaryColor || tokens.colors.surfaceSecondary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const titleFontSize = getFontSize(18);
  const subtitleFontSize = getFontSize(14);
  const badgeSize = getIconSize(52);
  const badgeFontSize = getFontSize(20);
  const progressBarHeight = getFontSize(10);

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
      <View style={[styles.header, { marginBottom: tokens.spacing.md }]}>
        <View style={styles.titleSection}>
          <AtomicText style={[
            styles.levelTitle,
            {
              color: finalTextColor,
              fontSize: titleFontSize,
            },
            titleStyle
          ]}>
            {levelTitle}
          </AtomicText>
          {showPoints && (
            <AtomicText style={[
              styles.subtitle,
              {
                color: finalSubtextColor,
                fontSize: subtitleFontSize,
                marginTop: tokens.spacing.xs,
              },
              subtitleStyle
            ]}>
              {points} / {points + pointsToNext}
            </AtomicText>
          )}
        </View>

        <View style={[
          styles.badge,
          {
            backgroundColor: withAlpha(finalPrimaryColor, 0.2),
            borderColor: withAlpha(finalPrimaryColor, 0.4),
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            borderWidth: 2,
          },
          badgeStyle
        ]}>
          <AtomicText style={[
            styles.badgeText,
            {
              color: finalPrimaryColor,
              fontSize: badgeFontSize,
            },
            badgeTextStyle
          ]}>
            {level}
          </AtomicText>
        </View>
      </View>

      <View style={[
        styles.progressBar,
        {
          backgroundColor: finalSecondaryColor,
          height: progressBarHeight,
          borderRadius: tokens.borders.radius.sm,
        },
        progressBarStyle
      ]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(100, progress)}%`,
              backgroundColor: finalPrimaryColor,
              borderRadius: tokens.borders.radius.sm,
            },
            progressFillStyle,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSection: {
    flex: 1,
  },
  levelTitle: {
    fontWeight: "700",
  },
  subtitle: {},
  badge: {
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontWeight: "bold",
  },
  progressBar: {
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
});
