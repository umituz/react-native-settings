/**
 * AchievementCard Component
 * Displays achievement - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha } from "@umituz/react-native-design-system";

export interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress: number;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  progressBarStyle?: ViewStyle;
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
  unlockedColor,
  lockedColor,
  backgroundColor,
  textColor,
  subtextColor,
}) => {
  const tokens = useAppDesignTokens();
  
  const finalUnlockedColor = unlockedColor || tokens.colors.success;
  const finalLockedColor = lockedColor || tokens.colors.textDisabled;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;
  
  const accentColor = isUnlocked ? finalUnlockedColor : finalLockedColor;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: finalBackgroundColor, borderColor: withAlpha(accentColor, 0.4) },
        containerStyle,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: withAlpha(accentColor, 0.2) }]}>
        {icon}
      </View>

      <View style={styles.content}>
        <AtomicText
          style={[
            styles.title,
            { color: isUnlocked ? finalTextColor : finalSubtextColor },
            titleStyle,
          ]}
        >
          {title}
        </AtomicText>
        <AtomicText style={[styles.description, { color: finalSubtextColor }, descriptionStyle]}>
          {description}
        </AtomicText>

        {!isUnlocked && (
          <View style={[styles.progressBar, { backgroundColor: withAlpha(finalLockedColor, 0.4) }, progressBarStyle]}>
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
        <View style={[styles.checkmark, { backgroundColor: finalUnlockedColor }]}>
          <AtomicText style={[styles.checkmarkText, { color: tokens.colors.onPrimary }]}>✓</AtomicText>
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
    fontSize: 14,
    fontWeight: "bold",
  },
});
