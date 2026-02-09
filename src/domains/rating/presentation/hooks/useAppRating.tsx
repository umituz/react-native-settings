/**
 * useAppRating Hook
 * React hook for app rating system
 */

import React, { useState, useCallback } from "react";
import * as StoreReview from "expo-store-review";
import type {
  RatingConfig,
  UseAppRatingResult,
  RatingState,
} from "../../domain/entities/RatingConfig";
import { DEFAULT_RATING_CONFIG } from "../../domain/entities/RatingConfig";
import * as RatingService from "../../application/services/RatingService";
import { RatingPromptModal } from "../components/RatingPromptModal";

/**
 * App rating hook with 2-step prompt flow
 */
export function useAppRating(config: RatingConfig): UseAppRatingResult {
  const [isVisible, setIsVisible] = useState(false);

  const mergedConfig: RatingConfig = {
    ...DEFAULT_RATING_CONFIG,
    ...config,
  };

  const trackEvent = useCallback(async (): Promise<void> => {
    await RatingService.trackEvent(mergedConfig.eventType);
  }, [mergedConfig.eventType]);

  const shouldShow = useCallback(async (): Promise<boolean> => {
    return RatingService.shouldShowPrompt(mergedConfig);
  }, [mergedConfig]);

  const showPrompt = useCallback(async (): Promise<void> => {
    setIsVisible(true);
    await RatingService.markPromptShown(mergedConfig.eventType);

    if (mergedConfig.onPromptShown) {
      await mergedConfig.onPromptShown();
    }
  }, [mergedConfig]);

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

  const handlePositive = useCallback(async () => {
    setIsVisible(false);
    await RatingService.markRated();

    try {
      const isAvailable = await StoreReview.isAvailableAsync();

      if (isAvailable) {
        await StoreReview.requestReview();
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
      }
    }

    if (mergedConfig.onPositiveFeedback) {
      await mergedConfig.onPositiveFeedback();
    }
  }, [mergedConfig]);

  const handleNegative = useCallback(async () => {
    setIsVisible(false);

    if (mergedConfig.onNegativeFeedback) {
      await mergedConfig.onNegativeFeedback();
    }
  }, [mergedConfig]);

  const handleLater = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleDismiss = useCallback(async () => {
    setIsVisible(false);
    await RatingService.markDismissed();

    if (mergedConfig.onPromptDismissed) {
      await mergedConfig.onPromptDismissed();
    }
  }, [mergedConfig]);

  const modal = (
    <RatingPromptModal
      visible={isVisible}
      onPositive={handlePositive}
      onNegative={handleNegative}
      onLater={handleLater}
      onDismiss={handleDismiss}
      translations={mergedConfig.translations}
      appName={mergedConfig.appName}
    />
  );

  return {
    trackEvent,
    checkAndShow,
    shouldShow,
    showPrompt,
    reset,
    getState,
    isVisible,
    modal,
  } as UseAppRatingResult & { modal: React.ReactNode };
}
