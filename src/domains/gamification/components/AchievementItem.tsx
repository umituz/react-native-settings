/**
 * AchievementItem Component
 * List item for achievements - all text via props
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from "react-native";

export interface AchievementItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress: number;
  threshold: number;
  progressLabel?: string;
  // Customization
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  // Colors
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  subtextColor?: string;
  lockedOpacity?: number;
}

export const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  description,
  icon,
  isUnlocked,
  progress,
  threshold,
  progressLabel,
  containerStyle,
  titleStyle,
  descriptionStyle,
  accentColor = "#FFD700",
  backgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
  lockedOpacity = 0.5,
}) => {
  const progressPercent = Math.min((progress / threshold) * 100, 100);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, opacity: isUnlocked ? 1 : lockedOpacity },
        containerStyle,
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}
      >
        {icon}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }, titleStyle]}>
            {title}
          </Text>
          {isUnlocked && (
            <View style={[styles.checkmark, { backgroundColor: accentColor }]}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.description, { color: subtextColor }, descriptionStyle]}
          numberOfLines={2}
        >
          {description}
        </Text>

        {!isUnlocked && (
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { backgroundColor: `${accentColor}30` }]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: accentColor,
                    width: `${progressPercent}%`,
                  },
                ]}
              />
            </View>
            {progressLabel && (
              <Text style={[styles.progressText, { color: subtextColor }]}>
                {progressLabel}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  checkmarkText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  progressContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    minWidth: 40,
    textAlign: "right",
  },
});
