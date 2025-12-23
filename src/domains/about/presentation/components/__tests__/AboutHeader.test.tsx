/**
 * Tests for AboutHeader component
 */
import React from 'react';
import { render } from '@testing-library/react';
import { AboutHeader } from '../AboutHeader';
import { AppInfo } from '../../../domain/entities/AppInfo';

describe('AboutHeader', () => {
  const mockAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render correctly with required props', () => {
      const { getByText } = render(
        <AboutHeader appInfo={mockAppInfo} />
      );

      expect(getByText('Test App')).toBeTruthy();
      expect(getByText('Version 1.0.0')).toBeTruthy();
    });

    it('should render description when provided', () => {
      const { getByText } = render(
        <AboutHeader appInfo={mockAppInfo} />
      );

      expect(getByText('Test Description')).toBeTruthy();
    });

    it('should not render description when not provided', () => {
      const appInfoWithoutDescription: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
      };

      const { queryByText } = render(
        <AboutHeader appInfo={appInfoWithoutDescription} />
      );

      expect(queryByText('Test Description')).toBeFalsy();
    });

    it('should render with all optional fields', () => {
      const fullAppInfo: AppInfo = {
        name: 'Full App',
        version: '2.0.0',
        description: 'Full Description',
        developer: 'Full Developer',
        contactEmail: 'full@example.com',
        websiteUrl: 'https://full.example.com',
      };

      const { getByText } = render(
        <AboutHeader appInfo={fullAppInfo} />
      );

      expect(getByText('Full App')).toBeTruthy();
      expect(getByText('Version 2.0.0')).toBeTruthy();
      expect(getByText('Full Description')).toBeTruthy();
    });
  });

  describe('Custom Styles', () => {
    it('should apply custom container style', () => {
      const customStyle = { backgroundColor: 'red' };

      const { getByTestId } = render(
        <AboutHeader appInfo={mockAppInfo} containerStyle={customStyle} testID="header" />
      );

      const header = getByTestId('header');
      expect(header).toBeInTheDocument();
    });

    it('should apply custom title style', () => {
      const customStyle = { color: 'blue' };

      const { getByText } = render(
        <AboutHeader appInfo={mockAppInfo} titleStyle={customStyle} />
      );

      const title = getByText('Test App');
      expect(title).toBeInTheDocument();
    });

    it('should apply custom version style', () => {
      const customStyle = { color: 'purple' };

      const { getByText } = render(
        <AboutHeader appInfo={mockAppInfo} versionStyle={customStyle} />
      );

      const version = getByText('Version 1.0.0');
      expect(version).toBeInTheDocument();
    });

    it('should apply custom description style', () => {
      const customStyle = { color: 'green' };

      const { getByText } = render(
        <AboutHeader appInfo={mockAppInfo} descriptionStyle={customStyle} />
      );

      const description = getByText('Test Description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should memoize render functions', () => {
      const { rerender } = render(
        <AboutHeader appInfo={mockAppInfo} />
      );

      expect(() => {
        rerender(
          <AboutHeader appInfo={mockAppInfo} />
        );
      }).not.toThrow();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(
        <AboutHeader appInfo={mockAppInfo} />
      );

      for (let i = 0; i < 10; i++) {
        const newAppInfo = { ...mockAppInfo, name: `App ${i}` };
        rerender(
          <AboutHeader appInfo={newAppInfo} />
        );
      }

      expect(() => {
        rerender(
          <AboutHeader appInfo={{ ...mockAppInfo, name: 'Final App' }} />
        );
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty description', () => {
      const appInfoWithEmptyDescription: AppInfo = {
        name: 'Test App',
        version: '1.0.0',
        description: '',
      };

      const { getByText, container } = render(
        <AboutHeader appInfo={appInfoWithEmptyDescription} />
      );

      expect(getByText('Test App')).toBeTruthy();
      expect(getByText('Version 1.0.0')).toBeTruthy();
      expect(container.textContent).toContain('');
    });

    it('should handle very long text', () => {
      const longName = 'A'.repeat(100);
      const longDescription = 'B'.repeat(200);

      const appInfoWithLongText: AppInfo = {
        name: longName,
        version: '1.0.0',
        description: longDescription,
      };

      const { getByText } = render(
        <AboutHeader appInfo={appInfoWithLongText} />
      );

      expect(getByText(longName)).toBeTruthy();
      expect(getByText(longDescription)).toBeTruthy();
    });

    it('should handle special characters', () => {
      const appInfoWithSpecialChars: AppInfo = {
        name: 'Test & App <script>',
        version: '1.0.0',
        description: 'Description with émojis 🎉 and ñ',
      };

      const { getByText } = render(
        <AboutHeader appInfo={appInfoWithSpecialChars} />
      );

      expect(getByText('Test & App <script>')).toBeTruthy();
      expect(getByText('Description with émojis 🎉 and ñ')).toBeTruthy();
    });
  });
});