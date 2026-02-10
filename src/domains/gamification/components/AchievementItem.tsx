/**
 * AchievementItem Component
 * List item for achievements - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, withAlpha } from "@umituz/react-native-design-system";

export interface AchievementItemProps {
  title: string;
  description: string;
  icon: React.ReactNode | string;
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
  accentColor,
  backgroundColor,
  textColor,
  subtextColor,
  lockedOpacity,
}) => {
  const tokens = useAppDesignTokens();
  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;
  const finalLockedOpacity = lockedOpacity !== undefined ? lockedOpacity : 0.5;

  const renderedIcon = typeof icon === 'string' ? (
    <AtomicIcon name={icon} size="md" customColor={finalAccentColor} />
  ) : icon;

  const progressPercent = Math.min((progress / threshold) * 100, 100);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: finalBackgroundColor, opacity: isUnlocked ? 1 : finalLockedOpacity },
        containerStyle,
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: withAlpha(finalAccentColor, 0.2) }]}
      >
        {renderedIcon}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <AtomicText style={[styles.title, { color: finalTextColor }, titleStyle]}>
            {title}
          </AtomicText>
          {isUnlocked && (
            <View style={[styles.checkmark, { backgroundColor: finalAccentColor }]}>
              <AtomicText style={styles.checkmarkText}>✓</AtomicText>
            </View>
          )}
        </View>

        <AtomicText
          style={[styles.description, { color: finalSubtextColor }, descriptionStyle]}
          numberOfLines={2}
        >
          {description}
        </AtomicText>

        {!isUnlocked && (
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { backgroundColor: withAlpha(finalAccentColor, 0.3) }]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: finalAccentColor,
                    width: `${progressPercent}%`,
                  },
                ]}
              />
            </View>
            {progressLabel && (
              <AtomicText style={[styles.progressText, { color: finalSubtextColor }]}>
                {progressLabel}
              </AtomicText>
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
