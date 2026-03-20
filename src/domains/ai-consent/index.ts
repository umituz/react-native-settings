/**
 * @umituz/react-native-settings - AI Consent Domain
 *
 * AI consent management for React Native apps
 * Required by Apple App Store Guidelines 5.1.1(i) & 5.1.2(i)
 *
 * Displays AI technology disclosure and obtains user consent before
 * using AI generation features.
 *
 * Usage:
 *   import {
 *     AIConsentScreen,
 *     AIConsentModal,
 *     AIConsentSetting,
 *     useAIConsent
 *   } from '@umituz/react-native-settings/ai-consent';
 *
 *   // Show modal on app launch
 *   const { isConsentModalVisible, handleAcceptConsent, handleDeclineConsent } = useAIConsent();
 *
 *   <AIConsentModal
 *     visible={isConsentModalVisible}
 *     onAccept={handleAcceptConsent}
 *     onDecline={handleDeclineConsent}
 *   />
 *
 *   // Add to settings screen
 *   <AIConsentSetting />
 */

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { AIConsentModal } from './presentation/components/AIConsentModal';
export type { AIConsentModalProps } from './presentation/components/AIConsentModal';

export { AIConsentSetting } from './presentation/components/AIConsentSetting';
export type { AIConsentSettingProps } from './presentation/components/AIConsentSetting';

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { AIConsentScreen } from './presentation/screens/AIConsentScreen';
export type { AIConsentScreenProps, AIConsentScreenParams, AIProvider } from './presentation/screens/AIConsentScreen';

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useAIConsent } from './presentation/hooks/useAIConsent';
export type { UseAIConsentReturn, AIConsentState } from './presentation/hooks/useAIConsent';
