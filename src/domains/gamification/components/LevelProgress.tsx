/**
 * LevelProgress Component
 * Displays level and progress - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha } from "@umituz/react-native-design-system";

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
  
  const finalPrimaryColor = primaryColor || tokens.colors.primary;
  const finalSecondaryColor = secondaryColor || tokens.colors.surfaceSecondary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: finalBackgroundColor }, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <AtomicText style={[styles.levelTitle, { color: finalTextColor }, titleStyle]}>
            {levelTitle}
          </AtomicText>
          {showPoints && (
            <AtomicText style={[styles.subtitle, { color: finalSubtextColor }, subtitleStyle]}>
              {points} / {points + pointsToNext}
            </AtomicText>
          )}
        </View>

        <View style={[styles.badge, { backgroundColor: withAlpha(finalPrimaryColor, 0.2), borderColor: withAlpha(finalPrimaryColor, 0.4) }, badgeStyle]}>
          <AtomicText style={[styles.badgeText, { color: finalPrimaryColor }, badgeTextStyle]}>
            {level}
          </AtomicText>
        </View>
      </View>

      <View style={[styles.progressBar, { backgroundColor: finalSecondaryColor }, progressBarStyle]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(100, progress)}%`, backgroundColor: finalPrimaryColor },
            progressFillStyle,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  badgeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});
