/**
 * useSettingsScreen Hook
 * Refactored: Extracted business logic from SettingsScreen component
 */

import { useMemo, useCallback } from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { normalizeSettingsConfig } from "../utils/normalizeConfig";
import { useFeatureDetection } from "./useFeatureDetection";
import { getAppVersion } from "../../../utils/appUtils";
import type { SettingsConfig } from "../types";

export interface UseSettingsScreenParams {
  config?: SettingsConfig;
  showUserProfile?: boolean;
  featureOptions?: {
    notificationServiceAvailable?: boolean;
  };
  appVersion?: string;
  onClose?: () => void;
}

export function useSettingsScreen({
  config = {},
  showUserProfile,
  featureOptions,
  appVersion: providedVersion,
  onClose,
}: UseSettingsScreenParams) {
  const navigation = useAppNavigation();

  // Normalize config
  const normalizedConfig = useMemo(
    () => normalizeSettingsConfig(config),
    [config]
  );

  // Feature detection
  const features = useFeatureDetection(
    normalizedConfig,
    navigation,
    featureOptions
  );

  const shouldShowUserProfile = showUserProfile ?? features.userProfile;

  const appVersion = providedVersion || getAppVersion();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  }, [onClose, navigation]);

  return {
    normalizedConfig,
    features,
    shouldShowUserProfile,
    appVersion,
    handleClose,
  };
}
