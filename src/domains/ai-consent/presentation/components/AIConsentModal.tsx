/**
 * AI Consent Modal
 *
 * Modal wrapper for AI consent screen.
 * Required by Apple App Store Guidelines 5.1.1(i) & 5.1.2(i)
 *
 * Displays on first app launch before any AI features are used.
 * Can also be shown manually from settings.
 *
 * Usage:
 *   <AIConsentModal
 *     visible={isConsentModalVisible}
 *     onAccept={handleAccept}
 *     onDecline={handleDecline}
 *   />
 */

import React, { memo } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { AIConsentScreen, type AIProvider } from '../screens/AIConsentScreen';

export interface AIConsentModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  providers?: AIProvider[];
  customMessage?: string;
}

export const AIConsentModal: React.FC<AIConsentModalProps> = memo(({
  visible,
  onAccept,
  onDecline,
  providers,
  customMessage,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onDecline}
    >
      <View style={styles.container}>
        <AIConsentScreen
          providers={providers}
          customMessage={customMessage}
          onAccept={onAccept}
          onDecline={onDecline}
          standalone={true}
        />
      </View>
    </Modal>
  );
});

AIConsentModal.displayName = 'AIConsentModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
