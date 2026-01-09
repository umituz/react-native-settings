import React from "react";
/**
 * GamificationScreen Component
 * Full gamification screen - all text via props
 * Generic for 100+ apps - NO hardcoded strings
 */

import { View, ScrollView, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";
import { LevelProgress } from "../LevelProgress";
import { StreakDisplay } from "../StreakDisplay";
import { Header } from "./Header";
import { StatsGrid } from "./StatsGrid";
import { AchievementsList } from "./AchievementsList";
import { styles } from "./styles";
import type { GamificationScreenProps } from "./types";

export type { GamificationScreenProps };

export const GamificationScreen: React.FC<GamificationScreenProps> = ({
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
