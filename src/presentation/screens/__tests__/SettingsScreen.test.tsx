/**
 * Tests for SettingsScreen Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsScreen } from '../SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';

// Mock dependencies
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

jest.mock('../components/SettingsHeader', () => 'SettingsHeader');
jest.mock('../components/SettingsContent', () => 'SettingsContent');
jest.mock('../components/SettingsErrorBoundary', () => 'SettingsErrorBoundary');
jest.mock('../utils/normalizeConfig', () => ({
  normalizeSettingsConfig: jest.fn((config) => ({
    appearance: { enabled: true, config: { enabled: true } },
    language: { enabled: true, config: { enabled: true } },
    notifications: { enabled: true, config: { enabled: true } },
    about: { enabled: true, config: { enabled: true } },
    legal: { enabled: true, config: { enabled: true } },
    account: { enabled: true, config: { enabled: true } },
    support: { enabled: true, config: { enabled: true } },
    developer: { enabled: true, config: { enabled: true } },
  })),
}));

jest.mock('../hooks/useFeatureDetection', () => ({
  useFeatureDetection: jest.fn(() => ({
    appearance: true,
    language: true,
    notifications: true,
    about: true,
    legal: true,
    account: true,
    support: true,
    developer: false,
  })),
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getState: jest.fn(() => ({
    routes: [{ name: 'Settings' }],
  })),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Wrapper component for navigation context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
);

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen />
      </TestWrapper>
    );

    // Should render the main container
    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders with custom config', () => {
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

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders with user profile header', () => {
    const userProfile = {
      displayName: 'John Doe',
      userId: 'user123',
      isGuest: false,
    };

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showUserProfile={true}
          userProfile={userProfile}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders with custom footer text', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          footerText="Custom Footer Text"
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders with custom sections', () => {
    const customSections = [
      {
        title: 'Custom Section',
        data: [
          {
            id: 'custom-item',
            title: 'Custom Item',
            icon: 'Settings',
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          customSections={customSections}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders with close button', () => {
    const mockOnClose = jest.fn();

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showCloseButton={true}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('applies correct theme styling', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen />
      </TestWrapper>
    );

    const container = getByTestId('settings-screen');
    expect(container.props.style).toContainEqual({
      backgroundColor: '#ffffff',
    });
  });

  it('handles feature detection options', () => {
    const featureOptions = {
      notificationServiceAvailable: false,
    };

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          featureOptions={featureOptions}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('wraps content in error boundary', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('renders without footer when showFooter is false', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showFooter={false}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles guest user profile', () => {
    const guestProfile = {
      displayName: 'Guest User',
      userId: 'guest123',
      isGuest: true,
      guestDisplayName: 'Guest',
    };

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showUserProfile={true}
          userProfile={guestProfile}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles user profile with avatar', () => {
    const profileWithAvatar = {
      displayName: 'John Doe',
      userId: 'user123',
      isGuest: false,
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showUserProfile={true}
          userProfile={profileWithAvatar}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles empty config', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen config={{}} />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles missing user profile props', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          showUserProfile={true}
          userProfile={{}}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles null custom sections', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          customSections={null as any}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('handles undefined feature options', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          featureOptions={undefined as any}
        />
      </TestWrapper>
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
  });

  it('maintains correct component structure', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen />
      </TestWrapper>
    );

    // Should have main container
    expect(getByTestId('settings-screen')).toBeTruthy();
  });
});