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

/**
 * Create subscription configuration
 * @param route - Navigation route name (preferred for stack navigation)
 * @param onPress - Callback function (use route instead when possible)
 */
export const createSubscriptionConfig = (
  isPremium: boolean,
  routeOrOnPress: string | (() => void),
): SubscriptionConfig => ({
  enabled: true,
  icon: "diamond",
  route: typeof routeOrOnPress === "string" ? routeOrOnPress : undefined,
  onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
  isPremium,
});

/**
 * Create gamification configuration
 */
export const createGamificationConfig = (
  storageKey: string,
  achievements: AchievementDefinition[],
  levels: LevelDefinition[],
  enabled = true,
): GamificationConfig => ({
  enabled,
  storageKey,
  achievements,
  levels,
});
