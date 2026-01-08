/**
 * LevelProgress Component
 * Displays level and progress - all text via props
 */

import React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface LevelProgressProps {
  level: number;
  points: number;
  levelTitle: string;
  pointsToNext: number;
  progress: number;
  showPoints?: boolean;
  // Customization
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  progressBarStyle?: ViewStyle;
  progressFillStyle?: ViewStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  // Colors (design system integration)
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
  primaryColor = "#FFD700",
  secondaryColor = "#2A2A2A",
  backgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={[styles.levelTitle, { color: textColor }, titleStyle]}>
            {levelTitle}
          </Text>
          {showPoints && (
            <Text style={[styles.subtitle, { color: subtextColor }, subtitleStyle]}>
              {points} / {points + pointsToNext}
            </Text>
          )}
        </View>

        <View style={[styles.badge, { backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}40` }, badgeStyle]}>
          <Text style={[styles.badgeText, { color: primaryColor }, badgeTextStyle]}>
            {level}
          </Text>
        </View>
      </View>

      <View style={[styles.progressBar, { backgroundColor: secondaryColor }, progressBarStyle]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(100, progress)}%`, backgroundColor: primaryColor },
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
