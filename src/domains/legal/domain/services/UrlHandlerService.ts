/**
 * URL Handler Service
 * Single Responsibility: Handle URL operations
 * Extracted from screens to follow SOLID principles
 * Performance optimized with caching and error handling
 */

import { Linking } from 'react-native';

// URL validation cache to avoid repeated checks
const urlValidationCache = new Map<string, boolean>();
const MAX_CACHE_SIZE = 100;

export class UrlHandlerService {
  /**
   * Get Linking module - using static import for stability
   */
  private static getLinkingModule(): any {
    return Linking;
  }

  /**
   * Clean cache to prevent memory leaks
   */
  private static cleanCache(): void {
    if (urlValidationCache.size > MAX_CACHE_SIZE) {
      const entriesToDelete = Array.from(urlValidationCache.keys()).slice(0, Math.floor(MAX_CACHE_SIZE / 2));
      entriesToDelete.forEach(key => urlValidationCache.delete(key));
    }
  }

  /**
   * Validate URL format to prevent invalid operations
   */
  private static isValidUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;

    try {
      // Basic URL validation without creating URL object to avoid memory overhead
      return url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('mailto:') ||
        url.startsWith('tel:') ||
        url.startsWith('ftp://');
    } catch {
      return false;
    }
  }

  /**
   * Open URL in external browser with performance optimizations
   */
  static async openUrl(url: string): Promise<void> {
    if (!this.isValidUrl(url)) {
      return;
    }

    try {
      const Linking = await this.getLinkingModule();

      // Check cache first to avoid repeated canOpenURL calls
      let canOpen = urlValidationCache.get(url);
      if (canOpen === undefined) {
        canOpen = await Linking.canOpenURL(url);

        // Cache the result with size limit
        this.cleanCache();
        urlValidationCache.set(url, canOpen || false);
      }

      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch {
      // Silent error handling to prevent app crashes
    }
  }

  /**
   * Check if URL can be opened with caching
   */
  static async canOpenUrl(url: string): Promise<boolean> {
    if (!this.isValidUrl(url)) return false;

    // Check cache first
    const cached = urlValidationCache.get(url);
    if (cached !== undefined) {
      return cached;
    }

    try {
      const Linking = await this.getLinkingModule();
      const canOpen = await Linking.canOpenURL(url);

      // Cache the result with size limit
      this.cleanCache();
      urlValidationCache.set(url, canOpen);

      return canOpen;
    } catch {
      // Cache failure to prevent repeated attempts
      this.cleanCache();
      urlValidationCache.set(url, false);
      return false;
    }
  }

  /**
   * Clear all caches (useful for testing or memory cleanup)
   */
  static clearCache(): void {
    urlValidationCache.clear();
  }
}