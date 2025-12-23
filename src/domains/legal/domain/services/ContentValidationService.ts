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
    content: string | undefined,
    url: string | undefined,
    title: string | undefined,
    viewOnlineText: string | undefined,
    openText: string | undefined,
    screenName: string
  ): void {
    if (__DEV__) {
      if (!content && !url) {
        console.warn(`${screenName}: Either content or url must be provided`);
      }
      if (!title) {
        console.warn(`${screenName}: title is required`);
      }
      if (url && !viewOnlineText) {
        console.warn(`${screenName}: viewOnlineText is required when url is provided`);
      }
      if (url && !openText) {
        console.warn(`${screenName}: openText is required when url is provided`);
      }
    }
  }

  /**
   * Validate legal links requirements
   */
  static validateLegalLinks(
    privacyPolicyUrl: string | undefined,
    termsOfServiceUrl: string | undefined,
    privacyText: string | undefined,
    termsText: string | undefined,
    onPrivacyPress: (() => void) | undefined,
    onTermsPress: (() => void) | undefined
  ): void {
    if (__DEV__) {
      if (privacyPolicyUrl && !privacyText && !onPrivacyPress) {
        console.warn('LegalLinks: privacyText is required when privacyPolicyUrl is provided');
      }
      if (termsOfServiceUrl && !termsText && !onTermsPress) {
        console.warn('LegalLinks: termsText is required when termsOfServiceUrl is provided');
      }
    }
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