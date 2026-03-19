/**
 * DisclaimerSetting Component
 *
 * Displays customizable disclaimer with important legal notice
 * Used in About screens for apps that require disclaimers
 *
 * Features:
 * - Tappable card that opens full disclaimer screen
 * - Warning icon with background color
 * - Internationalized title and message
 * - NO shadows (CLAUDE.md compliance)
 * - Universal across iOS, Android, Web (NO Platform.OS checks)
 *
 * Usage:
 * - Import and use in AboutScreen
 * - Requires translations: settings.disclaimer.title, settings.disclaimer.message, settings.disclaimer.shortMessage
 */

import React, { useCallback } from 'react';

import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system/theme';
import { useAppNavigation } from '@umituz/react-native-design-system/molecules';
import { DisclaimerCard } from './DisclaimerCard';

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
  const navigation = useAppNavigation();

  const finalIconColor = iconColor || tokens.colors.warning;
  const finalBackgroundColor = backgroundColor || withAlpha(finalIconColor, 0.1);

  const handleOpenDisclaimer = useCallback(() => {
    navigation.push('Disclaimer' as never, {
      title,
      content,
    });
  }, [navigation, title, content]);

  return (
    <DisclaimerCard
      title={title}
      shortMessage={shortMessage}
      iconName={iconName}
      iconColor={finalIconColor}
      backgroundColor={finalBackgroundColor}
      onPress={handleOpenDisclaimer}
    />
  );
};

