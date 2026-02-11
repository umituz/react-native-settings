/**
 * GamificationScreen StatsGrid Component
 */

import React from "react";
import { View, type TextStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
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
      <AtomicText style={[styles.sectionTitle, { color: textColor }, sectionTitleStyle]}>
        {statsTitle}
      </AtomicText>
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <StatsCard
            key={`${stat.label}-${stat.value}`}
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
