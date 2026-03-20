/**
 * useAIConsent Hook
 * Manages AI consent state and display logic
 * Required by Apple App Store Guidelines 5.1.1(i) & 5.1.2(i)
 *
 * Features:
 * - Checks if user has consented to AI services
 * - Shows modal on first use
 * - Persists consent state
 * - Memoized for performance
 */

import { useState, useEffect, useCallback } from 'react';
import { useStorage } from '@umituz/react-native-design-system/storage';

export interface AIConsentState {
  hasConsented: boolean;
  consentTimestamp?: number;
  consentVersion?: string;
}

const CONSENT_STORAGE_KEY = '@app:ai_consent_accepted';
const CURRENT_CONSENT_VERSION = '1.0';

export interface UseAIConsentReturn {
  isLoading: boolean;
  isConsentModalVisible: boolean;
  hasConsented: boolean;
  consentState: AIConsentState | null;
  handleAcceptConsent: () => Promise<void>;
  handleDeclineConsent: () => void;
  showConsentModal: () => void;
  checkConsent: () => Promise<void>;
}

export const useAIConsent = (): UseAIConsentReturn => {
  const { getString, setString } = useStorage();
  const [isConsentModalVisible, setIsConsentModalVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [consentState, setConsentState] = useState<AIConsentState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check if user has previously consented
   */
  const checkConsent = useCallback(async () => {
    setIsLoading(true);
    try {
      const consentData = await getString(CONSENT_STORAGE_KEY, '');

      if (consentData) {
        const parsed: AIConsentState = JSON.parse(consentData);
        setConsentState(parsed);
        setHasConsented(parsed.hasConsented);

        // Show modal if user hasn't consented
        if (!parsed.hasConsented) {
          setIsConsentModalVisible(true);
        }
      } else {
        // No consent found - show modal
        setIsConsentModalVisible(true);
      }
    } catch (error) {
      console.error('[useAIConsent] Failed to check consent:', error);
      // On error, show modal to be safe
      setIsConsentModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  }, [getString]);

  /**
   * Handle user accepting AI consent
   */
  const handleAcceptConsent = useCallback(async () => {
    try {
      const newState: AIConsentState = {
        hasConsented: true,
        consentTimestamp: Date.now(),
        consentVersion: CURRENT_CONSENT_VERSION,
      };

      await setString(CONSENT_STORAGE_KEY, JSON.stringify(newState));
      setConsentState(newState);
      setHasConsented(true);
      setIsConsentModalVisible(false);
    } catch (error) {
      console.error('[useAIConsent] Failed to save consent:', error);
      throw error;
    }
  }, [setString]);

  /**
   * Handle user declining AI consent
   */
  const handleDeclineConsent = useCallback(() => {
    setIsConsentModalVisible(false);
    // User declined - they can still use the app but AI features will be blocked
    // This is handled by the hasConsented flag
  }, []);

  /**
   * Manually show consent modal (e.g., from settings)
   */
  const showConsentModal = useCallback(() => {
    setIsConsentModalVisible(true);
  }, []);

  // Check consent on mount
  useEffect(() => {
    void checkConsent();
  }, [checkConsent]);

  return {
    isLoading,
    isConsentModalVisible,
    hasConsented,
    consentState,
    handleAcceptConsent,
    handleDeclineConsent,
    showConsentModal,
    checkConsent,
  };
};
