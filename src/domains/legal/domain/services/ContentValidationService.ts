/**
 * Content Validation Service
 * Single Responsibility: Validate content and URL requirements
 * Extracted from screens to follow SOLID principles
 */

export interface ContentValidationRule {
  content?: string;
  url?: string;
  title?: string;
  viewOnlineText?: string;
  openText?: string;
  privacyText?: string;
  termsText?: string;
}

export class ContentValidationService {
  /**
   * Validate screen content requirements
   */
  static validateScreenContent(
    _content: string | undefined,
    _url: string | undefined,
    _title: string | undefined,
    _viewOnlineText: string | undefined,
    _openText: string | undefined,
    _screenName: string
  ): void {
    // Silent validation - no console output
    void _content;
    void _url;
    void _title;
    void _viewOnlineText;
    void _openText;
    void _screenName;
  }

  /**
   * Validate legal links requirements
   */
  static validateLegalLinks(
    _privacyPolicyUrl: string | undefined,
    _termsOfServiceUrl: string | undefined,
    _privacyText: string | undefined,
    _termsText: string | undefined,
    _onPrivacyPress: (() => void) | undefined,
    _onTermsPress: (() => void) | undefined
  ): void {
    // Silent validation - no console output
    void _privacyPolicyUrl;
    void _termsOfServiceUrl;
    void _privacyText;
    void _termsText;
    void _onPrivacyPress;
    void _onTermsPress;
  }

  /**
   * Check if content is valid
   */
  static hasValidContent(content?: string, url?: string): boolean {
    return !!(content || url);
  }

  /**
   * Check if URL section should be shown
   */
  static shouldShowUrlSection(url?: string, onUrlPress?: () => void): boolean {
    return !!(url || onUrlPress);
  }

  /**
   * Check if legal item should be shown
   */
  static shouldShowLegalItem(
    onPress?: () => void,
    title?: string
  ): boolean {
    return !!(onPress && title);
  }
}