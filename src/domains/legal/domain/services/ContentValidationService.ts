/**
 * Content Validation Service
 * Single Responsibility: Validate content and URL requirements
 * Extracted from screens to follow SOLID principles
 */

export class ContentValidationService {
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