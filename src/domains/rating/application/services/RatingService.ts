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
 * Format date to ISO string
 */
function toISOString(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Track an event occurrence
 */
export async function trackEvent(eventType: string): Promise<void> {
  try {
    await incrementEventCount(eventType);
  } catch (error) {
    console.error('[RatingService] Failed to track event:', eventType, error);
  }
}

/**
 * Check if prompt should be shown based on criteria
 */
export async function shouldShowPrompt(config: RatingConfig): Promise<boolean> {
  try {
    const hasRated = await getHasRated();
    if (hasRated) {
      return false;
    }

    const dismissed = await getDismissed();
    if (dismissed) {
      return false;
    }

    const eventCount = await getEventCount(config.eventType);
    const minCount = config.minEventCount ?? 3;

    if (eventCount < minCount) {
      return false;
    }

    const lastPromptDate = await getLastPromptDate(config.eventType);

    if (lastPromptDate) {
      const cooldownDays = config.cooldownDays ?? 90;
      const daysSinceLastPrompt = daysBetween(lastPromptDate, new Date());

      if (daysSinceLastPrompt < cooldownDays) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Mark that prompt was shown to user
 */
export async function markPromptShown(eventType: string): Promise<void> {
  try {
    await setLastPromptDate(eventType, toISOString());
  } catch (error) {
    console.error('[RatingService] Failed to mark prompt shown:', eventType, error);
  }
}

/**
 * Mark that user has rated the app
 */
export async function markRated(): Promise<void> {
  try {
    await setHasRated(true);
  } catch (error) {
    console.error('[RatingService] Failed to mark as rated:', error);
  }
}

/**
 * Mark that user permanently dismissed the prompt
 */
export async function markDismissed(): Promise<void> {
  try {
    await setDismissed(true);
  } catch (error) {
    console.error('[RatingService] Failed to mark as dismissed:', error);
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
  } catch (error) {
    console.error('[RatingService] Failed to reset:', eventType, error);
  }
}
