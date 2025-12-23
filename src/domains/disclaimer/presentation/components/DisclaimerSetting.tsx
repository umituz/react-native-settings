/**
 * DisclaimerSetting Component
 *
 * Displays customizable disclaimer with important legal notice
 * Used in About screens for apps that require disclaimers
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

import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-native';

import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { DisclaimerCard } from './DisclaimerCard';
import { DisclaimerModal } from './DisclaimerModal';

export interface DisclaimerSettingProps {
  /** Custom title translation key */
  titleKey?: string;
  /** Custom message translation key */
  messageKey?: string;
  /** Custom short message translation key */
  shortMessageKey?: string;
  /** Custom icon name */
  iconName?: string;
  /** Custom icon color */
  iconColor?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom modal title */
  modalTitle?: string;
  /** Custom modal content */
  modalContent?: string;
}

export const DisclaimerSetting: React.FC<DisclaimerSettingProps> = ({
  titleKey = "settings.disclaimer.title",
  messageKey = "settings.disclaimer.message",
  shortMessageKey = "settings.disclaimer.shortMessage",
  iconName = "alert-triangle",
  iconColor,
  backgroundColor,
  modalTitle,
  modalContent,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

  const title = modalTitle || t(titleKey);
  const content = modalContent || t(messageKey);
  const shortMessage = t(shortMessageKey);
  const finalIconColor = iconColor || tokens.colors.warning;
  const finalBackgroundColor = backgroundColor || withAlpha(finalIconColor, 0.1);

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <DisclaimerCard
        title={title}
        shortMessage={shortMessage}
        iconName={iconName}
        iconColor={finalIconColor}
        backgroundColor={finalBackgroundColor}
        onPress={handleOpenModal}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <DisclaimerModal
          visible={modalVisible}
          title={title}
          content={content}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
};

