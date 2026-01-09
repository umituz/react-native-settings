/**
 * GamificationScreen AchievementsList Component
 */

import React from "react";
import { View, type TextStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { AchievementItem } from "../AchievementItem";
import { styles } from "./styles";
import type { AchievementItemProps } from "../AchievementItem";

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
  const unlockedAchievements = achievements.filter((a) => a.isUnlocked);
  const lockedAchievements = achievements.filter((a) => !a.isUnlocked);

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
          {unlockedAchievements.map((achievement, index) => (
            <AchievementItem
              key={`unlocked-${index}`}
              {...achievement}
              accentColor={accentColor}
              backgroundColor={cardBackgroundColor}
              textColor={textColor}
              subtextColor={subtextColor}
            />
          ))}

          {/* Locked achievements */}
          {lockedAchievements.map((achievement, index) => (
            <AchievementItem
              key={`locked-${index}`}
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
