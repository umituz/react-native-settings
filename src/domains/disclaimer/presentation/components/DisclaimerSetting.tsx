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
import { DisclaimerCard } from './DisclaimerCard';
import { DisclaimerModal } from './DisclaimerModal';

export interface DisclaimerSettingProps {
  /** Custom title */
  title?: string;
  /** Custom content */
  content?: string;
  /** Custom short message */
  shortMessage?: string;
  /** Custom icon name */
  iconName?: string;
  /** Custom icon color */
  iconColor?: string;
  /** Custom background color */
  backgroundColor?: string;
}

export const DisclaimerSetting: React.FC<DisclaimerSettingProps> = ({
  title = "",
  content = "",
  shortMessage = "",
  iconName = "alert-triangle",
  iconColor,
  backgroundColor,
}) => {
  const tokens = useAppDesignTokens();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

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
        animationType="none"
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

