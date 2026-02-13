/**
 * AchievementCard Component
 * Displays achievement - all text via props
 */

import React from "react";
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useAppDesignTokens, AtomicText, withAlpha, useResponsive } from "@umituz/react-native-design-system";

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
  const { getFontSize, getIconSize } = useResponsive();

  const finalUnlockedColor = unlockedColor || tokens.colors.success;
  const finalLockedColor = lockedColor || tokens.colors.textDisabled;
  const finalBackgroundColor = backgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const accentColor = isUnlocked ? finalUnlockedColor : finalLockedColor;
  const titleFontSize = getFontSize(16);
  const descriptionFontSize = getFontSize(13);
  const checkmarkFontSize = getFontSize(14);
  const iconSize = getIconSize(48);
  const checkmarkSize = getIconSize(24);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: finalBackgroundColor,
          borderColor: withAlpha(accentColor, 0.4),
          padding: tokens.spacing.md,
          borderRadius: tokens.borders.radius.md,
          gap: tokens.spacing.md,
        },
        containerStyle,
      ]}
    >
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: withAlpha(accentColor, 0.2),
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize / 2,
        }
      ]}>
        {icon}
      </View>

      <View style={styles.content}>
        <AtomicText
          style={[
            styles.title,
            {
              color: isUnlocked ? finalTextColor : finalSubtextColor,
              fontSize: titleFontSize,
            },
            titleStyle,
          ]}
        >
          {title}
        </AtomicText>
        <AtomicText style={[
          styles.description,
          {
            color: finalSubtextColor,
            fontSize: descriptionFontSize,
            marginTop: tokens.spacing.xs,
          },
          descriptionStyle
        ]}>
          {description}
        </AtomicText>

        {!isUnlocked && (
          <View style={[
            styles.progressBar,
            {
              backgroundColor: withAlpha(finalLockedColor, 0.4),
              marginTop: tokens.spacing.sm,
              borderRadius: tokens.borders.radius.xs,
            },
            progressBarStyle
          ]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                  backgroundColor: accentColor,
                  borderRadius: tokens.borders.radius.xs,
                },
              ]}
            />
          </View>
        )}
      </View>

      {isUnlocked && (
        <View style={[
          styles.checkmark,
          {
            backgroundColor: finalUnlockedColor,
            width: checkmarkSize,
            height: checkmarkSize,
            borderRadius: checkmarkSize / 2,
          }
        ]}>
          <AtomicText style={[
            styles.checkmarkText,
            {
              color: tokens.colors.onPrimary,
              fontSize: checkmarkFontSize,
            }
          ]}>
            ✓
          </AtomicText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
  },
  description: {},
  progressBar: {
    height: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  checkmark: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontWeight: "bold",
  },
});
