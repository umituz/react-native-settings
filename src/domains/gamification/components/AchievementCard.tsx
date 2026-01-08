/**
 * AchievementCard Component
 * Displays achievement - all text via props
 */

import React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress: number;
  // Customization
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  progressBarStyle?: ViewStyle;
  // Colors
  unlockedColor?: string;
  lockedColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  isUnlocked,
  progress,
  containerStyle,
  titleStyle,
  descriptionStyle,
  progressBarStyle,
  unlockedColor = "#4CAF50",
  lockedColor = "#666666",
  backgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
}) => {
  const accentColor = isUnlocked ? unlockedColor : lockedColor;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor: `${accentColor}40` },
        containerStyle,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
        {icon}
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: isUnlocked ? textColor : subtextColor },
            titleStyle,
          ]}
        >
          {title}
        </Text>
        <Text style={[styles.description, { color: subtextColor }, descriptionStyle]}>
          {description}
        </Text>

        {!isUnlocked && (
          <View style={[styles.progressBar, { backgroundColor: `${lockedColor}40` }, progressBarStyle]}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: accentColor },
              ]}
            />
          </View>
        )}
      </View>

      {isUnlocked && (
        <View style={[styles.checkmark, { backgroundColor: unlockedColor }]}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
