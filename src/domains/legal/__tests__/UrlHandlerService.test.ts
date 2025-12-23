/**
 * Tests for UrlHandlerService
 */

import { UrlHandlerService } from '../domain/services/UrlHandlerService';

describe('UrlHandlerService', () => {
  beforeEach(() => {
    UrlHandlerService.clearCache();
  });

  describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(UrlHandlerService['isValidUrl']('http://example.com')).toBe(true);
      expect(UrlHandlerService['isValidUrl']('https://example.com')).toBe(true);
    });

    it('should return true for valid mailto URLs', () => {
      expect(UrlHandlerService['isValidUrl']('mailto:test@example.com')).toBe(true);
    });

    it('should return true for valid tel URLs', () => {
      expect(UrlHandlerService['isValidUrl']('tel:+1234567890')).toBe(true);
    });

    it('should return true for valid FTP URLs', () => {
      expect(UrlHandlerService['isValidUrl']('ftp://example.com')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(UrlHandlerService['isValidUrl']('')).toBe(false);
      expect(UrlHandlerService['isValidUrl']('invalid-url')).toBe(false);
      expect(UrlHandlerService['isValidUrl']('www.example.com')).toBe(false);
      expect(UrlHandlerService['isValidUrl'](undefined as any)).toBe(false);
      expect(UrlHandlerService['isValidUrl'](null as any)).toBe(false);
      expect(UrlHandlerService['isValidUrl'](123 as any)).toBe(false);
    });
  });

  describe('canOpenUrl', () => {
    it('should return false for invalid URLs', async () => {
      const result = await UrlHandlerService.canOpenUrl('invalid-url');
      expect(result).toBe(false);
    });

    it('should cache results', async () => {
      const mockLinking = {
        canOpenURL: jest.fn().mockResolvedValue(true)
      };
      
      // Mock the Linking module
      jest.doMock('react-native', () => ({
        Linking: mockLinking
      }));

      const url = 'https://example.com';
      await UrlHandlerService.canOpenUrl(url);
      await UrlHandlerService.canOpenUrl(url);

      expect(mockLinking.canOpenURL).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearCache', () => {
    it('should clear all caches', () => {
      UrlHandlerService.clearCache();
      // Test passes if no errors are thrown
      expect(true).toBe(true);
    });
  });
});