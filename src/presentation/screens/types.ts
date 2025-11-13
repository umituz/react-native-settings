/**
 * Settings Configuration
 * 
 * Controls which settings features are visible in the SettingsScreen.
 * Each feature can be:
 * - true: Always show (if navigation screen exists)
 * - false: Never show
 * - 'auto': Automatically detect (check if navigation screen exists and package is available)
 */
export interface SettingsConfig {
  /**
   * Show Appearance settings (Theme & Language)
   * @default 'auto'
   */
  appearance?: boolean | 'auto';

  /**
   * Show Notifications settings
   * @default 'auto'
   */
  notifications?: boolean | 'auto';

  /**
   * Show About settings
   * @default 'auto'
   */
  about?: boolean | 'auto';

  /**
   * Show Legal settings (Terms, Privacy Policy)
   * @default 'auto'
   */
  legal?: boolean | 'auto';
}

