/**
 * useAppRating Hook
 * React hook for app rating system
 * Lazy loads expo-store-review to reduce bundle size
 */

import React, { useCallback, useMemo } from "react";
import type {
  RatingConfig,
  UseAppRatingResult,
  RatingState,
} from "../../domain/entities/RatingConfig";
import { DEFAULT_RATING_CONFIG } from "../../domain/entities/RatingConfig";
import * as RatingService from "../../application/services/RatingService";
import { useAppNavigation } from "@umituz/react-native-design-system/molecules";
import { isDev } from "../../../../utils/devUtils";

/**
 * App rating hook with navigation-based prompt flow
 */
export function useAppRating(config: RatingConfig): UseAppRatingResult {
  const navigation = useAppNavigation();

  const mergedConfig = useMemo<RatingConfig>(() => ({
    ...DEFAULT_RATING_CONFIG,
    ...config,
  }), [config]);

  const trackEvent = useCallback(async (): Promise<void> => {
    await RatingService.trackEvent(mergedConfig.eventType);
  }, [mergedConfig.eventType]);

  const shouldShow = useCallback(async (): Promise<boolean> => {
    return RatingService.shouldShowPrompt(mergedConfig);
  }, [mergedConfig]);

  const showPrompt = useCallback(async (): Promise<void> => {
    await RatingService.markPromptShown(mergedConfig.eventType);

    navigation.push('RatingPrompt' as never, {
      appName: mergedConfig.appName,
      translations: mergedConfig.translations,
      onPositive: async () => {
        await RatingService.markRated();

        try {
          // Lazy load expo-store-review
          const StoreReview = await import('expo-store-review');
          const isAvailable = await StoreReview.isAvailableAsync();

          if (isAvailable) {
            await StoreReview.requestReview();
          }
        } catch (error) {
          if (isDev()) {
            console.error('[useAppRating] Failed to request review:', error);
          }
        }

        if (mergedConfig.onPositiveFeedback) {
          await mergedConfig.onPositiveFeedback();
        }
      },
      onNegative: async () => {
        if (mergedConfig.onNegativeFeedback) {
          await mergedConfig.onNegativeFeedback();
        }
      },
      onLater: async () => {
        if (mergedConfig.onPromptDismissed) {
          await mergedConfig.onPromptDismissed();
        }
      },
    });

    if (mergedConfig.onPromptShown) {
      await mergedConfig.onPromptShown();
    }
  }, [mergedConfig, navigation]);

  const checkAndShow = useCallback(async (): Promise<boolean> => {
    const should = await shouldShow();

    if (should) {
      await showPrompt();
      return true;
    }

    return false;
  }, [shouldShow, showPrompt]);

  const reset = useCallback(async (): Promise<void> => {
    await RatingService.reset(mergedConfig.eventType);
  }, [mergedConfig.eventType]);

  const getState = useCallback(async (): Promise<RatingState> => {
    return RatingService.getState(mergedConfig.eventType);
  }, [mergedConfig.eventType]);

  return {
    trackEvent,
    checkAndShow,
    shouldShow,
    showPrompt,
    reset,
    getState,
  } as UseAppRatingResult;
}
