/**
 * PointsBadge Component
 * Displays points with optional icon - all text via props
 */

import React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface PointsBadgeProps {
  points: number;
  icon?: React.ReactNode;
  // Customization
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  // Colors
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({
  points,
  icon,
  containerStyle,
  textStyle,
  backgroundColor = "#FFD70020",
  textColor = "#FFD700",
  borderColor = "#FFD70040",
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor },
        containerStyle,
      ]}
    >
      {icon}
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {points}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
