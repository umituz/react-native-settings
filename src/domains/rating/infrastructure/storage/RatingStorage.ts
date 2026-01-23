/**
 * Rating Storage Repository
 * Storage layer for rating system using design system storageRepository
 */

import { storageRepository, unwrap } from "@umituz/react-native-design-system";
import type { RatingState } from "../../domain/entities/RatingConfig";

/**
 * Storage key generator
 */
const KEYS = {
  eventCount: (eventType: string) => `rating.${eventType}.count`,
  lastPrompt: (eventType: string) => `rating.${eventType}.lastPrompt`,
  hasRated: "rating.hasRated",
  dismissed: "rating.dismissed",
} as const;

/**
 * Get event count for specific event type
 */
export async function getEventCount(eventType: string): Promise<number> {
  try {
    const result = await storageRepository.getString(KEYS.eventCount(eventType), "0");
    const count = parseInt(unwrap(result, "0"), 10);
    return Number.isNaN(count) ? 0 : count;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error getting event count:", error);
    }
    return 0;
  }
}

/**
 * Set event count for specific event type
 */
export async function setEventCount(eventType: string, count: number): Promise<void> {
  try {
    await storageRepository.setString(KEYS.eventCount(eventType), count.toString());
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error setting event count:", error);
    }
  }
}

/**
 * Increment event count for specific event type
 */
export async function incrementEventCount(eventType: string): Promise<void> {
  const currentCount = await getEventCount(eventType);
  await setEventCount(eventType, currentCount + 1);
}

/**
 * Get last prompt date for specific event type
 */
export async function getLastPromptDate(eventType: string): Promise<string | null> {
  try {
    const result = await storageRepository.getString(KEYS.lastPrompt(eventType), "");
    const date = unwrap(result, "");
    return date || null;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error getting last prompt date:", error);
    }
    return null;
  }
}

/**
 * Set last prompt date for specific event type
 */
export async function setLastPromptDate(eventType: string, date: string): Promise<void> {
  try {
    await storageRepository.setString(KEYS.lastPrompt(eventType), date);
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error setting last prompt date:", error);
    }
  }
}

/**
 * Check if user has rated the app
 */
export async function getHasRated(): Promise<boolean> {
  try {
    const result = await storageRepository.getString(KEYS.hasRated, "false");
    return unwrap(result, "false") === "true";
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error getting hasRated:", error);
    }
    return false;
  }
}

/**
 * Set whether user has rated the app
 */
export async function setHasRated(value: boolean): Promise<void> {
  try {
    await storageRepository.setString(KEYS.hasRated, value.toString());
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error setting hasRated:", error);
    }
  }
}

/**
 * Check if user permanently dismissed the prompt
 */
export async function getDismissed(): Promise<boolean> {
  try {
    const result = await storageRepository.getString(KEYS.dismissed, "false");
    return unwrap(result, "false") === "true";
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error getting dismissed:", error);
    }
    return false;
  }
}

/**
 * Set whether user permanently dismissed the prompt
 */
export async function setDismissed(value: boolean): Promise<void> {
  try {
    await storageRepository.setString(KEYS.dismissed, value.toString());
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error setting dismissed:", error);
    }
  }
}

/**
 * Get complete rating state for specific event type
 */
export async function getRatingState(eventType: string): Promise<RatingState> {
  const [eventCount, lastPromptDate, hasRated, dismissed] = await Promise.all([
    getEventCount(eventType),
    getLastPromptDate(eventType),
    getHasRated(),
    getDismissed(),
  ]);

  return {
    eventCount,
    lastPromptDate,
    hasRated,
    dismissed,
  };
}

/**
 * Reset rating data for specific event type or all data
 */
export async function reset(eventType?: string): Promise<void> {
  try {
    if (eventType) {
      await storageRepository.removeItem(KEYS.eventCount(eventType));
      await storageRepository.removeItem(KEYS.lastPrompt(eventType));
    } else {
      const allKeysResult = await storageRepository.getAllKeys();
      const allKeys = unwrap(allKeysResult, []);
      const ratingKeys = allKeys.filter((key) => key.startsWith("rating."));

      await Promise.all(
        ratingKeys.map((key) => storageRepository.removeItem(key))
      );
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingStorage] Error resetting data:", error);
    }
  }
}
