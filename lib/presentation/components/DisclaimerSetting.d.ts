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
import React from 'react';
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
export declare const DisclaimerSetting: React.FC<DisclaimerSettingProps>;
//# sourceMappingURL=DisclaimerSetting.d.ts.map