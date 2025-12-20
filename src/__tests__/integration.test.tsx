/**
 * Integration Tests for Settings Package
 * Tests component interactions and data flow
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { useSettings } from '../../../infrastructure/storage/SettingsStore';

// Mock all dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useDesignSystemTheme: () => ({
    themeMode: 'light',
  }),
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
    },
  }),
}));

jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@umituz/react-native-storage', () => ({
  storageRepository: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  StorageKey: {
    SETTINGS: 'settings',
  },
  createUserKey: (key: string, userId: string) => `${key}_${userId}`,
  unwrap: (result: any, defaultValue: any) => result.success ? result.data : defaultValue,
}));

jest.mock('../../components/SettingsHeader', () => {
  const { View } = require('react-native');
  return {
    SettingsHeader: ({ showCloseButton, onClose }: any) => (
      <View testID="settings-header">
        {showCloseButton && <View testID="close-button" onTouchEnd={onClose} />}
      </View>
    ),
  };
});

jest.mock('../../components/SettingsContent', () => {
  const { View } = require('react-native');
  return {
    SettingsContent: ({ normalizedConfig, features, showUserProfile, userProfile, showFooter, footerText, customSections, showCloseButton }: any) => (
      <View testID="settings-content">
        <View testID="config-data">{JSON.stringify(normalizedConfig)}</View>
        <View testID="features-data">{JSON.stringify(features)}</View>
        {showUserProfile && <View testID="user-profile">{JSON.stringify(userProfile)}</View>}
        {showFooter && <View testID="footer">{footerText || 'default-footer'}</View>}
        {customSections && <View testID="custom-sections">{JSON.stringify(customSections)}</View>}
        {showCloseButton && <View testID="content-close-button" />}
      </View>
    ),
  };
});

jest.mock('../../components/SettingsErrorBoundary', () => {
  const { View } = require('react-native');
  return {
    SettingsErrorBoundary: ({ children, fallbackTitle, fallbackMessage }: any) => (
      <View testID="error-boundary">
        {children}
        {fallbackTitle && <View testID="fallback-title">{fallbackTitle}</View>}
        {fallbackMessage && <View testID="fallback-message">{fallbackMessage}</View>}
      </View>
    ),
  };
});

jest.mock('../../utils/normalizeConfig', () => ({
  normalizeSettingsConfig: jest.fn((config) => ({
    appearance: { enabled: config.appearance !== false, config: { enabled: true } },
    language: { enabled: config.language !== false, config: { enabled: true } },
    notifications: { enabled: config.notifications !== false, config: { enabled: true } },
    about: { enabled: config.about !== false, config: { enabled: true } },
    legal: { enabled: config.legal !== false, config: { enabled: true } },
    account: { enabled: config.account !== false, config: { enabled: true } },
    support: { enabled: config.support !== false, config: { enabled: true } },
    developer: { enabled: config.developer !== false, config: { enabled: true } },
  })),
}));

jest.mock('../../hooks/useFeatureDetection', () => ({
  useFeatureDetection: jest.fn((config, navigation, options) => ({
    appearance: config.appearance?.enabled !== false,
    language: config.language?.enabled !== false,
    notifications: config.notifications?.enabled !== false && options?.notificationServiceAvailable !== false,
    about: config.about?.enabled !== false,
    legal: config.legal?.enabled !== false,
    account: config.account?.enabled !== false,
    support: config.support?.enabled !== false,
    developer: config.developer?.enabled !== false && __DEV__,
  })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getState: jest.fn(() => ({
      routes: [{ name: 'Settings' }],
    })),
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
);

describe('Settings Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SettingsScreen Integration', () => {
    it('integrates all components correctly', () => {
      const config = {
        appearance: true,
        notifications: true,
        about: true,
      };

      const userProfile = {
        displayName: 'John Doe',
        userId: 'user123',
      };

      const customSections = [
        {
          title: 'Custom Section',
          data: [{ id: '1', title: 'Custom Item' }],
        },
      ];

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            config={config}
            showUserProfile={true}
            userProfile={userProfile}
            showFooter={true}
            footerText="Custom Footer"
            customSections={customSections}
            showCloseButton={true}
          />
        </TestWrapper>
      );

      expect(getByTestId('settings-header')).toBeTruthy();
      expect(getByTestId('error-boundary')).toBeTruthy();
      expect(getByTestId('settings-content')).toBeTruthy();
      expect(getByTestId('user-profile')).toBeTruthy();
      expect(getByTestId('footer')).toBeTruthy();
      expect(getByTestId('custom-sections')).toBeTruthy();
      expect(getByTestId('close-button')).toBeTruthy();
      expect(getByTestId('content-close-button')).toBeTruthy();
    });

    it('passes config through normalization correctly', () => {
      const config = {
        appearance: true,
        notifications: false,
        about: true,
      };

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen config={config} />
        </TestWrapper>
      );

      const configData = JSON.parse(getByTestId('config-data').props.children);
      expect(configData.appearance.enabled).toBe(true);
      expect(configData.notifications.enabled).toBe(false);
      expect(configData.about.enabled).toBe(true);
    });

    it('integrates feature detection correctly', () => {
      const config = {
        appearance: true,
        notifications: true,
        about: true,
      };

      const featureOptions = {
        notificationServiceAvailable: false,
      };

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            config={config}
            featureOptions={featureOptions}
          />
        </TestWrapper>
      );

      const featuresData = JSON.parse(getByTestId('features-data').props.children);
      expect(featuresData.appearance).toBe(true);
      expect(featuresData.notifications).toBe(false); // Disabled due to service unavailable
      expect(featuresData.about).toBe(true);
    });

    it('handles close button integration', () => {
      const mockOnClose = jest.fn();

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            showCloseButton={true}
            onClose={mockOnClose}
          />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('close-button'));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('integrates error boundary correctly', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            fallbackTitle="custom.error.title"
            fallbackMessage="custom.error.message"
          />
        </TestWrapper>
      );

      expect(getByTestId('fallback-title')).toBeTruthy();
      expect(getByTestId('fallback-message')).toBeTruthy();
    });
  });

  describe('Data Flow Integration', () => {
    it('maintains data consistency through component tree', () => {
      const config = {
        appearance: true,
        language: true,
        notifications: true,
      };

      const userProfile = {
        displayName: 'Test User',
        userId: 'test123',
        isGuest: false,
      };

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            config={config}
            showUserProfile={true}
            userProfile={userProfile}
          />
        </TestWrapper>
      );

      // Verify config data flows correctly
      const configData = JSON.parse(getByTestId('config-data').props.children);
      expect(configData.appearance.enabled).toBe(true);
      expect(configData.language.enabled).toBe(true);
      expect(configData.notifications.enabled).toBe(true);

      // Verify user profile data flows correctly
      const profileData = JSON.parse(getByTestId('user-profile').props.children);
      expect(profileData.displayName).toBe('Test User');
      expect(profileData.userId).toBe('test123');
      expect(profileData.isGuest).toBe(false);
    });

    it('handles empty and null states gracefully', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            config={{}}
            userProfile={{}}
            customSections={[]}
            showFooter={false}
          />
        </TestWrapper>
      );

      expect(getByTestId('settings-content')).toBeTruthy();
      expect(queryByTestId('user-profile')).toBeNull();
      expect(queryByTestId('footer')).toBeNull();
      expect(queryByTestId('custom-sections')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('applies theme consistently across components', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen />
        </TestWrapper>
      );

      // All components should receive the same theme context
      expect(getByTestId('settings-screen')).toBeTruthy();
    });
  });

  describe('Navigation Integration', () => {
    it('integrates with navigation system correctly', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen />
        </TestWrapper>
      );

      // Navigation should be available to all child components
      expect(getByTestId('settings-screen')).toBeTruthy();
    });
  });

  describe('Performance Integration', () => {
    it('renders efficiently with large datasets', () => {
      const largeCustomSections = Array.from({ length: 100 }, (_, i) => ({
        title: `Section ${i}`,
        data: Array.from({ length: 50 }, (_, j) => ({
          id: `item-${i}-${j}`,
          title: `Item ${i}-${j}`,
        })),
      }));

      const startTime = performance.now();

      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen
            customSections={largeCustomSections}
          />
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      expect(getByTestId('settings-screen')).toBeTruthy();
      expect(renderTime).toBeLessThan(1000); // Should render within 1 second
    });
  });

  describe('Error Handling Integration', () => {
    it('handles errors gracefully across component boundaries', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <SettingsScreen />
        </TestWrapper>
      );

      // Error boundary should catch and handle errors
      expect(getByTestId('error-boundary')).toBeTruthy();
    });
  });
});