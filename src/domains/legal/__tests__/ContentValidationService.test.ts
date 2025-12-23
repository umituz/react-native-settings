/**
 * Tests for ContentValidationService
 */

import { ContentValidationService } from '../domain/services/ContentValidationService';

describe('ContentValidationService', () => {
  describe('validateScreenContent', () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();

    beforeEach(() => {
      mockWarn.mockClear();
      console.warn = mockWarn;
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    it('should warn when neither content nor url is provided', () => {
      ContentValidationService.validateScreenContent(
        undefined,
        undefined,
        'Test Title',
        'View Online',
        'Open',
        'TestScreen'
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'TestScreen: Either content or url must be provided'
      );
    });

    it('should warn when title is not provided', () => {
      ContentValidationService.validateScreenContent(
        'Some content',
        undefined,
        undefined,
        'View Online',
        'Open',
        'TestScreen'
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'TestScreen: title is required'
      );
    });

    it('should warn when url is provided but viewOnlineText is missing', () => {
      ContentValidationService.validateScreenContent(
        undefined,
        'https://example.com',
        'Test Title',
        undefined,
        'Open',
        'TestScreen'
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'TestScreen: viewOnlineText is required when url is provided'
      );
    });

    it('should warn when url is provided but openText is missing', () => {
      ContentValidationService.validateScreenContent(
        undefined,
        'https://example.com',
        'Test Title',
        'View Online',
        undefined,
        'TestScreen'
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'TestScreen: openText is required when url is provided'
      );
    });

    it('should not warn when all required props are provided', () => {
      ContentValidationService.validateScreenContent(
        'Some content',
        undefined,
        'Test Title',
        'View Online',
        'Open',
        'TestScreen'
      );

      expect(mockWarn).not.toHaveBeenCalled();
    });
  });

  describe('validateLegalLinks', () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();

    beforeEach(() => {
      mockWarn.mockClear();
      console.warn = mockWarn;
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    it('should warn when privacyPolicyUrl is provided but privacyText is missing', () => {
      ContentValidationService.validateLegalLinks(
        'https://privacy.com',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'LegalLinks: privacyText is required when privacyPolicyUrl is provided'
      );
    });

    it('should warn when termsOfServiceUrl is provided but termsText is missing', () => {
      ContentValidationService.validateLegalLinks(
        undefined,
        'https://terms.com',
        undefined,
        undefined,
        undefined,
        undefined
      );

      expect(mockWarn).toHaveBeenCalledWith(
        'LegalLinks: termsText is required when termsOfServiceUrl is provided'
      );
    });

    it('should not warn when onPrivacyPress is provided instead of privacyText', () => {
      const onPrivacyPress = jest.fn();
      
      ContentValidationService.validateLegalLinks(
        'https://privacy.com',
        undefined,
        undefined,
        undefined,
        onPrivacyPress,
        undefined
      );

      expect(mockWarn).not.toHaveBeenCalled();
    });
  });

  describe('hasValidContent', () => {
    it('should return true when content is provided', () => {
      expect(ContentValidationService.hasValidContent('Some content')).toBe(true);
    });

    it('should return true when url is provided', () => {
      expect(ContentValidationService.hasValidContent(undefined, 'https://example.com')).toBe(true);
    });

    it('should return false when neither content nor url is provided', () => {
      expect(ContentValidationService.hasValidContent()).toBe(false);
    });
  });

  describe('shouldShowUrlSection', () => {
    it('should return true when url is provided', () => {
      expect(ContentValidationService.shouldShowUrlSection('https://example.com')).toBe(true);
    });

    it('should return true when onUrlPress is provided', () => {
      expect(ContentValidationService.shouldShowUrlSection(undefined, jest.fn())).toBe(true);
    });

    it('should return false when neither url nor onUrlPress is provided', () => {
      expect(ContentValidationService.shouldShowUrlSection()).toBe(false);
    });
  });

  describe('shouldShowLegalItem', () => {
    it('should return true when both onPress and title are provided', () => {
      expect(ContentValidationService.shouldShowLegalItem(jest.fn(), 'Title')).toBe(true);
    });

    it('should return false when onPress is missing', () => {
      expect(ContentValidationService.shouldShowLegalItem(undefined, 'Title')).toBe(false);
    });

    it('should return false when title is missing', () => {
      expect(ContentValidationService.shouldShowLegalItem(jest.fn())).toBe(false);
    });
  });
});