/**
 * Color Picker Component
 *
 * Simple color picker for theme customization
 * Single Responsibility: Render color selection UI
 */

import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface ColorPickerProps {
  label: string;
  value: string;
  onValueChange: (color: string) => void;
  colors: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onValueChange,
  colors,
}) => {
  const tokens = useAppDesignTokens();

  // Memoize styles to prevent unnecessary re-creation
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  // Memoize colors array to prevent unnecessary re-renders
  const colorsMemo = useMemo(() => colors, [colors]);

  // Stable callback for color change to prevent infinite re-renders
  const handleColorChange = useCallback((color: string) => {
    try {
      // Prevent unnecessary updates if color hasn't changed
      if (value === color) return;
      onValueChange(color);
    } catch (error) {
      // Log error for debugging while preventing UI crashes
      console.error('Failed to change color:', error);
      // Optionally: Show user feedback about the error
    }
  }, [value, onValueChange]);

  // Memoize color options to prevent unnecessary re-renders
  const colorOptions = useMemo(() => {
    return colorsMemo.map((color) => {
      const isSelected = value === color;

      return (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            isSelected && styles.selectedColor,
          ]}
          onPress={() => handleColorChange(color)}
          activeOpacity={0.8} // Performance optimization
          accessibilityLabel={`Color ${color} ${isSelected ? 'selected' : 'not selected'}`}
          accessibilityRole={isSelected ? 'button' : 'button'}
          accessibilityState={{ selected: isSelected }}
          accessibilityHint={`Select ${color} color`}
        >
          {isSelected && (
            <AtomicIcon name="checkmark" size="sm" customColor={tokens.colors.textInverse} />
          )}
        </TouchableOpacity>
      );
    });
  }, [colorsMemo, value, handleColorChange, styles, tokens.colors.textInverse]);

  return (
    <View style={styles.container}>
      <AtomicText type="bodyMedium" color="primary" style={styles.label}>
        {label}
      </AtomicText>
      <View style={styles.colorRow}>
        {colorOptions}
      </View>
    </View>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 8,
    },
    colorRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: tokens.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedColor: {
      borderColor: tokens.colors.primary,
      borderWidth: 3,
    },
  });
