/**
 * Tests for useAboutInfo hook
 */
import '../../../types/global.d.ts';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAboutInfo } from '../useAboutInfo';
import { AboutConfig } from '../../../domain/entities/AppInfo';

describe('useAboutInfo', () => {
  const mockConfig: AboutConfig = {
    appInfo: {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test Description',
      developer: 'Test Developer',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useAboutInfo());

      expect(result.current.appInfo).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.initialize).toBe('function');
      expect(typeof result.current.updateAppInfo).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });

    it('should auto-initialize when autoInit is true', async () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.appInfo).toEqual({
        name: 'Test App',
        version: '1.0.0',
        description: 'Test Description',
        developer: 'Test Developer',
        contactEmail: undefined,
        websiteUrl: undefined,
        websiteDisplay: undefined,
        moreAppsUrl: undefined,
        privacyPolicyUrl: undefined,
        termsOfServiceUrl: undefined,
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should not auto-initialize when autoInit is false', () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: false, initialConfig: mockConfig })
      );

      expect(result.current.appInfo).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('initialize', () => {
    it('should initialize with config', async () => {
      const { result } = renderHook(() => useAboutInfo());

      await act(async () => {
        await result.current.initialize(mockConfig);
      });

      expect(result.current.appInfo).toEqual({
        name: 'Test App',
        version: '1.0.0',
        description: 'Test Description',
        developer: 'Test Developer',
        contactEmail: undefined,
        websiteUrl: undefined,
        websiteDisplay: undefined,
        moreAppsUrl: undefined,
        privacyPolicyUrl: undefined,
        termsOfServiceUrl: undefined,
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should not initialize multiple times', async () => {
      const { result } = renderHook(() => useAboutInfo());

      await act(async () => {
        await result.current.initialize(mockConfig);
      });

      const firstAppInfo = result.current.appInfo;

      await act(async () => {
        await result.current.initialize({
          appInfo: { name: 'Different App', version: '2.0.0' }
        });
      });

      expect(result.current.appInfo).toEqual(firstAppInfo);
    });

    it('should handle initialization errors', async () => {
      const { result } = renderHook(() => useAboutInfo());

      await act(async () => {
        await result.current.initialize(null as unknown);
      });

      expect(result.current.appInfo).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });
  });

  describe('updateAppInfo', () => {
    beforeEach(async () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it('should update app info', async () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );

      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      await act(async () => {
        await result.current.updateAppInfo({ name: 'Updated App', version: '2.0.0' });
      });

      expect(result.current.appInfo?.name).toBe('Updated App');
      expect(result.current.appInfo?.version).toBe('2.0.0');
      expect(result.current.appInfo?.description).toBe('Test Description'); // Unchanged
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle update when not initialized', async () => {
      const { result } = renderHook(() => useAboutInfo());

      await act(async () => {
        await result.current.updateAppInfo({ name: 'Updated App' });
      });

      expect(result.current.appInfo).toBeNull();
      expect(result.current.error).toBe('App info not initialized');
    });

    it('should handle update errors', async () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.updateAppInfo(null as unknown);
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('reset', () => {
    it('should reset state', async () => {
      const { result } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.appInfo).toBeTruthy();

      act(() => {
        result.current.reset();
      });

      expect(result.current.appInfo).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('Memory Leak Prevention', () => {
    it('should handle unmounted component', async () => {
      const { result, unmount } = renderHook(() => useAboutInfo());

      // Start initialization
      const initPromise = act(async () => {
        await result.current.initialize(mockConfig);
      });

      // Unmount before initialization completes
      unmount();

      // Should not throw error
      await initPromise;
    });

    it('should handle update on unmounted component', async () => {
      const { result, unmount } = renderHook(() => 
        useAboutInfo({ autoInit: true, initialConfig: mockConfig })
      );
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      unmount();

      // Should not throw error
      await act(async () => {
        await result.current.updateAppInfo({ name: 'Updated App' });
      });
    });
  });

});