/**
 * DisclaimerSetting Component
 *
 * Displays health/wellness app disclaimer with important legal notice
 * Used in About screens for apps that require medical/health disclaimers
 *
 * Features:
 * - Tappable card that opens full disclaimer modal
 * - Warning icon with background color
 * - Internationalized title and message
 * - Full-screen modal with scrollable content
 * - NO shadows (CLAUDE.md compliance)
 * - Universal across iOS, Android, Web (NO Platform.OS checks)
 *
 * Usage:
 * - Import and use in AboutScreen
 * - Requires translations: settings.disclaimer.title, settings.disclaimer.message, settings.disclaimer.shortMessage
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system-theme';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';

type DesignTokens = ReturnType<typeof useAppDesignTokens>;

export const DisclaimerSetting: React.FC = () => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: withAlpha(tokens.colors.warning, 0.1) },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        testID="disclaimer-setting"
      >
        {/* Icon and Title Row */}
        <View style={styles.headerRow}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: withAlpha(tokens.colors.warning, 0.2),
                borderColor: withAlpha(tokens.colors.warning, 0.4),
                borderWidth: 1,
              },
            ]}
          >
            <AtomicIcon name="AlertTriangle" color="warning" />
          </View>
          <AtomicText type="bodyLarge" color="primary" style={styles.title}>
            {t('settings.disclaimer.title')}
          </AtomicText>
          <AtomicIcon name="ArrowRight" color="secondary" size="sm" />
        </View>

        {/* Short Message */}
        <AtomicText
          type="bodySmall"
          color="secondary"
          style={styles.shortMessage}
        >
          {t('settings.disclaimer.shortMessage')}
        </AtomicText>
      </TouchableOpacity>

      {/* Full Disclaimer Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
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
              {t('settings.disclaimer.title')}
            </AtomicText>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              testID="close-disclaimer-modal"
            >
              <AtomicIcon name="X" color="primary" size="md" />
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
              {t('settings.disclaimer.message')}
            </AtomicText>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      marginHorizontal: tokens.spacing.md,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 12,
    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    title: {
      flex: 1,
      fontWeight: tokens.typography.labelLarge.fontWeight as any,
      fontSize: tokens.typography.labelLarge.fontSize,
    },

    shortMessage: {
      lineHeight: 18,
      paddingLeft: 52, // Align with title (40px icon + 12px margin)
      fontSize: 13,
    },

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

