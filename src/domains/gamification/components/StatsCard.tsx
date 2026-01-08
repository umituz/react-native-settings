/**
 * StatsCard Component
 * Displays a stat with icon - all text via props
 */

import React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface StatsCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  // Customization
  containerStyle?: ViewStyle;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
  // Colors
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
  accentColor = "#FFD700",
  backgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}15` }]}>
        {icon}
      </View>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: textColor }, valueStyle]}>
          {value}
        </Text>
        {suffix && (
          <Text style={[styles.suffix, { color: subtextColor }]}>{suffix}</Text>
        )}
      </View>
      <Text style={[styles.label, { color: subtextColor }, labelStyle]}>
        {label}
      </Text>
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
