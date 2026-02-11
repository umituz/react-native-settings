/**
 * AchievementItem Component
 * List item for achievements - all text via props
 */

import React from "react";
import { View } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, withAlpha } from "@umituz/react-native-design-system";
import type { AchievementItemProps } from "./types/AchievementItemProps";
import { achievementItemStyles as styles } from "./styles/achievementItemStyles";

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
              <AtomicText style={[styles.checkmarkText, { color: tokens.colors.background }]}>
                ✓
              </AtomicText>
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
