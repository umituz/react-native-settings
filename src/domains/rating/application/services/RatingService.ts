/**
 * Rating Service
 * Core business logic for app rating system
 */

import type { RatingConfig, RatingState } from "../../domain/entities/RatingConfig";
import {
  getEventCount,
  incrementEventCount,
  getLastPromptDate,
  setLastPromptDate,
  getHasRated,
  setHasRated,
  getDismissed,
  setDismissed,
  getRatingState,
  reset as resetStorage,
} from "../../infrastructure/storage/RatingStorage";

/**
 * Calculate days between two dates
 */
function daysBetween(dateString: string, now: Date): number {
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Track an event occurrence
 */
export async function trackEvent(eventType: string): Promise<void> {
  try {
    await incrementEventCount(eventType);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      const count = await getEventCount(eventType);
      console.log(`[RatingService] Event tracked: ${eventType}, count: ${count}`);
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error tracking event:", error);
    }
  }
}

/**
 * Check if prompt should be shown based on criteria
 */
export async function shouldShowPrompt(config: RatingConfig): Promise<boolean> {
  try {
    const hasRated = await getHasRated();
    if (hasRated) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[RatingService] User has already rated, skipping prompt");
      }
      return false;
    }

    const dismissed = await getDismissed();
    if (dismissed) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[RatingService] User permanently dismissed prompt");
      }
      return false;
    }

    const eventCount = await getEventCount(config.eventType);
    const minCount = config.minEventCount ?? 3;

    if (eventCount < minCount) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log(
          `[RatingService] Event count ${eventCount} < ${minCount}, not showing prompt`
        );
      }
      return false;
    }

    const lastPromptDate = await getLastPromptDate(config.eventType);

    if (lastPromptDate) {
      const cooldownDays = config.cooldownDays ?? 90;
      const daysSinceLastPrompt = daysBetween(lastPromptDate, new Date());

      if (daysSinceLastPrompt < cooldownDays) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log(
            `[RatingService] Cooldown period active: ${daysSinceLastPrompt}/${cooldownDays} days`
          );
        }
        return false;
      }
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[RatingService] All criteria met, prompt should be shown");
    }

    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error checking criteria:", error);
    }
    return false;
  }
}

/**
 * Mark that prompt was shown to user
 */
export async function markPromptShown(eventType: string): Promise<void> {
  try {
    const now = new Date().toISOString();
    await setLastPromptDate(eventType, now);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[RatingService] Prompt shown marked for: ${eventType}`);
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error marking prompt shown:", error);
    }
  }
}

/**
 * Mark that user has rated the app
 */
export async function markRated(): Promise<void> {
  try {
    await setHasRated(true);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[RatingService] User marked as rated");
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error marking rated:", error);
    }
  }
}

/**
 * Mark that user permanently dismissed the prompt
 */
export async function markDismissed(): Promise<void> {
  try {
    await setDismissed(true);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[RatingService] User marked as dismissed");
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error marking dismissed:", error);
    }
  }
}

/**
 * Get current rating state for event type
 */
export async function getState(eventType: string): Promise<RatingState> {
  return getRatingState(eventType);
}

/**
 * Reset rating data (for testing or specific event type)
 */
export async function reset(eventType?: string): Promise<void> {
  try {
    await resetStorage(eventType);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(
        `[RatingService] Reset ${eventType ? `event: ${eventType}` : "all rating data"}`
      );
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[RatingService] Error resetting:", error);
    }
  }
}
