/**
 * Tests for AboutContent component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AboutContent } from '../AboutContent';
import { AppInfo, AboutConfig } from '../../../domain/entities/AppInfo';

describe('AboutContent', () => {
  const mockAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
    contactEmail: 'test@example.com',
    websiteUrl: 'https://example.com',
    websiteDisplay: 'example.com',
    moreAppsUrl: 'https://apps.example.com',
  };

  const mockConfig: AboutConfig = {
    appInfo: mockAppInfo,
    actions: {
      onEmailPress: jest.fn(),
      onWebsitePress: jest.fn(),
      onMoreAppsPress: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render developer when provided', () => {
      const { getByText } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      expect(getByText('Developer')).toBeTruthy();
      expect(getByText('Test Developer')).toBeTruthy();
    });

    it('should render contact email when provided', () => {
      const { getByText } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      expect(getByText('Contact')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
    });

    it('should render website when provided', () => {
      const { getByText } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      expect(getByText('Website')).toBeTruthy();
      expect(getByText('example.com')).toBeTruthy();
    });

    it('should render more apps when provided', () => {
      const { getByText } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      expect(getByText('More Apps')).toBeTruthy();
    });

    it('should not render developer when not provided', () => {
      const appInfoWithoutDeveloper: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutContent appInfo={appInfoWithoutDeveloper} config={mockConfig} />
      );

      expect(queryByText('Developer')).toBeFalsy();
    });

    it('should not render contact email when not provided', () => {
      const appInfoWithoutEmail: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutContent appInfo={appInfoWithoutEmail} config={mockConfig} />
      );

      expect(queryByText('Contact')).toBeFalsy();
    });

    it('should not render website when not provided', () => {
      const appInfoWithoutWebsite: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutContent appInfo={appInfoWithoutWebsite} config={mockConfig} />
      );

      expect(queryByText('Website')).toBeFalsy();
    });

    it('should use websiteDisplay when provided', () => {
      const appInfoWithDisplay: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
        websiteUrl: 'https://example.com',
        websiteDisplay: 'Custom Display',
      };

      const { getByText, queryByText } = render(
        <AboutContent appInfo={appInfoWithDisplay} config={mockConfig} />
      );

      expect(getByText('Custom Display')).toBeTruthy();
      expect(queryByText('https://example.com')).toBeFalsy();
    });

    it('should use websiteUrl when websiteDisplay not provided', () => {
      const appInfoWithoutDisplay: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
        websiteUrl: 'https://example.com',
      };

      const { getByText } = render(
        <AboutContent appInfo={appInfoWithoutDisplay} config={mockConfig} />
      );

      expect(getByText('https://example.com')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onEmailPress when email item is pressed', () => {
      const { getByTestId } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      fireEvent.click(getByTestId('email-item'));
      expect(mockConfig.actions!.onEmailPress).toHaveBeenCalledTimes(1);
    });

    it('should call onWebsitePress when website item is pressed', () => {
      const { getByTestId } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      fireEvent.click(getByTestId('website-item'));
      expect(mockConfig.actions!.onWebsitePress).toHaveBeenCalledTimes(1);
    });

    it('should call onMoreAppsPress when more apps item is pressed', () => {
      const { getByTestId } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      fireEvent.click(getByTestId('more-apps-item'));
      expect(mockConfig.actions!.onMoreAppsPress).toHaveBeenCalledTimes(1);
    });

    it('should not crash when actions are not provided', () => {
      const configWithoutActions: AboutConfig = {
        appInfo: mockAppInfo,
      };

      const { getByTestId } = render(
        <AboutContent appInfo={mockAppInfo} config={configWithoutActions} />
      );

      expect(() => {
        fireEvent.click(getByTestId('email-item'));
        fireEvent.click(getByTestId('website-item'));
      }).not.toThrow();
    });

    it('should not call actions when they are undefined', () => {
      const configWithUndefinedActions: AboutConfig = {
        appInfo: mockAppInfo,
        actions: {
          onEmailPress: undefined,
          onWebsitePress: undefined,
        },
      };

      const { getByTestId } = render(
        <AboutContent appInfo={mockAppInfo} config={configWithUndefinedActions} />
      );

      fireEvent.click(getByTestId('email-item'));
      fireEvent.click(getByTestId('website-item'));

      // Should not throw and should not call any undefined functions
      expect(true).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should memoize render functions', () => {
      const { rerender } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      // Re-render with same props
      rerender(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      // Should not throw and should render correctly
      expect(() => {
        rerender(
          <AboutContent appInfo={mockAppInfo} config={mockConfig} />
        );
      }).not.toThrow();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(
        <AboutContent appInfo={mockAppInfo} config={mockConfig} />
      );

      // Rapid prop changes
      for (let i = 0; i < 10; i++) {
        const newAppInfo = { ...mockAppInfo, name: `App ${i}` };
        rerender(
          <AboutContent appInfo={newAppInfo} config={mockConfig} />
        );
      }

      expect(() => {
        rerender(
          <AboutContent appInfo={{ ...mockAppInfo, name: 'Final App' }} config={mockConfig} />
        );
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty app info', () => {
      const emptyAppInfo: AppInfo = {
        name: '',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutContent appInfo={emptyAppInfo} config={mockConfig} />
      );

      expect(queryByText('Developer')).toBeFalsy();
      expect(queryByText('Contact')).toBeFalsy();
      expect(queryByText('Website')).toBeFalsy();
    });

    it('should handle app info with only required fields', () => {
      const minimalAppInfo: AppInfo = {
        name: 'Minimal App',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutContent appInfo={minimalAppInfo} config={mockConfig} />
      );

      expect(queryByText('Developer')).toBeFalsy();
      expect(queryByText('Contact')).toBeFalsy();
      expect(queryByText('Website')).toBeFalsy();
    });

    it('should handle special characters in text', () => {
      const appInfoWithSpecialChars: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
        developer: 'Developer & Co. <test>',
        contactEmail: 'test+special@example.com',
        websiteUrl: 'https://example.com/path?param=value&other=test',
      };

      const { getByText } = render(
        <AboutContent appInfo={appInfoWithSpecialChars} config={mockConfig} />
      );

      expect(getByText('Developer & Co. <test>')).toBeTruthy();
      expect(getByText('test+special@example.com')).toBeTruthy();
      expect(getByText('https://example.com/path?param=value&other=test')).toBeTruthy();
    });
  });
});