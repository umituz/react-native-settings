/**
 * Style Cache Service
 * Single Responsibility: Manage style caching to prevent memory leaks
 * Extracted from components to follow SOLID principles
 */

import type { DesignTokens } from "@umituz/react-native-design-system";

export interface StyleCacheOptions {
  maxSize?: number;
  cacheKey?: string;
}

export class StyleCacheService {
  private static caches = new Map<string, Map<string, any>>();
  private static readonly DEFAULT_MAX_SIZE = 50;

  /**
   * Get or create cached styles
   */
  static getCachedStyles<T>(
    cacheName: string,
    cacheKey: string,
    styleFactory: () => T,
    maxSize: number = this.DEFAULT_MAX_SIZE
  ): T {
    let cache = this.caches.get(cacheName);
    
    if (!cache) {
      cache = new Map();
      this.caches.set(cacheName, cache);
    }

    // Check if styles already cached
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    // Create new styles and cache them
    const styles = styleFactory();
    
    // Limit cache size to prevent memory leaks
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }
    
    cache.set(cacheKey, styles);
    return styles;
  }

  /**
   * Clear specific cache
   */
  static clearCache(cacheName: string): void {
    this.caches.delete(cacheName);
  }

  /**
   * Clear all caches
   */
  static clearAllCaches(): void {
    this.caches.clear();
  }

  /**
   * Get cache size
   */
  static getCacheSize(cacheName: string): number {
    const cache = this.caches.get(cacheName);
    return cache ? cache.size : 0;
  }

  /**
   * Create cache key from design tokens
   */
  static createTokenCacheKey(tokens: DesignTokens, additionalKeys?: Record<string, any>): string {
    const tokenData = {
      xs: tokens.spacing.xs,
      sm: tokens.spacing.sm,
      md: tokens.spacing.md,
      lg: tokens.spacing.lg,
      ...additionalKeys
    };
    
    return JSON.stringify(tokenData);
  }

  /**
   * Create simple cache key
   */
  static createSimpleCacheKey(key: string): string {
    return key;
  }
}