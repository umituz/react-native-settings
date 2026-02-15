/**
 * GamificationScreen AchievementsList Component
 */

import React, { useMemo } from "react";
import { View, type TextStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { AchievementItem } from "../AchievementItem";
import { styles } from "./styles";
import type { AchievementItemProps } from "../types/AchievementItemProps";

export interface AchievementsListProps {
  achievementsTitle: string;
  achievements: Array<
    Omit<
      AchievementItemProps,
      | "accentColor"
      | "backgroundColor"
      | "textColor"
      | "subtextColor"
      | "lockedOpacity"
    >
  >;
  emptyAchievementsText?: string;
  accentColor: string;
  cardBackgroundColor: string;
  textColor: string;
  subtextColor: string;
  sectionTitleStyle?: TextStyle;
}

export const AchievementsList: React.FC<AchievementsListProps> = ({
  achievementsTitle,
  achievements,
  emptyAchievementsText,
  accentColor,
  cardBackgroundColor,
  textColor,
  subtextColor,
  sectionTitleStyle,
}) => {
  // Optimize: Single pass through achievements array instead of two filter operations
  const { unlocked, locked } = useMemo(() => {
    return achievements.reduce<{ unlocked: typeof achievements; locked: typeof achievements }>(
      (acc, achievement) => {
        if (achievement.isUnlocked) {
          acc.unlocked.push(achievement);
        } else {
          acc.locked.push(achievement);
        }
        return acc;
      },
      { unlocked: [], locked: [] }
    );
  }, [achievements]);

  return (
    <View style={styles.section}>
      <AtomicText style={[styles.sectionTitle, { color: textColor }, sectionTitleStyle]}>
        {achievementsTitle}
      </AtomicText>

      {achievements.length === 0 && emptyAchievementsText ? (
        <AtomicText style={[styles.emptyText, { color: subtextColor }]}>
          {emptyAchievementsText}
        </AtomicText>
      ) : (
        <>
          {/* Unlocked achievements first */}
          {unlocked.map((achievement) => (
            <AchievementItem
              key={`achievement-unlocked-${achievement.id || achievement.title}`}
              {...achievement}
              accentColor={accentColor}
              backgroundColor={cardBackgroundColor}
              textColor={textColor}
              subtextColor={subtextColor}
            />
          ))}

          {/* Locked achievements */}
          {locked.map((achievement) => (
            <AchievementItem
              key={`achievement-locked-${achievement.id || achievement.title}`}
              {...achievement}
              accentColor={accentColor}
              backgroundColor={cardBackgroundColor}
              textColor={textColor}
              subtextColor={subtextColor}
              lockedOpacity={0.6}
            />
          ))}
        </>
      )}
    </View>
  );
};
