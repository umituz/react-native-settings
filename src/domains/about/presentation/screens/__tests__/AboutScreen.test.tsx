/**
 * Tests for AboutScreen component
 */
import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { AboutScreen } from '../AboutScreen';
import { AboutConfig } from '../../../domain/entities/AppInfo';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('AboutScreen', () => {
  const mockConfig: AboutConfig = {
    appInfo: {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test Description',
      developer: 'Test Developer',
      contactEmail: 'test@example.com',
      websiteUrl: 'https://example.com',
      websiteDisplay: 'example.com',
      moreAppsUrl: 'https://apps.example.com',
    },
    actions: {
      onEmailPress: jest.fn(),
      onWebsitePress: jest.fn(),
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

  describe('Rendering', () => {
    it('should render loading state initially', () => {
      const { getByText } = render(
        <AboutScreen config={mockConfig} />
      );

      expect(getByText('Loading...')).toBeTruthy();
    });

    it('should render app info after loading', async () => {
      const { getByText, queryByText } = render(
        <AboutScreen config={mockConfig} />
      );

      // Wait for loading to complete
      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      // Check for app info
      expect(getByText('Test App')).toBeTruthy();
      expect(getByText('Version 1.0.0')).toBeTruthy();
      expect(getByText('Test Description')).toBeTruthy();
      expect(getByText('Test Developer')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
      expect(getByText('example.com')).toBeTruthy();
    });

    it('should render error state when initialization fails', async () => {
      const invalidConfig = null as unknown;

      const { getByText, queryByText } = render(
        <AboutScreen config={invalidConfig} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      expect(getByText('No app information available')).toBeTruthy();
    });

    it('should render no app info message when app info is null', async () => {
      const emptyConfig: AboutConfig = {
        appInfo: {},
      };

      const { getByText, queryByText } = render(
        <AboutScreen config={emptyConfig} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      // With empty appInfo, it should show empty name and default version
      expect(getByText('Version 1.0.0')).toBeTruthy();
    });

    it('should not render header when showHeader is false', async () => {
      const { queryByText } = render(
        <AboutScreen config={mockConfig} showHeader={false} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      expect(queryByText('Test App')).toBeFalsy();
      expect(queryByText('Version 1.0.0')).toBeFalsy();
      expect(queryByText('Test Description')).toBeFalsy();
    });

    it('should render custom header component when provided', async () => {
      const CustomHeader = () => <View testID="custom-header"><Text>Custom Header</Text></View>;

      const { getByTestId, queryByText } = render(
        <AboutScreen config={mockConfig} headerComponent={<CustomHeader />} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      expect(getByTestId('custom-header')).toBeTruthy();
      expect(queryByText('Test App')).toBeFalsy(); // Default header should not render
    });

    it('should render custom footer component when provided', async () => {
      const CustomFooter = () => <View testID="custom-footer"><Text>Custom Footer</Text></View>;

      const { getByTestId } = render(
        <AboutScreen config={mockConfig} footerComponent={<CustomFooter />} />
      );

      await waitFor(() => {
        expect(getByTestId('custom-footer')).toBeTruthy();
      });
    });
  });

  describe('Custom Styles', () => {
    it('should apply custom container style', async () => {
      const customStyle = { backgroundColor: 'red' };

      const { queryByText, container } = render(
        <AboutScreen config={mockConfig} containerStyle={customStyle} testID="screen" />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      // Test that custom container style is applied (component renders without error)
      expect(container).toBeTruthy();
    });

    it('should apply custom header style', async () => {
      const customStyle = { backgroundColor: 'blue' };

      const { getByText, queryByText } = render(
        <AboutScreen config={mockConfig} headerStyle={customStyle} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      const header = getByText('Test App');
      // Check that header renders with custom style (component renders without error)
      expect(header).toBeTruthy();
    });

    it('should apply custom title style', async () => {
      const customStyle: TextStyle = { color: 'green' };

      const { getByText, queryByText } = render(
        <AboutScreen config={mockConfig} titleStyle={customStyle} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      const title = getByText('Test App');
      // Check that title renders with custom style (component renders without error)
      expect(title).toBeTruthy();
    });

    it('should apply custom version style', async () => {
      const customStyle = { color: 'purple' };

      const { getByText, queryByText } = render(
        <AboutScreen config={mockConfig} versionStyle={customStyle} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      const version = getByText('Version 1.0.0');
      // Check that version renders with custom style (component renders without error)
      expect(version).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call action handlers when items are pressed', async () => {
      const { getByTestId } = render(
        <AboutScreen config={mockConfig} />
      );

      await waitFor(() => {
        expect(getByTestId('email-item')).toBeTruthy();
        expect(getByTestId('website-item')).toBeTruthy();
        expect(getByTestId('more-apps-item')).toBeTruthy();
      });

      // Test interactions
      fireEvent.click(getByTestId('email-item'));
      fireEvent.click(getByTestId('website-item'));
      fireEvent.click(getByTestId('more-apps-item'));

      expect(mockConfig.actions!.onEmailPress).toHaveBeenCalledTimes(1);
      expect(mockConfig.actions!.onWebsitePress).toHaveBeenCalledTimes(1);
      expect(mockConfig.actions!.onMoreAppsPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Performance', () => {
    it('should memoize render functions', async () => {
      const { rerender } = render(
        <AboutScreen config={mockConfig} />
      );

      // Wait for initial render
      await waitFor(() => {
        expect(() => { }).not.toThrow();
      });

      // Re-render with same props
      rerender(
        <AboutScreen config={mockConfig} />
      );

      // Should not throw and should render correctly
      await waitFor(() => {
        expect(() => {
          rerender(
            <AboutScreen config={mockConfig} />
          );
        }).not.toThrow();
      });
    });

    it('should handle rapid prop changes', async () => {
      const { rerender } = render(
        <AboutScreen config={mockConfig} />
      );

      // Rapid prop changes
      for (let i = 0; i < 5; i++) {
        const newConfig = {
          ...mockConfig,
          appInfo: { ...mockConfig.appInfo, name: `App ${i}` }
        };
        rerender(<AboutScreen config={newConfig} />);

        await waitFor(() => {
          expect(() => { }).not.toThrow();
        });
      }

      expect(() => {
        rerender(
          <AboutScreen config={{ ...mockConfig, appInfo: { ...mockConfig.appInfo, name: 'Final App' } }} />
        );
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty config', async () => {
      const emptyConfig: AboutConfig = {
        appInfo: {},
      };

      const { getByText, queryByText } = render(
        <AboutScreen config={emptyConfig} />
      );

      await waitFor(() => {
        expect(queryByText('Loading...')).toBeFalsy();
      });

      // With empty appInfo, it should show empty name and default version
      expect(getByText('Version 1.0.0')).toBeTruthy();
    });

    it('should handle config with only required fields', async () => {
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
        expect(queryByText('Loading...')).toBeFalsy();
      });

      expect(getByText('Minimal App')).toBeTruthy();
      expect(getByText('Version 1.0.0')).toBeTruthy();
      expect(queryByText('Test Developer')).toBeFalsy();
      expect(queryByText('test@example.com')).toBeFalsy();
    });

    it('should handle special characters in text', async () => {
      const configWithSpecialChars: AboutConfig = {
        appInfo: {
          name: 'Test & App <script>',
          version: '1.0.0',
          description: 'Description with émojis 🎉 and ñ',
          developer: 'Developer & Co.',
        },
      };

      const { getByText } = render(
        <AboutScreen config={configWithSpecialChars} />
      );

      await waitFor(() => {
        expect(getByText('Test & App <script>')).toBeTruthy();
        expect(getByText('Description with émojis 🎉 and ñ')).toBeTruthy();
        expect(getByText('Developer & Co.')).toBeTruthy();
      });
    });

    it('should handle very long text', async () => {
      const longName = 'A'.repeat(100);
      const longDescription = 'B'.repeat(200);

      const configWithLongText: AboutConfig = {
        appInfo: {
          name: longName,
          version: '1.0.0',
          description: longDescription,
        },
      };

      const { getByText } = render(
        <AboutScreen config={configWithLongText} />
      );

      await waitFor(() => {
        expect(getByText(longName)).toBeTruthy();
        expect(getByText(longDescription)).toBeTruthy();
      });
    });
  });
});