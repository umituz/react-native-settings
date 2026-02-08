import React from "react";
/**
 * GamificationScreen Component
 * Full gamification screen with integrated hook
 * Generic for 100+ apps - NO hardcoded strings
 */

import { View, ScrollView } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";
import { LevelProgress } from "../LevelProgress";
import { StreakDisplay } from "../StreakDisplay";
import { Header } from "./Header";
import { StatsGrid } from "./StatsGrid";
import { AchievementsList } from "./AchievementsList";
import { styles } from "./styles";
import type { GamificationScreenProps, GamificationConfigProps } from "./types";
import type { Achievement } from "../../types";

export type { GamificationScreenProps };

/**
 * GamificationScreen that accepts either detailed props OR a config object
 * When config is provided, a hook consumer component is used
 */
export const GamificationScreen: React.FC<GamificationScreenProps | GamificationConfigProps> = (props) => {
  // If config is provided, use the hook-based component
  if ('config' in props && props.config) {
    return <GamificationScreenWithConfig config={props.config} />;
  }

  // Otherwise, render directly with provided props
  return <GamificationScreenInner {...(props as GamificationScreenProps)} />;
};

/**
 * Component that uses the hook - separated to satisfy React Hooks rules
 */
const GamificationScreenWithConfig: React.FC<GamificationConfigProps> = ({ config }) => {
  // Import hook here to avoid conditional hook usage
  const { useGamification } = require("../../hooks/useGamification");

  const {
    points,
    level,
    streak,
    achievements,
  } = useGamification(config);

  // Transform store achievements to UI props
  const achievementItems = achievements.map((a: Achievement) => ({
    ...a,
    title: a.title,
    description: a.description,
    icon: a.icon,
    isUnlocked: a.isUnlocked,
    progress: a.progress,
    threshold: a.threshold,
    id: a.id,
    type: a.type
  }));

  const screenProps: GamificationScreenProps = {
    title: config.translations.title,
    statsTitle: config.translations.statsTitle,
    achievementsTitle: config.translations.achievementsTitle,
    streakTitle: config.translations.streakTitle,
    levelProps: {
      level: level.currentLevel,
      points: level.currentPoints,
      pointsToNext: level.pointsToNext,
      progress: level.progress,
      levelTitle: config.translations.levelTitle,
      showPoints: true,
    },
    streakProps: {
      current: streak.current,
      longest: streak.longest,
      currentLabel: config.translations.currentStreak,
      bestLabel: config.translations.bestStreak,
      daysLabel: config.translations.days,
    },
    stats: [
      {
        label: config.translations.statsTitle,
        value: points,
        icon: "star",
      },
    ],
    achievements: achievementItems,
    emptyAchievementsText: config.translations.emptyAchievements,
  };

  return <GamificationScreenInner {...screenProps} />;
};

/**
 * Internal component that renders the screen with all props
 */
const GamificationScreenInner: React.FC<GamificationScreenProps> = ({
  title,
  statsTitle,
  achievementsTitle,
  streakTitle,
  levelProps,
  stats,
  achievements,
  streakProps,
  emptyAchievementsText,
  containerStyle,
  headerStyle,
  titleStyle,
  sectionTitleStyle,
  accentColor,
  backgroundColor,
  cardBackgroundColor,
  textColor,
  subtextColor,
  headerComponent,
}) => {
  const tokens = useAppDesignTokens();
  
  // Use tokens for fallbacks
  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalBackgroundColor = backgroundColor || tokens.colors.backgroundPrimary;
  const finalCardBackgroundColor = cardBackgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: finalBackgroundColor }, containerStyle]}>
      {headerComponent}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header
          title={title}
          headerStyle={headerStyle}
          titleStyle={titleStyle}
          textColor={finalTextColor}
        />

        {/* Level Progress */}
        <View style={styles.section}>
          <LevelProgress
            {...levelProps}
            primaryColor={finalAccentColor}
            backgroundColor={finalCardBackgroundColor}
            textColor={finalTextColor}
            subtextColor={finalSubtextColor}
          />
        </View>

        {/* Streak (if provided) */}
        {streakProps && (
          <View style={styles.section}>
            <AtomicText
              style={[styles.sectionTitle, { color: finalTextColor }, sectionTitleStyle]}
            >
              {streakTitle}
            </AtomicText>
            <StreakDisplay
              {...streakProps}
              primaryColor={finalAccentColor}
              backgroundColor={finalCardBackgroundColor}
              textColor={finalTextColor}
              subtextColor={finalSubtextColor}
            />
          </View>
        )}

        {/* Stats Grid */}
        <StatsGrid
          statsTitle={statsTitle}
          stats={stats}
          accentColor={finalAccentColor}
          cardBackgroundColor={finalCardBackgroundColor}
          textColor={finalTextColor}
          subtextColor={finalSubtextColor}
          sectionTitleStyle={sectionTitleStyle}
        />

        {/* Achievements */}
        <AchievementsList
          achievementsTitle={achievementsTitle}
          achievements={achievements}
          emptyAchievementsText={emptyAchievementsText}
          accentColor={finalAccentColor}
          cardBackgroundColor={finalCardBackgroundColor}
          textColor={finalTextColor}
          subtextColor={finalSubtextColor}
          sectionTitleStyle={sectionTitleStyle}
        />
      </ScrollView>
    </View>
  );
};
