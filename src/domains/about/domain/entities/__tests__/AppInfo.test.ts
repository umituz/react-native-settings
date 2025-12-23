/**
 * Tests for AppInfo entity
 */
import { AppInfo } from '../AppInfo';

describe('AppInfo Entity', () => {
  const validAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
    contactEmail: 'test@example.com',
    websiteUrl: 'https://example.com',
    websiteDisplay: 'example.com',
    moreAppsUrl: 'https://apps.example.com',
  };

  describe('Validation', () => {
    it('should accept valid AppInfo', () => {
      expect(() => {
        const appInfo: AppInfo = validAppInfo;
        expect(appInfo.name).toBe('Test App');
        expect(appInfo.version).toBe('1.0.0');
      }).not.toThrow();
    });

    it('should accept minimal AppInfo', () => {
      const minimalAppInfo: AppInfo = {
        name: 'Minimal App',
        version: '1.0.0',
      };

      expect(minimalAppInfo.name).toBe('Minimal App');
      expect(minimalAppInfo.version).toBe('1.0.0');
      expect(minimalAppInfo.description).toBeUndefined();
      expect(minimalAppInfo.developer).toBeUndefined();
    });

    it('should accept AppInfo with optional fields', () => {
      const appInfoWithOptionals: AppInfo = {
        name: 'App',
        version: '1.0.0',
        description: 'Description',
        developer: 'Developer',
      };

      expect(appInfoWithOptionals.description).toBe('Description');
      expect(appInfoWithOptionals.developer).toBe('Developer');
      expect(appInfoWithOptionals.contactEmail).toBeUndefined();
    });
  });

  describe('Type Safety', () => {
    it('should have correct types', () => {
      const appInfo: AppInfo = validAppInfo;

      expect(typeof appInfo.name).toBe('string');
      expect(typeof appInfo.version).toBe('string');
      expect(typeof appInfo.description).toBe('string');
      expect(typeof appInfo.developer).toBe('string');
      expect(typeof appInfo.contactEmail).toBe('string');
      expect(typeof appInfo.websiteUrl).toBe('string');
      expect(typeof appInfo.websiteDisplay).toBe('string');
      expect(typeof appInfo.moreAppsUrl).toBe('string');
    });

    it('should allow undefined for optional fields', () => {
      const appInfo: AppInfo = {
        name: 'Test',
        version: '1.0.0',
        description: undefined,
        developer: undefined,
        contactEmail: undefined,
        websiteUrl: undefined,
        websiteDisplay: undefined,
        moreAppsUrl: undefined,
      };

      expect(appInfo.description).toBeUndefined();
      expect(appInfo.developer).toBeUndefined();
    });
  });

  describe('Immutability', () => {
    it('should be assignable but not inherently immutable', () => {
      const appInfo: AppInfo = { ...validAppInfo };

      // TypeScript allows mutation but we can test the behavior
      appInfo.name = 'Modified App';
      expect(appInfo.name).toBe('Modified App');
    });
  });
});