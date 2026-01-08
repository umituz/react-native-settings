/**
 * Gamification Configuration Example
 * 
 * Copy this file to your app's settings config directory:
 * src/domains/settings/config/gamification.config.ts
 */

import type { GamificationSettingsConfig } from "../types";

/**
 * Creates gamification configuration for settings
 * 
 * @param t - Translation function from useLocalization
 * @returns Gamification settings configuration
 */
export const createGamificationConfig = ({ t }): GamificationSettingsConfig => ({
  enabled: true,
  
  // Gamification system configuration
  config: {
    storageKey: "app_gamification_data",
    
    // Define achievements
    achievements: [
      // Count-based achievements
      { id: "first_task", threshold: 1, type: "count" },
      { id: "five_tasks", threshold: 5, type: "count" },
      { id: "ten_tasks", threshold: 10, type: "count" },
      { id: "fifty_tasks", threshold: 50, type: "count" },
      { id: "hundred_tasks", threshold: 100, type: "count" },
      
      // Streak-based achievements
      { id: "three_day_streak", threshold: 3, type: "streak" },
      { id: "week_streak", threshold: 7, type: "streak" },
      { id: "month_streak", threshold: 30, type: "streak" },
      
      // Milestone achievements
      { id: "first_login", threshold: 1, type: "milestone" },
      { id: "power_user", threshold: 1, type: "milestone" },
    ],
    
    // Define level progression
    levels: [
      { level: 1, minPoints: 0, maxPoints: 50 },
      { level: 2, minPoints: 50, maxPoints: 150 },
      { level: 3, minPoints: 150, maxPoints: 300 },
      { level: 4, minPoints: 300, maxPoints: 500 },
      { level: 5, minPoints: 500, maxPoints: 800 },
      { level: 6, minPoints: 800, maxPoints: 1200 },
      { level: 7, minPoints: 1200, maxPoints: 1700 },
      { level: 8, minPoints: 1700, maxPoints: 2300 },
      { level: 9, minPoints: 2300, maxPoints: 3000 },
      { level: 10, minPoints: 3000, maxPoints: 999999 },
    ],
    
    // Points awarded per action
    pointsPerAction: 10,
    
    // Streak bonus multiplier (1.5 = 50% bonus)
    streakBonusMultiplier: 1.5,
  },
  
  // Screen display configuration
  screenProps: {
    title: t("gamification.title"),
    statsTitle: t("gamification.stats.title"),
    achievementsTitle: t("gamification.achievements.title"),
    streakTitle: t("gamification.streak.title"),
  },
});
