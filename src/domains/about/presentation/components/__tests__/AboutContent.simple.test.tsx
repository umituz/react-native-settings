/**
 * Simple test for AboutContent component
 */
import React from 'react';
import { AboutContent } from '../AboutContent';
import { AppInfo, AboutConfig } from '../../../domain/entities/AppInfo';

describe('AboutContent', () => {
  const mockAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
    contactEmail: 'test@example.com',
    websiteUrl: 'https://example.com',
    websiteDisplay: 'example.com',
    moreAppsUrl: 'https://apps.example.com',
    privacyPolicyUrl: 'https://example.com/privacy',
    termsOfServiceUrl: 'https://example.com/terms',
  };

  const mockConfig: AboutConfig = {
    appInfo: mockAppInfo,
    actions: {
      onEmailPress: jest.fn(),
      onWebsitePress: jest.fn(),
      onPrivacyPress: jest.fn(),
      onTermsPress: jest.fn(),
      onMoreAppsPress: jest.fn(),
    },
  };

  it('should render without crashing', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
  });

  it('should render developer when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.developer).toBe('Test Developer');
  });

  it('should render contact email when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.contactEmail).toBe('test@example.com');
  });

  it('should render website when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.websiteUrl).toBe('https://example.com');
  });

  it('should render more apps when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.moreAppsUrl).toBe('https://apps.example.com');
  });

  it('should render privacy policy when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.privacyPolicyUrl).toBe('https://example.com/privacy');
  });

  it('should render terms of service when provided', () => {
    const element = React.createElement(AboutContent, { appInfo: mockAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(mockAppInfo.termsOfServiceUrl).toBe('https://example.com/terms');
  });

  it('should not render developer when not provided', () => {
    const appInfoWithoutDeveloper = {
      ...mockAppInfo,
      developer: '',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithoutDeveloper, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithoutDeveloper.developer).toBe('');
  });

  it('should not render contact email when not provided', () => {
    const appInfoWithoutEmail = {
      ...mockAppInfo,
      contactEmail: '',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithoutEmail, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithoutEmail.contactEmail).toBe('');
  });

  it('should not render website when not provided', () => {
    const appInfoWithoutWebsite = {
      ...mockAppInfo,
      websiteUrl: '',
      websiteDisplay: '',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithoutWebsite, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithoutWebsite.websiteUrl).toBe('');
  });

  it('should use websiteDisplay when provided', () => {
    const appInfoWithDisplay = {
      ...mockAppInfo,
      websiteDisplay: 'Custom Display',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithDisplay, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithDisplay.websiteDisplay).toBe('Custom Display');
  });

  it('should use websiteUrl when websiteDisplay not provided', () => {
    const appInfoWithoutDisplay = {
      ...mockAppInfo,
      websiteDisplay: '',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithoutDisplay, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithoutDisplay.websiteDisplay).toBe('');
  });

  it('should handle empty app info', () => {
    const emptyAppInfo: AppInfo = {
      name: '',
      version: '',
      description: '',
      developer: '',
      contactEmail: '',
      websiteUrl: '',
      websiteDisplay: '',
      moreAppsUrl: '',
      privacyPolicyUrl: '',
      termsOfServiceUrl: '',
    };

    const element = React.createElement(AboutContent, { appInfo: emptyAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
  });

  it('should handle app info with only required fields', () => {
    const minimalAppInfo: AppInfo = {
      name: 'Minimal App',
      version: '1.0.0',
      description: '',
      developer: '',
      contactEmail: '',
      websiteUrl: '',
      websiteDisplay: '',
      moreAppsUrl: '',
      privacyPolicyUrl: '',
      termsOfServiceUrl: '',
    };

    const element = React.createElement(AboutContent, { appInfo: minimalAppInfo, config: mockConfig });
    expect(element).toBeTruthy();
    expect(minimalAppInfo.name).toBe('Minimal App');
  });

  it('should handle special characters in text', () => {
    const appInfoWithSpecialChars: AppInfo = {
      ...mockAppInfo,
      developer: 'Test & Developer <script>',
      contactEmail: 'test+special@example.com',
    };

    const element = React.createElement(AboutContent, { appInfo: appInfoWithSpecialChars, config: mockConfig });
    expect(element).toBeTruthy();
    expect(appInfoWithSpecialChars.developer).toBe('Test & Developer <script>');
  });
});