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
 * - Configurable features via SettingsConfig prop
 */

import React, { useMemo } from 'react';
import { List, Divider } from 'react-native-paper';
import { DeviceEventEmitter, Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme, useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { ScreenLayout, AtomicIcon, AtomicText } from '@umituz/react-native-design-system';
import { SettingItem } from '../components/SettingItem';
import { getLanguageByCode, useLocalization } from '@umituz/react-native-localization';
import { SettingsConfig } from './types';

// Optional notification service - only import if package is available
let notificationService: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  notificationService = require('@umituz/react-native-notifications').notificationService;
} catch {
  // Package not available, notificationService will be null
}

// Optional onboarding store - only import if package is available
let useOnboardingStore: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const onboardingPackage = require('@umituz/react-native-onboarding');
  useOnboardingStore = onboardingPackage.useOnboardingStore;
} catch {
  // Package not available, useOnboardingStore will be null
}

/**
 * Check if a navigation screen exists in the navigation state
 */
const hasNavigationScreen = (navigation: any, screenName: string): boolean => {
  try {
    const state = navigation.getState();
    if (!state) return false;

    // Recursively check all routes in navigation state
    const checkRoutes = (routes: any[]): boolean => {
      if (!routes || !Array.isArray(routes)) return false;
      
      for (const route of routes) {
        if (route.name === screenName) {
          return true;
        }
        // Check nested navigators
        if (route.state?.routes) {
          if (checkRoutes(route.state.routes)) {
            return true;
          }
        }
      }
      return false;
    };

    return checkRoutes(state.routes || []);
  } catch {
    // If we can't check navigation state, assume it's not available
    return false;
  }
};

export interface SettingsScreenProps {
  /**
   * Configuration for which settings features to show
   * @default { appearance: 'auto', notifications: 'auto', about: 'auto', legal: 'auto' }
   */
  config?: SettingsConfig;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  config = {} 
}) => {
  const navigation = useNavigation();
  const { theme, themeMode } = useTheme();
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { currentLanguage, t } = useLocalization();

  const currentLang = getLanguageByCode(currentLanguage);
  const languageDisplay = currentLang ? `${currentLang.flag} ${currentLang.nativeName}` : 'English';
  const themeDisplay = themeMode === 'dark' ? t('settings.darkMode') : t('settings.lightMode');

  // Determine which features should be shown
  const features = useMemo(() => {
    const appearanceConfig = config.appearance ?? 'auto';
    const notificationsConfig = config.notifications ?? 'auto';
    const aboutConfig = config.about ?? 'auto';
    const legalConfig = config.legal ?? 'auto';

    return {
      appearance: appearanceConfig === true || 
        (appearanceConfig === 'auto' && hasNavigationScreen(navigation, 'Appearance')),
      notifications: notificationsConfig === true || 
        (notificationsConfig === 'auto' && 
         notificationService !== null && 
         hasNavigationScreen(navigation, 'Notifications')),
      about: aboutConfig === true || 
        (aboutConfig === 'auto' && hasNavigationScreen(navigation, 'About')),
      legal: legalConfig === true || 
        (legalConfig === 'auto' && hasNavigationScreen(navigation, 'Legal')),
    };
  }, [config, navigation]);

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
    if (notificationService) {
      const hasPermissions = await notificationService.hasPermissions();
      if (!hasPermissions) {
        await notificationService.requestPermissions();
      }
    }
    navigation.navigate('Notifications' as never);
  };

  const handleClose = () => {
    // Try to go back in current navigator first
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    
    // If we can't go back in current navigator, try to find parent navigator
    // This handles the case where Settings is the root screen of a stack
    let parent = navigation.getParent();
    let depth = 0;
    const maxDepth = 5; // Safety limit to prevent infinite loops
    
    // Traverse up the navigation tree to find a navigator that can go back
    while (parent && depth < maxDepth) {
      if (parent.canGoBack()) {
        parent.goBack();
        return;
      }
      parent = parent.getParent();
      depth++;
    }
    
    // If no parent can go back, try using CommonActions to go back
    // This is a fallback for edge cases
    try {
      navigation.dispatch(CommonActions.goBack());
    } catch (error) {
      // If all else fails, silently fail (close button just won't work)
      /* eslint-disable-next-line no-console */
      if (__DEV__) {
        console.warn('[SettingsScreen] Could not navigate back:', error);
      }
    }
  };

  const handleShowOnboarding = async () => {
    if (!useOnboardingStore) {
      Alert.alert('Error', 'Onboarding package is not available');
      return;
    }

    try {
      const onboardingStore = useOnboardingStore.getState();
      // Reset onboarding state
      await onboardingStore.reset();
      // Emit event to trigger navigation to onboarding
      DeviceEventEmitter.emit('reset-onboarding');
      // Close settings first - try parent navigator if current can't go back
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        // Try to find parent navigator that can go back
        let parent = navigation.getParent();
        let depth = 0;
        const maxDepth = 5;
        
        while (parent && depth < maxDepth) {
          if (parent.canGoBack()) {
            parent.goBack();
            break;
          }
          parent = parent.getParent();
          depth++;
        }
        
        // Fallback to CommonActions
        if (!parent || depth >= maxDepth) {
          try {
            navigation.dispatch(CommonActions.goBack());
          } catch (error) {
            /* eslint-disable-next-line no-console */
            if (__DEV__) {
              console.warn('[SettingsScreen] Could not navigate back:', error);
            }
          }
        }
      }
      // Small delay to ensure navigation completes
      setTimeout(() => {
        DeviceEventEmitter.emit('show-onboarding');
      }, 100);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to show onboarding. Please try again.',
        [{ text: 'OK' }],
      );
    }
  };

  // Debug: Log features to help diagnose empty screen issues
  /* eslint-disable-next-line no-console */
  if (__DEV__) {
    console.log('[SettingsScreen] Features:', features);
    console.log('[SettingsScreen] Config:', config);
    console.log('[SettingsScreen] Navigation state:', navigation.getState());
  }

  // Check if any features are enabled
  const hasAnyFeatures = features.appearance || features.notifications || features.about || features.legal;

  return (
    <ScreenLayout testID="settings-screen" hideScrollIndicator>
      {/* Header with Close Button */}
      <View style={[
        styles.header, 
        { 
          borderBottomColor: theme.colors.borderLight,
          backgroundColor: theme.colors.surface,
          paddingTop: insets.top,
        }
      ]}>
        <AtomicText type="headlineLarge" style={{ color: theme.colors.textPrimary, flex: 1 }}>
          {t('navigation.settings') || 'Settings'}
        </AtomicText>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          testID="close-settings-button"
        >
          <AtomicIcon name="X" size="lg" color="textPrimary" />
        </TouchableOpacity>
      </View>

      {/* Appearance Section */}
      {features.appearance && (
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
      )}

      {/* General Section - Notifications */}
      {features.notifications && (
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
      )}

      {/* Development/Test: Show Onboarding */}
      {__DEV__ && useOnboardingStore && (
        <List.Section style={{ marginBottom: 8 }}>
          <List.Subheader style={{ color: theme.colors.textSecondary }}>Development</List.Subheader>
          <SettingItem
            icon="Play"
            iconGradient={theme.colors.settingGradients.info as unknown as string[]}
            title="Show Onboarding (Dev)"
            description="Navigate to onboarding screen"
            onPress={handleShowOnboarding}
            testID="show-onboarding-button"
          />
        </List.Section>
      )}

      {/* About & Legal Section */}
      {(features.about || features.legal) && (
        <List.Section style={{ marginBottom: 8 }}>
          <List.Subheader style={{ color: theme.colors.textSecondary }}>{t('settings.sections.about')}</List.Subheader>
          {features.about && (
            <SettingItem
              icon="Info"
              iconGradient={theme.colors.settingGradients.info as unknown as string[]}
              title={t('settings.about.title')}
              description={t('settings.about.description')}
              onPress={handleAboutPress}
              testID="about-button"
            />
          )}
          {features.about && features.legal && <Divider />}
          {features.legal && (
            <SettingItem
              icon="FileText"
              iconGradient={theme.colors.settingGradients.info as unknown as string[]}
              title={t('settings.legal.title')}
              description={t('settings.legal.description')}
              onPress={handleLegalPress}
              testID="legal-button"
            />
          )}
        </List.Section>
      )}

      {/* Fallback: Show message if no features are enabled */}
      {!hasAnyFeatures && (
        <List.Section>
          <List.Subheader style={{ color: theme.colors.textSecondary }}>
            {t('settings.noOptionsAvailable') || 'No settings available'}
          </List.Subheader>
        </List.Section>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 12,
    borderBottomWidth: 1,
    zIndex: 1000,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
});

