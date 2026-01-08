/**
 * GamificationScreen Component
 * Full gamification screen - all text via props
 * Generic for 100+ apps - NO hardcoded strings
 */

import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
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
  accentColor = "#FFD700",
  backgroundColor = "#0A0A0A",
  cardBackgroundColor = "#1A1A1A",
  textColor = "#FFFFFF",
  subtextColor = "#888888",
  headerComponent,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
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
          textColor={textColor}
        />

        {/* Level Progress */}
        <View style={styles.section}>
          <LevelProgress
            {...levelProps}
            primaryColor={accentColor}
            backgroundColor={cardBackgroundColor}
            textColor={textColor}
            subtextColor={subtextColor}
          />
        </View>

        {/* Streak (if provided) */}
        {streakProps && (
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: textColor }, sectionTitleStyle]}
            >
              {streakTitle}
            </Text>
            <StreakDisplay
              {...streakProps}
              primaryColor={accentColor}
              backgroundColor={cardBackgroundColor}
              textColor={textColor}
              subtextColor={subtextColor}
            />
          </View>
        )}

        {/* Stats Grid */}
        <StatsGrid
          statsTitle={statsTitle}
          stats={stats}
          accentColor={accentColor}
          cardBackgroundColor={cardBackgroundColor}
          textColor={textColor}
          subtextColor={subtextColor}
          sectionTitleStyle={sectionTitleStyle}
        />

        {/* Achievements */}
        <AchievementsList
          achievementsTitle={achievementsTitle}
          achievements={achievements}
          emptyAchievementsText={emptyAchievementsText}
          accentColor={accentColor}
          cardBackgroundColor={cardBackgroundColor}
          textColor={textColor}
          subtextColor={subtextColor}
          sectionTitleStyle={sectionTitleStyle}
        />
      </ScrollView>
    </View>
  );
};
