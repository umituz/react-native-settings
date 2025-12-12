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
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system-theme';
import { useLocalization } from '@umituz/react-native-localization';
import { DisclaimerCard } from './DisclaimerCard';
import { DisclaimerModal } from './DisclaimerModal';
export const DisclaimerSetting = ({ titleKey = "settings.disclaimer.title", messageKey = "settings.disclaimer.message", shortMessageKey = "settings.disclaimer.shortMessage", iconName = "AlertTriangle", iconColor, backgroundColor, modalTitle, modalContent, }) => {
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
    const handleOpenModal = () => {
        setModalVisible(true);
        if (__DEV__) {
            console.log('DisclaimerSetting: Modal opened');
        }
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        if (__DEV__) {
            console.log('DisclaimerSetting: Modal closed');
        }
    };
    return (<>
      <DisclaimerCard title={title} shortMessage={shortMessage} iconName={iconName} iconColor={finalIconColor} backgroundColor={finalBackgroundColor} onPress={handleOpenModal}/>

      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleCloseModal}>
        <DisclaimerModal visible={modalVisible} title={title} content={content} onClose={handleCloseModal}/>
      </Modal>
    </>);
};
//# sourceMappingURL=DisclaimerSetting.js.map