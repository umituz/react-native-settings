/**
 * GamificationScreen StatsGrid Component
 */

import React from "react";
import { View, Text, type TextStyle } from "react-native";
import { StatsCard } from "../StatsCard";
import { styles } from "./styles";
import type { StatsCardProps } from "../StatsCard";

export interface StatsGridProps {
  statsTitle: string;
  stats: Array<Omit<StatsCardProps, "accentColor" | "backgroundColor" | "textColor" | "subtextColor">>;
  accentColor: string;
  cardBackgroundColor: string;
  textColor: string;
  subtextColor: string;
  sectionTitleStyle?: TextStyle;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  statsTitle,
  stats,
  accentColor,
  cardBackgroundColor,
  textColor,
  subtextColor,
  sectionTitleStyle,
}) => {
  if (stats.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor }, sectionTitleStyle]}>
        {statsTitle}
      </Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            {...stat}
            accentColor={accentColor}
            backgroundColor={cardBackgroundColor}
            textColor={textColor}
            subtextColor={subtextColor}
          />
        ))}
      </View>
    </View>
  );
};
