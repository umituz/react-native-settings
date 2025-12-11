/**
 * Feature Detection Hook
 * Single Responsibility: Detect which features should be shown
 */
import type { NormalizedConfig } from "../utils/normalizeConfig";
/**
 * Hook to detect which features should be shown
 */
export declare function useFeatureDetection(normalizedConfig: NormalizedConfig, navigation: any, options?: {
    notificationServiceAvailable?: boolean;
}): {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
    about: boolean;
    legal: boolean;
    account: boolean;
    support: boolean;
    developer: boolean;
};
//# sourceMappingURL=useFeatureDetection.d.ts.map