/**
 * Integration tests for the entire About package
 */
import '../types/global.d.ts';
import './types.d.ts';
import React from 'react';
import { View, Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { AboutScreen } from '../presentation/screens/AboutScreen';
import { AboutConfig } from '../domain/entities/AppInfo';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('About Package Integration', () => {
  const fullConfig: AboutConfig = {
    appInfo: {
      name: 'Integration Test App',
      version: '2.0.0',
      description: 'This is an integration test app',
      developer: 'Test Developer',
      contactEmail: 'integration@test.com',
      websiteUrl: 'https://integration.example.com',
      websiteDisplay: 'integration.example.com',
      moreAppsUrl: 'https://apps.integration.example.com',
    },
    theme: {
      primary: '#FF0000',
      secondary: '#00FF00',
      background: '#0000FF',
      text: '#FFFFFF',
      border: '#CCCCCC',
    },
    style: {
      containerStyle: { backgroundColor: '#f0f0f0' },
      itemStyle: { padding: 20 },
      textStyle: { fontSize: 18 },
      iconStyle: { color: '#333333' },
    },
    actions: {
      onWebsitePress: jest.fn(),
      onEmailPress: jest.fn(),
      onMoreAppsPress: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
  });

  describe('Complete Flow', () => {
    it('should render complete about screen with all features', async () => {
      const { getByText, queryByText } = render(
        <AboutScreen config={fullConfig} />
      );

      // Should show loading initially
      expect(getByText((content) => content.includes('Loading'))).toBeTruthy();

      // Wait for content to load
      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Check header content
      expect(getByText('Integration Test App')).toBeTruthy();
      expect(getByText('Version 2.0.0')).toBeTruthy();
      expect(getByText('This is an integration test app')).toBeTruthy();

      // Check content items
      expect(getByText('Developer')).toBeTruthy();
      expect(getByText('Test Developer')).toBeTruthy();
      expect(getByText('Contact')).toBeTruthy();
      expect(getByText('integration@test.com')).toBeTruthy();
      expect(getByText('Website')).toBeTruthy();
      expect(getByText('integration.example.com')).toBeTruthy();
      expect(getByText('More Apps')).toBeTruthy();
    });

    it('should handle all user interactions', async () => {
      const { getByTestId } = render(
        <AboutScreen config={fullConfig} />
      );

      // Wait for content to load
      await waitFor(() => {
        expect(getByTestId('email-item')).toBeTruthy();
      });

      // Test all interactions
      fireEvent.click(getByTestId('email-item'));
      fireEvent.click(getByTestId('website-item'));
      fireEvent.click(getByTestId('more-apps-item'));

      // Verify all actions were called
      expect(fullConfig.actions!.onEmailPress).toHaveBeenCalledTimes(1);
      expect(fullConfig.actions!.onWebsitePress).toHaveBeenCalledTimes(1);
      expect(fullConfig.actions!.onMoreAppsPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Minimal Configuration', () => {
    it('should work with minimal config', async () => {
      const minimalConfig: AboutConfig = {
        appInfo: {
          name: 'Minimal App',
          version: '1.0.0',
        },
      };

      const { getByText, queryByText } = render(
        <AboutScreen config={minimalConfig} />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Should show basic info
      expect(getByText('Minimal App')).toBeTruthy();
      expect(getByText('Version 1.0.0')).toBeTruthy();

      // Should not show optional items
      expect(queryByText('Developer')).toBeFalsy();
      expect(queryByText('Contact')).toBeFalsy();
      expect(queryByText('Website')).toBeFalsy();
    });
  });

  describe('Custom Components', () => {
    it('should render custom header and footer', async () => {
      const CustomHeader = () => <View testID="custom-header"><Text>Custom Header</Text></View>;
      const CustomFooter = () => <View testID="custom-footer"><Text>Custom Footer</Text></View>;

      const { getByTestId, queryByText } = render(
        <AboutScreen
          config={fullConfig}
          headerComponent={<CustomHeader />}
          footerComponent={<CustomFooter />}
          showHeader={false}
        />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Should show custom components
      expect(getByTestId('custom-header')).toBeTruthy();
      expect(getByTestId('custom-footer')).toBeTruthy();

      // Should not show default header
      expect(queryByText('Integration Test App')).toBeFalsy();
      expect(queryByText('Version 2.0.0')).toBeFalsy();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid config gracefully', async () => {
      const { queryByText, getByText } = render(
        <AboutScreen config={null as unknown} />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      expect(getByText('No app information available')).toBeTruthy();
    });

    it('should handle missing actions gracefully', async () => {
      const configWithoutActions: AboutConfig = {
        appInfo: fullConfig.appInfo,
      };

      const { getByTestId } = render(
        <AboutScreen config={configWithoutActions} />
      );

      await waitFor(() => {
        expect(getByTestId('email-item')).toBeTruthy();
      });

      // Should not crash when pressing items without actions
      expect(() => {
        fireEvent.click(getByTestId('email-item'));
        fireEvent.click(getByTestId('website-item'));
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle rapid re-renders', async () => {
      const { rerender, getByText, queryByText } = render(
        <AboutScreen config={fullConfig} />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Rapid re-renders with different configs
      for (let i = 0; i < 5; i++) {
        const newConfig = {
          ...fullConfig,
          appInfo: {
            ...fullConfig.appInfo,
            name: `App ${i}`,
          },
        };

        rerender(<AboutScreen config={newConfig} />);

        await waitFor(() => {
          expect(getByText(`App ${i}`)).toBeTruthy();
        });
      }

      // Should not crash and should show final state
      expect(getByText('App 4')).toBeTruthy();
    });

    it('should handle prop changes efficiently', async () => {
      const { rerender, getByText, queryByText } = render(
        <AboutScreen config={fullConfig} />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Change showHeader prop
      rerender(<AboutScreen config={fullConfig} showHeader={false} />);

      await waitFor(() => {
        expect(queryByText('Integration Test App')).toBeFalsy();
      });

      // Change back
      rerender(<AboutScreen config={fullConfig} showHeader={true} />);

      await waitFor(() => {
        expect(getByText('Integration Test App')).toBeTruthy();
      });
    });
  });

  describe('Memory Management', () => {
    it('should cleanup properly on unmount', async () => {
      const { unmount, queryByText } = render(
        <AboutScreen config={fullConfig} />
      );

      await waitFor(() => {
        expect(queryByText((content) => content.includes('Loading'))).toBeFalsy();
      });

      // Should not throw when unmounting
      expect(() => {
        unmount();
      }).not.toThrow();
    });

    it('should handle unmount during loading', () => {
      const { unmount } = render(
        <AboutScreen config={fullConfig} />
      );

      // Should not throw when unmounting during loading
      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper test IDs', async () => {
      const { getByTestId } = render(
        <AboutScreen config={fullConfig} testID="about-screen" />
      );

      await waitFor(() => {
        expect(getByTestId('about-screen')).toBeTruthy();
      });

      // Check for item test IDs
      expect(getByTestId('developer-item')).toBeTruthy();
      expect(getByTestId('email-item')).toBeTruthy();
      expect(getByTestId('website-item')).toBeTruthy();
      expect(getByTestId('more-apps-item')).toBeTruthy();
    });
  });

  describe('Console Logging', () => {
    it('should log in development mode', async () => {
      const originalDev = global.__DEV__;
      global.__DEV__ = true;

      render(<AboutScreen config={fullConfig} />);

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalled();
      });

      global.__DEV__ = originalDev;
    });

    it('should not log in production mode', async () => {
      const originalDev = global.__DEV__;
      global.__DEV__ = false;

      render(<AboutScreen config={fullConfig} />);

      await waitFor(() => {
        // Wait a bit to ensure no logging
        expect(mockConsoleLog).not.toHaveBeenCalled();
      });

      global.__DEV__ = originalDev;
    });
  });
});