/**
 * AchievementToast Component
 * Shows achievement unlock notification - all text via props
 */

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, type ViewStyle, type TextStyle } from "react-native";

export interface AchievementToastProps {
  visible: boolean;
  title: string;
  label: string; // e.g., "Achievement Unlocked!" - from app translations
  icon: React.ReactNode;
  onDismiss: () => void;
  duration?: number;
  // Customization
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  titleStyle?: TextStyle;
  // Colors
  backgroundColor?: string;
  textColor?: string;
  labelColor?: string;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  visible,
  title,
  label,
  icon,
  onDismiss,
  duration = 3000,
  containerStyle,
  labelStyle,
  titleStyle,
  backgroundColor = "#FFD700",
  textColor = "#000000",
  labelColor = "#00000080",
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    }
  }, [visible, duration, onDismiss, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
        containerStyle,
      ]}
    >
      <View style={[styles.toast, { backgroundColor }]}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.content}>
          <Text style={[styles.label, { color: labelColor }, labelStyle]}>
            {label}
          </Text>
          <Text style={[styles.title, { color: textColor }, titleStyle]}>
            {title}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
});
