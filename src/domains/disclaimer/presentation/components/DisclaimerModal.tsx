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

import { useAppDesignTokens, AtomicText, AtomicIcon, BaseModal } from '@umituz/react-native-design-system';

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

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.modalContentWrapper}>
        {/* Modal Header */}
        <View
          style={[
            styles.modalHeader,
            { borderBottomColor: tokens.colors.border },
          ]}
        >
          <AtomicText type="headlineMedium" color="primary">
            {title}
          </AtomicText>
          <TouchableOpacity
            onPress={onClose}
            testID="close-disclaimer-modal"
          >
            <AtomicIcon name="close" color="primary" size="md" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={styles.modalContentContainer}
        >
          <AtomicText
            type="bodyMedium"
            color="textPrimary"
            style={styles.modalText}
          >
            {content}
          </AtomicText>
        </ScrollView>
      </View>
    </BaseModal>
  );
};


const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
    },
    modalContentWrapper: {
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
      fontSize: 15, // or tokens.typography.bodyMedium.responsiveFontSize
    },
  });