/**
 * StreakDisplay Component - Modern Design
 * Clean card-based design with gradient fire icon
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha, useResponsive } from "@umituz/react-native-design-system";

export interface StreakDisplayProps {
  current: number;
  longest: number;
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
  bestLabel,
  daysLabel,
  containerStyle,
  numberStyle,
  labelStyle,
  primaryColor,
  backgroundColor,
  textColor: _textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  const { getFontSize, getIconSize } = useResponsive();

  const finalPrimaryColor = primaryColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const streakNumberSize = getFontSize(48);
  const streakLabelSize = getFontSize(13);
  const bestNumberSize = getFontSize(20);
  const bestLabelSize = getFontSize(11);
  const iconSize = getIconSize(48);

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
      {/* Main Streak Section */}
      <View style={styles.mainSection}>
        {/* Fire Icon */}
        <View style={[
          styles.fireIcon,
          {
            width: iconSize,
            height: iconSize,
            backgroundColor: withAlpha(finalPrimaryColor, 0.15),
            borderRadius: iconSize / 2,
          }
        ]}>
          <AtomicText style={[
            styles.fireEmoji,
            { fontSize: iconSize * 0.6 }
          ]}>
            🔥
          </AtomicText>
        </View>

        <View style={styles.streakNumbers}>
          <View style={styles.currentStreak}>
            <AtomicText style={[
              styles.streakNumber,
              {
                color: finalPrimaryColor,
                fontSize: streakNumberSize,
                lineHeight: streakNumberSize + 8,
              },
              numberStyle
            ]}>
              {current}
            </AtomicText>
            <AtomicText style={[
              styles.streakLabel,
              {
                color: finalSubtextColor,
                fontSize: streakLabelSize,
                marginTop: tokens.spacing.xs,
              },
              labelStyle
            ]}>
              {daysLabel.toUpperCase()}
            </AtomicText>
          </View>
        </View>
      </View>

      {/* Best Streak Badge */}
      <View style={[
        styles.bestBadge,
        {
          backgroundColor: withAlpha(finalPrimaryColor, 0.12),
          borderRadius: tokens.borders.radius.lg,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
        }
      ]}>
        <AtomicText style={[
          styles.bestLabel,
          {
            color: finalSubtextColor,
            fontSize: bestLabelSize,
          }
        ]}>
          {bestLabel.toUpperCase()}
        </AtomicText>
        <AtomicText style={[
          styles.bestNumber,
          {
            color: finalPrimaryColor,
            fontSize: bestNumberSize,
            marginTop: tokens.spacing.xs / 2,
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
  mainSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  fireIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  fireEmoji: {
    textAlign: "center",
  },
  streakNumbers: {
    flex: 1,
  },
  currentStreak: {
    alignItems: "flex-start",
  },
  streakNumber: {
    fontWeight: "800",
    letterSpacing: -1,
  },
  streakLabel: {
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  bestBadge: {
    alignItems: "center",
    minWidth: 70,
  },
  bestLabel: {
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bestNumber: {
    fontWeight: "800",
  },
});
