/**
 * Tests for utility functions
 */
import '../../types/global.d.ts';
import { Linking } from 'react-native';
import {
  createDefaultConfig,
  validateConfig,
  mergeConfigs,
  isValidEmail,
  isValidUrl,
  openUrl,
  sendEmail,
} from '../index';

// Mock Linking
jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
}));

// Mock console methods
jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDefaultConfig', () => {
    it('should create default config', () => {
      const config = createDefaultConfig();

      expect(config).toEqual({
        appInfo: {
          name: '',
          version: '1.0.0',
          description: '',
          developer: '',
          contactEmail: '',
          websiteUrl: '',
          websiteDisplay: '',
          moreAppsUrl: '',
          privacyPolicyUrl: '',
          termsOfServiceUrl: '',
        },
        theme: {
          primary: '#007AFF',
          secondary: '#5856D6',
          background: '#FFFFFF',
          text: '#000000',
          border: '#E5E5E5',
        },
        style: {
          containerStyle: {},
          itemStyle: {},
          textStyle: {},
          iconStyle: {},
        },
        actions: {
          onWebsitePress: undefined,
          onEmailPress: undefined,
          onPrivacyPress: undefined,
          onTermsPress: undefined,
          onMoreAppsPress: undefined,
        },
      });
    });

    it('should merge with overrides', () => {
      const overrides = {
        appInfo: {
          name: 'Test App',
          version: '2.0.0',
        },
        theme: {
          primary: '#FF0000',
        },
      };

      const config = createDefaultConfig(overrides);

      expect(config.appInfo.name).toBe('Test App');
      expect(config.appInfo.version).toBe('2.0.0');
      expect(config.appInfo.description).toBe(''); // Should keep default
      expect(config.theme.primary).toBe('#FF0000');
      expect(config.theme.secondary).toBe('#5856D6'); // Should keep default
    });

    it('should handle empty overrides', () => {
      const config = createDefaultConfig({});

      expect(config.appInfo.name).toBe('');
      expect(config.theme.primary).toBe('#007AFF');
    });

    it('should handle null/undefined overrides', () => {
      const config = createDefaultConfig(null as unknown);

      expect(config.appInfo.name).toBe('');
      expect(config.theme.primary).toBe('#007AFF');
    });
  });

  describe('validateConfig', () => {
    it('should validate valid config', () => {
      const validConfig = {
        appInfo: {
          name: 'Test App',
          version: '1.0.0',
        },
      };

      expect(validateConfig(validConfig)).toBe(true);
    });

    it('should reject invalid config', () => {
      expect(validateConfig(null)).toBe(false);
      expect(validateConfig(undefined)).toBe(false);
      expect(validateConfig('invalid')).toBe(false);
      expect(validateConfig(123)).toBe(false);
      expect(validateConfig([])).toBe(false);
    });

    it('should reject config without appInfo', () => {
      const configWithoutAppInfo = {
        theme: {
          primary: '#FF0000',
        },
      };

      expect(validateConfig(configWithoutAppInfo)).toBe(false);
    });

    it('should reject config with invalid appInfo', () => {
      const configWithInvalidAppInfo = {
        appInfo: 'invalid',
      };

      expect(validateConfig(configWithInvalidAppInfo)).toBe(false);
    });

    it('should accept config with empty appInfo', () => {
      const configWithEmptyAppInfo = {
        appInfo: {},
      };

      expect(validateConfig(configWithEmptyAppInfo)).toBe(true);
    });
  });

  describe('mergeConfigs', () => {
    it('should merge multiple configs', () => {
      const config1 = { appInfo: { name: 'App1' } };
      const config2 = { appInfo: { version: '1.0.0' } };
      const config3 = { theme: { primary: '#FF0000' } };

      const merged = mergeConfigs(config1, config2, config3);

      expect(merged).toEqual({
        appInfo: {
          name: 'App1',
          version: '1.0.0',
        },
        theme: {
          primary: '#FF0000',
        },
      });
    });

    it('should handle empty configs', () => {
      const merged = mergeConfigs();

      expect(merged).toEqual({});
    });

    it('should handle null/undefined configs', () => {
      const config1 = { appInfo: { name: 'App1' } };
      
      const merged = mergeConfigs(config1, null, undefined, {} as unknown);

      expect(merged).toEqual({
        appInfo: {
          name: 'App1',
        },
      });
    });

    it('should override with later configs', () => {
      const config1 = { appInfo: { name: 'App1', version: '1.0.0' } };
      const config2 = { appInfo: { name: 'App2' } };

      const merged = mergeConfigs(config1, config2);

      expect(merged.appInfo.name).toBe('App2');
      expect(merged.appInfo.version).toBe('1.0.0');
    });
  });

  describe('isValidEmail', () => {
    it('should validate valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
      expect(isValidEmail('user123@test-domain.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('test..test@example.com')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidEmail('a@b.c')).toBe(true);
      expect(isValidEmail('test@example.c')).toBe(true);
      expect(isValidEmail('test@123.456.789.0')).toBe(true);
    });
  });

  describe('isValidUrl', () => {
    it('should validate valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
      expect(isValidUrl('https://example.com/path#fragment')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('://example.com')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidUrl('http://localhost')).toBe(true);
      expect(isValidUrl('https://192.168.1.1')).toBe(true);
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });
  });

  describe('openUrl', () => {

    beforeEach(() => {
      Linking.canOpenURL.mockClear();
      Linking.openURL.mockClear();
    });

    it('should open valid URL in browser environment', async () => {
      // Mock window.open directly since jsdom already provides window
      const originalOpen = window.open;
      const mockOpen = jest.fn().mockReturnValue(true);
      window.open = mockOpen;

      const result = await openUrl('https://example.com');

      expect(mockOpen).toHaveBeenCalledWith('https://example.com', '_blank');
      expect(result).toBe(true);

      // Restore original
      window.open = originalOpen;
    });

    it('should open valid URL in React Native environment', async () => {
      // Remove window object to force React Native path
      const originalWindow = global.window;
      delete global.window;

      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockResolvedValue();

      const result = await openUrl('https://example.com');

      expect(Linking.canOpenURL).toHaveBeenCalledWith('https://example.com');
      expect(Linking.openURL).toHaveBeenCalledWith('https://example.com');
      expect(result).toBe(true);

      global.window = originalWindow;
    });

    it('should handle URL that cannot be opened', async () => {
      // Remove window object to force React Native path
      const originalWindow = global.window;
      delete global.window;

      Linking.canOpenURL.mockResolvedValue(false);

      const result = await openUrl('https://example.com');

      expect(Linking.canOpenURL).toHaveBeenCalledWith('https://example.com');
      expect(Linking.openURL).not.toHaveBeenCalled();
      expect(result).toBe(false);

      global.window = originalWindow;
    });

    it('should handle errors', async () => {
      // Remove window object to force React Native path
      const originalWindow = global.window;
      delete global.window;

      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockRejectedValue(new Error('Failed to open'));

      const result = await openUrl('https://example.com');

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith('Failed to open URL:', expect.any(Error));

      global.window = originalWindow;
    });

    it('should log errors in development', async () => {
      const originalDev = global.__DEV__;
      global.__DEV__ = true;

      // Remove window object to force React Native path
      const originalWindow = global.window;
      delete global.window;

      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockRejectedValue(new Error('Failed to open'));

      await openUrl('https://example.com');

      expect(mockConsoleError).toHaveBeenCalledWith('Failed to open URL:', expect.any(Error));

      global.__DEV__ = originalDev;
      global.window = originalWindow;
    });
  });

  describe('sendEmail', () => {
    

    beforeEach(() => {
      Linking.canOpenURL.mockClear();
      Linking.openURL.mockClear();
    });

    it('should send email without subject', async () => {
      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockResolvedValue();

      const result = await sendEmail('test@example.com');

      expect(Linking.canOpenURL).toHaveBeenCalledWith('mailto:test@example.com');
      expect(Linking.openURL).toHaveBeenCalledWith('mailto:test@example.com');
      expect(result).toBe(true);
    });

    it('should send email with subject', async () => {
      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockResolvedValue();

      const result = await sendEmail('test@example.com', 'Test Subject');

      expect(Linking.canOpenURL).toHaveBeenCalledWith('mailto:test@example.com?subject=Test%20Subject');
      expect(Linking.openURL).toHaveBeenCalledWith('mailto:test@example.com?subject=Test%20Subject');
      expect(result).toBe(true);
    });

    it('should handle email that cannot be sent', async () => {
      Linking.canOpenURL.mockResolvedValue(false);

      const result = await sendEmail('test@example.com');

      expect(Linking.canOpenURL).toHaveBeenCalledWith('mailto:test@example.com');
      expect(Linking.openURL).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should handle errors', async () => {
      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockRejectedValue(new Error('Failed to send email'));

      const result = await sendEmail('test@example.com');

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith('Failed to send email:', expect.any(Error));
    });

    it('should log errors in development', async () => {
      const originalDev = global.__DEV__;
      global.__DEV__ = true;

      Linking.canOpenURL.mockResolvedValue(true);
      Linking.openURL.mockRejectedValue(new Error('Failed to send email'));

      await sendEmail('test@example.com');

      expect(mockConsoleError).toHaveBeenCalledWith('Failed to send email:', expect.any(Error));

      global.__DEV__ = originalDev;
    });
  });
});