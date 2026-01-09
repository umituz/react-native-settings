/**
 * AchievementToast Component
 * Shows achievement unlock notification - all text via props
 */

import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha } from "@umituz/react-native-design-system";

export interface AchievementToastProps {
  visible: boolean;
  title: string;
  label: string;
  icon: React.ReactNode;
  onDismiss: () => void;
  duration?: number;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  titleStyle?: TextStyle;
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
  backgroundColor,
  textColor,
  labelColor,
}) => {
  const tokens = useAppDesignTokens();
  const translateY = useRef(new Animated.Value(-100)).current;

  const finalBackgroundColor = backgroundColor || tokens.colors.primary;
  const finalTextColor = textColor || tokens.colors.onPrimary;
  const finalLabelColor = labelColor || withAlpha(finalTextColor, 0.5);

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
      <View style={[styles.toast, { backgroundColor: finalBackgroundColor }]}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.content}>
          <AtomicText style={[styles.label, { color: finalLabelColor }, labelStyle]}>
            {label}
          </AtomicText>
          <AtomicText style={[styles.title, { color: finalTextColor }, titleStyle]}>
            {title}
          </AtomicText>
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
