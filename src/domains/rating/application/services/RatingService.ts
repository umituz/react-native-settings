/**
 * Rating Service
 *
 * Core business logic for app rating system.
 * Refactored to extend BaseService for consistent error handling.
 *
 * @module RatingService
 */

import type { RatingConfig, RatingState } from "../../domain/entities/RatingConfig";
import { BaseService } from "../../../../core/base/BaseService";
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
 * Rating Service Class
 */
export class RatingService extends BaseService {
  protected serviceName = "RatingService";

  /**
   * Track an event occurrence
   */
  async trackEvent(eventType: string): Promise<void> {
    await this.execute("trackEvent", async () => {
      await incrementEventCount(eventType);
    });
  }

  /**
   * Check if prompt should be shown based on criteria
   */
  async shouldShowPrompt(config: RatingConfig): Promise<boolean> {
    const result = await this.execute("shouldShowPrompt", async () => {
      const hasRated = await getHasRated();
      if (hasRated) return false;

      const dismissed = await getDismissed();
      if (dismissed) return false;

      const eventCount = await getEventCount(config.eventType);
      const minCount = config.minEventCount ?? 3;

      if (eventCount < minCount) return false;

      const lastPromptDate = await getLastPromptDate(config.eventType);

      if (lastPromptDate) {
        const cooldownDays = config.cooldownDays ?? 90;
        const daysSinceLastPrompt = daysBetween(lastPromptDate, new Date());

        if (daysSinceLastPrompt < cooldownDays) {
          return false;
        }
      }

      return true;
    });

    return result.success ? result.data : false;
  }

  /**
   * Mark that prompt was shown to user
   */
  async markPromptShown(eventType: string): Promise<void> {
    await this.execute("markPromptShown", async () => {
      await setLastPromptDate(eventType, toISOString());
    });
  }

  /**
   * Mark that user has rated the app
   */
  async markRated(): Promise<void> {
    await this.execute("markRated", async () => {
      await setHasRated(true);
    });
  }

  /**
   * Mark that user permanently dismissed the prompt
   */
  async markDismissed(): Promise<void> {
    await this.execute("markDismissed", async () => {
      await setDismissed(true);
    });
  }

  /**
   * Get current rating state for event type
   */
  async getState(eventType: string): Promise<RatingState> {
    return getRatingState(eventType);
  }

  /**
   * Reset rating data (for testing or specific event type)
   */
  async reset(eventType?: string): Promise<void> {
    await this.execute("reset", async () => {
      await resetStorage(eventType);
    });
  }
}

/**
 * Singleton instance
 */
let ratingServiceInstance: RatingService | null = null;

/**
 * Get rating service singleton instance
 */
export function getRatingService(): RatingService {
  if (!ratingServiceInstance) {
    ratingServiceInstance = new RatingService();
  }
  return ratingServiceInstance;
}

/**
 * Default export for backward compatibility
 */
export const ratingService = getRatingService();

/**
 * Static convenience functions that delegate to singleton
 */
export async function trackEvent(eventType: string): Promise<void> {
  await ratingService.trackEvent(eventType);
}

export async function shouldShowPrompt(config: RatingConfig): Promise<boolean> {
  return await ratingService.shouldShowPrompt(config);
}

export async function markPromptShown(eventType: string): Promise<void> {
  await ratingService.markPromptShown(eventType);
}

export async function markRated(): Promise<void> {
  await ratingService.markRated();
}

export async function markDismissed(): Promise<void> {
  await ratingService.markDismissed();
}

export async function getState(eventType: string): Promise<RatingState> {
  return await ratingService.getState(eventType);
}

export async function reset(eventType?: string): Promise<void> {
  await ratingService.reset(eventType);
}
