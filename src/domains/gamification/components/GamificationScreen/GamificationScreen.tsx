/**
 * GamificationScreen - Pure Presentational Component
 * Renders the gamification dashboard with all data provided as props
 * Under 200 lines - only presentation logic
 */

import React from "react";
import { View } from "react-native";
import { useAppDesignTokens, AtomicText, ScreenLayout, NavigationHeader, useAppNavigation } from "@umituz/react-native-design-system";
import { LevelProgress } from "../LevelProgress";
import { StreakDisplay } from "../StreakDisplay";
import { StatsGrid } from "./StatsGrid";
import { AchievementsList } from "./AchievementsList";
import { styles } from "./styles";
import type { GamificationScreenProps } from "./types";

/**
 * Internal component that renders the screen with all props
 */
export const GamificationScreenInner: React.FC<GamificationScreenProps> = ({
  title,
  statsTitle,
  achievementsTitle,
  streakTitle,
  levelProps,
  stats,
  achievements,
  streakProps,
  emptyAchievementsText,
  sectionTitleStyle,
  accentColor,
  cardBackgroundColor,
  textColor,
  subtextColor,
  headerComponent,
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();

  // Use tokens for fallbacks
  const finalAccentColor = accentColor || tokens.colors.primary;
  const finalCardBackgroundColor = cardBackgroundColor || tokens.colors.surface;
  const finalTextColor = textColor || tokens.colors.textPrimary;
  const finalSubtextColor = subtextColor || tokens.colors.textSecondary;

  const header = (
    <NavigationHeader
      title={title}
      onBackPress={() => navigation.goBack()}
    />
  );

  return (
    <ScreenLayout
      header={header}
      contentContainerStyle={styles.scrollContent}
      hideScrollIndicator={false}
    >
      {headerComponent}

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
    </ScreenLayout>
  );
};
