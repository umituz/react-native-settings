/**
 * Feature Checker Utilities
 * Centralized logic for checking if features are enabled
 */

import type { SettingsContentFeatures } from "../types/SettingsContentProps";
import type { CustomSettingsSection } from "../../types";

/**
 * Check if any settings features are enabled
 */
export function hasAnyFeaturesEnabled(
  features: SettingsContentFeatures,
  customSections: CustomSettingsSection[]
): boolean {
  return (
    features.appearance ||
    features.language ||
    features.notifications ||
    features.about ||
    features.legal ||
    features.disclaimer ||
    features.feedback ||
    features.rating ||
    features.faqs ||
    features.subscription ||
    features.wallet ||
    features.gamification ||
    features.videoTutorial ||
    customSections.length > 0
  );
}
