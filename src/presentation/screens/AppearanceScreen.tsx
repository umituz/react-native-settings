/**
 * Appearance Settings Screen
 *
 * Modern appearance settings with Paper List.Section:
 * - React Native Paper List.Section pattern
 * - Lucide icons (Languages, Moon, Sun)
 * - Language + Theme settings combined
 * - Dynamic icon based on theme mode
 * - Material Design 3 compliance
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useTheme, useAppDesignTokens, type DesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicText, ScreenLayout } from '@umituz/react-native-design-system';
import { useLocalization, getLanguageByCode } from '@umituz/react-native-localization';
import { SettingItem } from '../components/SettingItem';

export const AppearanceScreen: React.FC = () => {
  const { t, currentLanguage } = useLocalization();
  const navigation = useNavigation();
  const { themeMode, toggleTheme } = useTheme();
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const currentLang = getLanguageByCode(currentLanguage);
  const languageDisplay = currentLang ? `${currentLang.flag} ${currentLang.nativeName}` : 'English';
  const themeDisplay = themeMode === 'dark' ? t('settings.darkMode') : t('settings.lightMode');

  const handleLanguagePress = () => {
    navigation.navigate('LanguageSelection' as never);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <ScreenLayout testID="appearance-screen" hideScrollIndicator>
      {/* Header */}
      <View style={styles.header}>
        <AtomicText type="headlineLarge" color="primary">
          {t('settings.appearance.title')}
        </AtomicText>
        <AtomicText type="bodyMedium" color="secondary" style={styles.headerSubtitle}>
          {t('settings.appearance.themeDescription')}
        </AtomicText>
      </View>

      {/* Language Section */}
      <List.Section>
        <List.Subheader style={{ color: tokens.colors.textSecondary }}>{t('settings.language')}</List.Subheader>
        <SettingItem
          icon="Languages"
          iconGradient={((tokens.colors as any).settingGradients?.language as unknown as string[]) || [tokens.colors.primary, tokens.colors.secondary]}
          title={t('settings.language')}
          value={languageDisplay}
          onPress={handleLanguagePress}
          testID="language-button"
        />
      </List.Section>

      {/* Theme Section */}
      <List.Section>
        <List.Subheader style={{ color: tokens.colors.textSecondary }}>{t('settings.appearance.darkMode')}</List.Subheader>
        <SettingItem
          icon={themeMode === 'dark' ? 'Moon' : 'Sun'}
          iconGradient={
            themeMode === 'dark'
              ? (((tokens.colors as any).settingGradients?.themeDark as unknown as string[]) || [tokens.colors.primary, tokens.colors.secondary])
              : (((tokens.colors as any).settingGradients?.themeLight as unknown as string[]) || [tokens.colors.secondary, tokens.colors.primary])
          }
          title={t('settings.appearance.darkMode')}
          value={themeDisplay}
          onPress={handleThemeToggle}
          testID="theme-button"
        />
      </List.Section>
    </ScreenLayout>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    header: {
      paddingBottom: tokens.spacing.lg,
      paddingTop: tokens.spacing.md,
    },
    headerSubtitle: {
      marginTop: tokens.spacing.sm,
      lineHeight: 20,
      opacity: 0.8,
    },
  });

