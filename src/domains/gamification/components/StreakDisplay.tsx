/**
 * StreakDisplay Component
 * Displays streak information - all text via props
 */

import React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface StreakDisplayProps {
  current: number;
  longest: number;
  currentLabel: string; // e.g., "Current Streak"
  bestLabel: string; // e.g., "Best"
  daysLabel: string; // e.g., "days"
  icon?: React.ReactNode;
  // Customization
  containerStyle?: ViewStyle;
  numberStyle?: TextStyle;
  labelStyle?: TextStyle;
  // Colors
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
  primaryColor = "#FF6B35",
  backgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <View style={styles.mainStreak}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.streakInfo}>
          <Text style={[styles.number, { color: primaryColor }, numberStyle]}>
            {current}
          </Text>
          <Text style={[styles.label, { color: subtextColor }, labelStyle]}>
            {daysLabel}
          </Text>
        </View>
        <Text style={[styles.currentLabel, { color: textColor }]}>
          {currentLabel}
        </Text>
      </View>

      <View style={[styles.bestStreak, { backgroundColor: `${primaryColor}20` }]}>
        <Text style={[styles.bestLabel, { color: subtextColor }]}>
          {bestLabel}
        </Text>
        <Text style={[styles.bestNumber, { color: primaryColor }]}>
          {longest}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainStreak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  streakInfo: {
    alignItems: "center",
  },
  number: {
    fontSize: 32,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  currentLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  bestStreak: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  bestLabel: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  bestNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
