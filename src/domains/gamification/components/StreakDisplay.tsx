/**
 * StreakDisplay Component
 * Displays streak information - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha } from "@umituz/react-native-design-system";

export interface StreakDisplayProps {
  current: number;
  longest: number;
  currentLabel: string;
  bestLabel: string;
  daysLabel: string;
  icon?: React.ReactNode;
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
  
  const finalPrimaryColor = primaryColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: finalBackgroundColor }, containerStyle]}>
      <View style={styles.mainStreak}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.streakInfo}>
          <AtomicText style={[styles.number, { color: finalPrimaryColor }, numberStyle]}>
            {current}
          </AtomicText>
          <AtomicText style={[styles.label, { color: finalSubtextColor }, labelStyle]}>
            {daysLabel}
          </AtomicText>
        </View>
        <AtomicText style={[styles.currentLabel, { color: finalTextColor }]}>
          {currentLabel}
        </AtomicText>
      </View>

      <View style={[styles.bestStreak, { backgroundColor: withAlpha(finalPrimaryColor, 0.2) }]}>
        <AtomicText style={[styles.bestLabel, { color: finalSubtextColor }]}>
          {bestLabel}
        </AtomicText>
        <AtomicText style={[styles.bestNumber, { color: finalPrimaryColor }]}>
          {longest}
        </AtomicText>
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
