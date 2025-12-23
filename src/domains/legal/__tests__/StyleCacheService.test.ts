/**
 * Tests for StyleCacheService
 */

import { StyleCacheService } from '../domain/services/StyleCacheService';

describe('StyleCacheService', () => {
  beforeEach(() => {
    StyleCacheService.clearAllCaches();
  });

  describe('getCachedStyles', () => {
    it('should cache and return styles', () => {
      const styleFactory = () => ({ test: 'style' });
      const result1 = StyleCacheService.getCachedStyles('test', 'key1', styleFactory);
      const result2 = StyleCacheService.getCachedStyles('test', 'key1', styleFactory);

      expect(result1).toEqual({ test: 'style' });
      expect(result1).toBe(result2); // Should be the same reference
    });

    it('should create new styles for different keys', () => {
      const styleFactory = () => ({ test: 'style' });
      const result1 = StyleCacheService.getCachedStyles('test', 'key1', styleFactory);
      const result2 = StyleCacheService.getCachedStyles('test', 'key2', styleFactory);

      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Should be different references
    });

    it('should limit cache size', () => {
      const styleFactory = (index: number) => ({ test: `style${index}` });
      const maxSize = 3;

      // Fill cache beyond max size
      for (let i = 0; i < maxSize + 2; i++) {
        StyleCacheService.getCachedStyles('test', `key${i}`, () => styleFactory(i), maxSize);
      }

      // Cache should be at most maxSize + 1 (since cleanup happens after adding)
      expect(StyleCacheService.getCacheSize('test')).toBeLessThanOrEqual(maxSize + 1);
    });
  });

  describe('clearCache', () => {
    it('should clear specific cache', () => {
      const styleFactory = () => ({ test: 'style' });
      StyleCacheService.getCachedStyles('test1', 'key1', styleFactory);
      StyleCacheService.getCachedStyles('test2', 'key1', styleFactory);

      expect(StyleCacheService.getCacheSize('test1')).toBe(1);
      expect(StyleCacheService.getCacheSize('test2')).toBe(1);

      StyleCacheService.clearCache('test1');

      expect(StyleCacheService.getCacheSize('test1')).toBe(0);
      expect(StyleCacheService.getCacheSize('test2')).toBe(1);
    });
  });

  describe('clearAllCaches', () => {
    it('should clear all caches', () => {
      const styleFactory = () => ({ test: 'style' });
      StyleCacheService.getCachedStyles('test1', 'key1', styleFactory);
      StyleCacheService.getCachedStyles('test2', 'key1', styleFactory);

      expect(StyleCacheService.getCacheSize('test1')).toBe(1);
      expect(StyleCacheService.getCacheSize('test2')).toBe(1);

      StyleCacheService.clearAllCaches();

      expect(StyleCacheService.getCacheSize('test1')).toBe(0);
      expect(StyleCacheService.getCacheSize('test2')).toBe(0);
    });
  });

  describe('createTokenCacheKey', () => {
    it('should create cache key from design tokens', () => {
      const tokens = {
        colors: { backgroundPrimary: '#fff', primary: '#000', textPrimary: '#333', textSecondary: '#666', textTertiary: '#999', onSurface: '#111', secondary: '#555', info: '#00f' },
        spacing: { xs: 4, sm: 8, md: 16, lg: 24 }
      };

      const key1 = StyleCacheService.createTokenCacheKey(tokens);
      const key2 = StyleCacheService.createTokenCacheKey(tokens);

      expect(key1).toBe(key2);
      expect(typeof key1).toBe('string');
    });

    it('should include additional keys in cache key', () => {
      const tokens = {
        colors: { backgroundPrimary: '#fff', primary: '#000', textPrimary: '#333', textSecondary: '#666', textTertiary: '#999', onSurface: '#111', secondary: '#555', info: '#00f' },
        spacing: { xs: 4, sm: 8, md: 16, lg: 24 }
      };

      const key1 = StyleCacheService.createTokenCacheKey(tokens, { extra: 'value' });
      const key2 = StyleCacheService.createTokenCacheKey(tokens, { extra: 'different' });

      expect(key1).not.toBe(key2);
    });
  });

  describe('createSimpleCacheKey', () => {
    it('should create simple cache key', () => {
      const key = StyleCacheService.createSimpleCacheKey('test-key');
      expect(key).toBe('test-key');
    });
  });
});