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
import { Modal, View } from 'react-native';
import { AIConsentScreen, type AIProvider } from '../screens/AIConsentScreen';
import { useThemedStyleSheet } from '@umituz/react-native-design-system/theme';
import type { Theme } from '@umituz/react-native-design-system/theme';

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
  const styles = useThemedStyleSheet(createStyles);

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

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
});
