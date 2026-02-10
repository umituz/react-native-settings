/**
 * Feature Settings Config Creators
 * Subscription, gamification
 */

import type { SubscriptionConfig } from "../../screens/types";
import type {
  GamificationConfig,
  AchievementDefinition,
  LevelDefinition,
} from "../../../domains/gamification/types";
import type { TranslationFunction } from "./types";

/**
 * Create subscription configuration
 * @param route - Navigation route name (preferred for stack navigation)
 * @param onPress - Callback function (use route instead when possible)
 */
export const createSubscriptionConfig = (
  t: TranslationFunction,
  isPremium: boolean,
  routeOrOnPress: string | (() => void),
): SubscriptionConfig => ({
  enabled: true,
  title: t("settings.subscription.title"),
  description: isPremium
    ? t("subscription.premiumDetails.statusActive")
    : t("settings.subscription.description"),
  icon: "diamond",
  sectionTitle: t("settings.sections.subscription").toUpperCase(),
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
  isPremium,
});

/**
 * Create gamification configuration
 */
export const createGamificationConfig = (
  t: TranslationFunction,
  storageKey: string,
  achievements: AchievementDefinition[],
  levels: LevelDefinition[],
  enabled = true,
): GamificationConfig => ({
  enabled,
  storageKey,
  achievements,
  levels,
  translations: {
    title: t("settings.gamification.title"),
    statsTitle: t("settings.gamification.stats.title"),
    pointsLabel: t("settings.gamification.stats.points"),
    totalCompletedLabel: t("settings.gamification.stats.totalCompleted"),
    achievementsTitle: t("settings.gamification.achievements.title"),
    streakTitle: t("settings.gamification.streak.title"),
    bestStreak: t("settings.gamification.streak.best"),
    currentStreak: t("settings.gamification.streak.current"),
    days: t("settings.gamification.streak.days"),
    levelTitle: t("settings.gamification.level.title"),
    emptyAchievements: t("settings.gamification.achievements.empty"),
  },
});
