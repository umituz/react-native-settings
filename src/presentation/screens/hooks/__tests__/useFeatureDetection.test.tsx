/**
 * Tests for useFeatureDetection Hook
 */

import { renderHook } from '@testing-library/react-hooks';
import { useFeatureDetection } from '../useFeatureDetection';
import type { NormalizedConfig } from '../../utils/normalizeConfig';

// Mock navigation
const mockNavigation = {
  getState: jest.fn(() => ({
    routes: [
      { name: 'Settings' },
      { name: 'Appearance' },
      { name: 'Notifications' },
    ],
  })),
};

describe('useFeatureDetection', () => {
  const mockConfig: NormalizedConfig = {
    appearance: { enabled: true, config: { enabled: true } },
    language: { enabled: true, config: { enabled: true } },
    notifications: { enabled: true, config: { enabled: true } },
    about: { enabled: true, config: { enabled: true } },
    legal: { enabled: true, config: { enabled: true } },
    account: { enabled: true, config: { enabled: true } },
    support: { enabled: true, config: { enabled: true } },
    developer: { enabled: true, config: { enabled: true } },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('detects all features when enabled', () => {
    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, mockNavigation)
    );

    expect(result.current.appearance).toBe(true);
    expect(result.current.language).toBe(true);
    expect(result.current.notifications).toBe(true);
    expect(result.current.about).toBe(true);
    expect(result.current.legal).toBe(true);
    expect(result.current.account).toBe(true);
    expect(result.current.support).toBe(true);
    expect(result.current.developer).toBe(true);
  });

  it('disables features when config disabled', () => {
    const disabledConfig: NormalizedConfig = {
      ...mockConfig,
      appearance: { enabled: false, config: { enabled: true } },
      notifications: { enabled: false, config: { enabled: true } },
    };

    const { result } = renderHook(() =>
      useFeatureDetection(disabledConfig, mockNavigation)
    );

    expect(result.current.appearance).toBe(false);
    expect(result.current.language).toBe(true);
    expect(result.current.notifications).toBe(false);
    expect(result.current.about).toBe(true);
  });

  it('checks navigation screen availability', () => {
    const configWithRoutes: NormalizedConfig = {
      ...mockConfig,
      appearance: { enabled: true, config: { enabled: false, route: 'Appearance' } },
      language: { enabled: true, config: { enabled: false, route: 'NonExistent' } },
    };

    const { result } = renderHook(() =>
      useFeatureDetection(configWithRoutes, mockNavigation)
    );

    expect(result.current.appearance).toBe(true); // Route exists
    expect(result.current.language).toBe(false); // Route doesn't exist
  });

  it('handles notification service availability', () => {
    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, mockNavigation, {
        notificationServiceAvailable: false,
      })
    );

    expect(result.current.notifications).toBe(false);
    expect(result.current.appearance).toBe(true);
  });

  it('disables developer features in production', () => {
    const originalDev = __DEV__;
    (global as any).__DEV__ = false;

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, mockNavigation)
    );

    expect(result.current.developer).toBe(false);
    expect(result.current.appearance).toBe(true);

    (global as any).__DEV__ = originalDev;
  });

  it('enables developer features in development', () => {
    const originalDev = __DEV__;
    (global as any).__DEV__ = true;

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, mockNavigation)
    );

    expect(result.current.developer).toBe(true);

    (global as any).__DEV__ = originalDev;
  });

  it('handles complex navigation state', () => {
    const complexNavigation = {
      getState: jest.fn(() => ({
        routes: [
          {
            name: 'TabNavigator',
            state: {
              routes: [
                {
                  name: 'SettingsStack',
                  state: {
                    routes: [
                      { name: 'Settings' },
                      { name: 'Appearance' },
                    ],
                  },
                },
              ],
            },
          },
        ],
      })),
    };

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, complexNavigation)
    );

    expect(result.current.appearance).toBe(true);
  });

  it('handles navigation errors gracefully', () => {
    const errorNavigation = {
      getState: jest.fn(() => {
        throw new Error('Navigation error');
      }),
    };

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, errorNavigation)
    );

    expect(result.current.appearance).toBe(false);
    expect(result.current.language).toBe(false);
  });

  it('handles missing navigation state', () => {
    const emptyNavigation = {
      getState: jest.fn(() => null),
    };

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, emptyNavigation)
    );

    expect(result.current.appearance).toBe(false);
    expect(result.current.language).toBe(false);
  });

  it('handles malformed navigation routes', () => {
    const malformedNavigation = {
      getState: jest.fn(() => ({
        routes: null,
      })),
    };

    const { result } = renderHook(() =>
      useFeatureDetection(mockConfig, malformedNavigation)
    );

    expect(result.current.appearance).toBe(false);
  });

  it('memoizes results correctly', () => {
    const { result, rerender } = renderHook(() =>
      useFeatureDetection(mockConfig, mockNavigation)
    );

    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('updates when config changes', () => {
    const { result, rerender } = renderHook(
      ({ config }) => useFeatureDetection(config, mockNavigation),
      {
        initialProps: { config: mockConfig },
      }
    );

    expect(result.current.appearance).toBe(true);

    const newConfig = {
      ...mockConfig,
      appearance: { enabled: false, config: { enabled: true } },
    };

    rerender({ config: newConfig });

    expect(result.current.appearance).toBe(false);
  });

  it('updates when navigation changes', () => {
    const { result, rerender } = renderHook(
      ({ navigation }) => useFeatureDetection(mockConfig, navigation),
      {
        initialProps: { navigation: mockNavigation },
      }
    );

    expect(result.current.appearance).toBe(true);

    const newNavigation = {
      getState: jest.fn(() => ({
        routes: [{ name: 'Settings' }], // No Appearance route
      })),
    };

    rerender({ navigation: newNavigation });

    expect(result.current.appearance).toBe(false);
  });

  it('handles default route names', () => {
    const configWithoutRoutes: NormalizedConfig = {
      ...mockConfig,
      appearance: { enabled: true, config: { enabled: false } }, // No route specified
      language: { enabled: true, config: { enabled: false } },
    };

    const { result } = renderHook(() =>
      useFeatureDetection(configWithoutRoutes, mockNavigation)
    );

    expect(result.current.appearance).toBe(true); // Should check default "Appearance" route
    expect(result.current.language).toBe(true); // Should check default "LanguageSelection" route
  });
});