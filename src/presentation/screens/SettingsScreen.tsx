/**
 * Settings Screen
 *
 * Modern settings with Paper List.Section pattern:
 * - React Native Paper List.Section + List.Subheader
 * - Organized sections (Appearance, General, About & Legal)
 * - Paper Divider for visual separation
 * - Material Design 3 compliance
 * - OFFLINE MODE: No account, premium, feedback, or donation
 * - Optimized spacing for better visual density
 */

import React from 'react';
import { List, Divider } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@umituz/react-native-design-system-theme';
import { ScreenLayout } from '@umituz/react-native-design-system';
import { SettingItem } from '../components/SettingItem';
import { getLanguageByCode, useLocalization } from '@umituz/react-native-localization';
import { notificationService } from '@umituz/react-native-notifications';
import { useTranslation } from 'react-i18next';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, themeMode } = useTheme();
  const { currentLanguage } = useLocalization();
  const { t } = useTranslation();

  const currentLang = getLanguageByCode(currentLanguage);
  const languageDisplay = currentLang ? `${currentLang.flag} ${currentLang.nativeName}` : 'English';
  const themeDisplay = themeMode === 'dark' ? t('settings.darkMode') : t('settings.lightMode');

  const handleAppearancePress = () => {
    navigation.navigate('Appearance' as never);
  };

  const handleAboutPress = () => {
    navigation.navigate('About' as never);
  };

  const handleLegalPress = () => {
    navigation.navigate('Legal' as never);
  };

  const handleNotificationsPress = async () => {
    const hasPermissions = await notificationService.hasPermissions();
    if (!hasPermissions) {
      await notificationService.requestPermissions();
    }
    navigation.navigate('Notifications' as never);
  };

  return (
    <ScreenLayout testID="settings-screen" hideScrollIndicator>
      {/* Appearance Section */}
      <List.Section style={{ marginBottom: 8 }}>
        <List.Subheader style={{ color: theme.colors.textSecondary }}>{t('settings.sections.appearance')}</List.Subheader>
        <SettingItem
          icon="Palette"
          iconGradient={theme.colors.settingGradients.themeLight as unknown as string[]}
          title={t('settings.appearance.title')}
          description={t('settings.appearance.themeDescription')}
          onPress={handleAppearancePress}
          testID="appearance-button"
        />
      </List.Section>

      {/* General Section */}
      <List.Section style={{ marginBottom: 8 }}>
        <List.Subheader style={{ color: theme.colors.textSecondary }}>{t('settings.sections.general')}</List.Subheader>
        <SettingItem
          icon="Bell"
          iconGradient={theme.colors.settingGradients.notifications as unknown as string[]}
          title={t('settings.notifications.title')}
          description={t('settings.notifications.description')}
          onPress={handleNotificationsPress}
          testID="notifications-button"
        />
      </List.Section>

      {/* About & Legal Section */}
      <List.Section style={{ marginBottom: 8 }}>
        <List.Subheader style={{ color: theme.colors.textSecondary }}>{t('settings.sections.about')}</List.Subheader>
        <SettingItem
          icon="Info"
          iconGradient={theme.colors.settingGradients.info as unknown as string[]}
          title={t('settings.about.title')}
          description={t('settings.about.description')}
          onPress={handleAboutPress}
          testID="about-button"
        />
        <Divider />
        <SettingItem
          icon="FileText"
          iconGradient={theme.colors.settingGradients.info as unknown as string[]}
          title={t('settings.legal.title')}
          description={t('settings.legal.description')}
          onPress={handleLegalPress}
          testID="legal-button"
        />
      </List.Section>
    </ScreenLayout>
  );
};

