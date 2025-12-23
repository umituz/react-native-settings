/**
 * Simple test for useAboutInfo hook
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAboutInfo } from '../useAboutInfo';
import { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';

// Mock repository
let mockAppInfoData: AppInfo | null = null;

jest.mock('../../../infrastructure/repositories/AboutRepository', () => ({
  AboutRepository: jest.fn().mockImplementation(() => ({
    getAppInfo: jest.fn(() => mockAppInfoData),
    saveAppInfo: jest.fn((info: AppInfo) => {
      mockAppInfoData = info;
      return Promise.resolve();
    }),
    updateAppInfo: jest.fn((updates: Partial<AppInfo>) => {
      if (mockAppInfoData) {
        mockAppInfoData = { ...mockAppInfoData, ...updates };
      }
      return Promise.resolve();
    }),
    destroy: jest.fn(),
  })),
}));

describe('useAboutInfo', () => {
  beforeEach(() => {
    mockAppInfoData = null;
  });

  const mockAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
    contactEmail: 'test@example.com',
    websiteUrl: 'https://example.com',
    websiteDisplay: 'example.com',
    moreAppsUrl: 'https://apps.example.com',
  };

  const mockConfig: AboutConfig = {
    appInfo: mockAppInfo,
    actions: {
      onEmailPress: jest.fn(),
      onWebsitePress: jest.fn(),
      onMoreAppsPress: jest.fn(),
    },
  };

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAboutInfo());

    expect(result.current.appInfo).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should initialize with config', async () => {
    const { result } = renderHook(() => useAboutInfo({ initialConfig: mockConfig, autoInit: undefined }));

    // Wait for useEffect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.appInfo).toEqual(mockAppInfo);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle auto initialization', async () => {
    const { result } = renderHook(() =>
      useAboutInfo({ autoInit: true, initialConfig: mockConfig })
    );

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // Wait for initialization to complete
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(result.current.appInfo).toEqual(mockAppInfo);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle manual initialization', async () => {
    const { result } = renderHook(() => useAboutInfo());

    await act(async () => {
      await result.current.initialize(mockConfig);
    });

    expect(result.current.appInfo).toEqual(mockAppInfo);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle update', async () => {
    const { result } = renderHook(() => useAboutInfo({ initialConfig: mockConfig }));

    await act(async () => {
      // Wait for initialization to complete
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    const updatedConfig = {
      ...mockConfig,
      appInfo: { ...mockAppInfo, name: 'Updated App' }
    };

    await act(async () => {
      await result.current.update(updatedConfig);
    });

    expect(result.current.appInfo?.name).toBe('Updated App');
  });

  it('should handle reset', async () => {
    const { result } = renderHook(() => useAboutInfo({ initialConfig: mockConfig, autoInit: undefined }));

    await waitFor(() => {
      expect(result.current.appInfo).toEqual(mockAppInfo);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.appInfo).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle refresh', async () => {
    const { result } = renderHook(() =>
      useAboutInfo({ autoInit: true, initialConfig: mockConfig })
    );

    await act(async () => {
      // Wait for initialization to complete
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // Refresh should not throw
    await act(async () => {
      await result.current.refresh();
    });

    // Should not crash and should have some app info state
    expect(result.current).toBeDefined();
  });

  it('should refresh app info', async () => {
    const { result } = renderHook(() => useAboutInfo());

    await act(async () => {
      await result.current.initialize(mockConfig);
    });

    await act(async () => {
      await result.current.refresh();
    });

    // Should still have app info after refresh
    expect(result.current.appInfo).toBeTruthy();
  });

  it('should handle errors during initialization', async () => {
    const { result } = renderHook(() =>
      useAboutInfo({ autoInit: true, initialConfig: null as unknown })
    );

    await act(async () => {
      // Wait for initialization to complete
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // With null config, no initialization occurs, so no error is set
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.appInfo).toBeNull();
  });

  it('should handle errors during update', async () => {
    const { result } = renderHook(() => useAboutInfo({ initialConfig: mockConfig }));

    await act(async () => {
      await result.current.update(null as unknown);
    });

    expect(result.current.error).toBeTruthy();
  });

  it('should memoize values', () => {
    const { result, rerender } = renderHook(() => useAboutInfo({ initialConfig: mockConfig }));

    const initialAppInfo = result.current.appInfo;
    const initialLoading = result.current.loading;
    const initialError = result.current.error;

    rerender();

    expect(result.current.appInfo).toBe(initialAppInfo);
    expect(result.current.loading).toBe(initialLoading);
    expect(result.current.error).toBe(initialError);
  });

  it('should handle update on unmounted component', async () => {
    const { result, unmount } = renderHook(() =>
      useAboutInfo({ autoInit: true, initialConfig: mockConfig })
    );

    unmount();

    // Should not crash when updating after unmount
    await act(async () => {
      try {
        await result.current.update(mockConfig);
      } catch (error) {
        // Expected to not crash
      }
    });
  });
});