/**
 * Translation Loader
 *
 * Loads package translations
 */

export class TranslationLoader {
  /**
   * Load package translations (empty by default - apps provide their own)
   */
  static loadPackageTranslations(): Record<string, Record<string, unknown>> {
    // Package doesn't include any translations by default
    // Consuming applications should provide their own translations
    return { 'en-US': {} };
  }

  /**
   * Deep merge translations (override wins)
   */
  static mergeTranslations(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
    if (!override || Object.keys(override).length === 0) {
      return base;
    }

    const merged = { ...base };

    for (const key in override) {
      if (Object.prototype.hasOwnProperty.call(override, key)) {
        const baseVal = base[key];
        const overrideVal = override[key];

        if (this.isObject(baseVal) && this.isObject(overrideVal)) {
          merged[key] = this.mergeTranslations(baseVal as Record<string, unknown>, overrideVal as Record<string, unknown>);
        } else {
          merged[key] = overrideVal;
        }
      }
    }

    return merged;
  }

  private static isObject(val: unknown): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }
}
