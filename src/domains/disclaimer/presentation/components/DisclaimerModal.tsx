/**
 * Disclaimer Modal Component
 * Extracted from DisclaimerSetting to follow single responsibility and 200-line rules
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';

export interface DisclaimerModalProps {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  visible,
  title,
  content,
  onClose,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  if (!visible) return null;

  return (
    <View
      style={[
        styles.modalContainer,
        { backgroundColor: tokens.colors.backgroundPrimary },
      ]}
    >
      {/* Modal Header */}
      <View
        style={[
          styles.modalHeader,
          { borderBottomColor: tokens.colors.borderLight },
        ]}
      >
        <AtomicText type="headlineMedium" color="primary">
          {title}
        </AtomicText>
        <TouchableOpacity
          onPress={onClose}
          testID="close-disclaimer-modal"
        >
          <AtomicIcon name="x" color="primary" size="md" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.modalContent}
        contentContainerStyle={styles.modalContentContainer}
      >
        <AtomicText
          type="bodyMedium"
          color="primary"
          style={styles.modalText}
        >
          {content}
        </AtomicText>
      </ScrollView>
    </View>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
    },

    modalContent: {
      flex: 1,
    },

    modalContentContainer: {
      padding: 20,
    },

    modalText: {
      lineHeight: 24,
      fontSize: 15,
    },
  });