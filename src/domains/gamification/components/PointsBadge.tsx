/**
 * PointsBadge Component
 * Displays points with optional icon - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha } from "@umituz/react-native-design-system";

export interface PointsBadgeProps {
  points: number;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({
  points,
  icon,
  containerStyle,
  textStyle,
  backgroundColor,
  textColor,
  borderColor,
}) => {
  const tokens = useAppDesignTokens();
  const finalTextColor = textColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || withAlpha(finalTextColor, 0.1);
  const finalBorderColor = borderColor || withAlpha(finalTextColor, 0.2);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: finalBackgroundColor, borderColor: finalBorderColor },
        containerStyle,
      ]}
    >
      {icon}
      <AtomicText style={[styles.text, { color: finalTextColor }, textStyle]}>
        {points}
      </AtomicText>
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
