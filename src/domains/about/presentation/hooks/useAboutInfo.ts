/**
 * Hook for managing About information
 * Provides reactive state management for About data
 * Optimized for performance and memory safety
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';
import { AboutRepository } from '../../infrastructure/repositories/AboutRepository';

export interface UseAboutInfoOptions {
  /** Initial configuration */
  initialConfig?: AboutConfig;
  /** Auto-initialize on mount */
  autoInit?: boolean;
}

export interface UseAboutInfoReturn {
  /** Current app info */
  appInfo: AppInfo | null;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: string | null;
  /** Initialize with config */
  initialize: (config: AboutConfig) => Promise<void>;
  /** Update with new config */
  update: (config: AboutConfig) => Promise<void>;
  /** Update app info */
  updateAppInfo: (updates: Partial<AppInfo>) => Promise<void>;
  /** Refresh current app info */
  refresh: () => Promise<void>;
  /** Reset to initial state */
  reset: () => void;
}

export const useAboutInfo = (
  options: UseAboutInfoOptions = {}
): UseAboutInfoReturn => {
  const { initialConfig, autoInit } = options;
  const [repository] = useState(() => new AboutRepository());
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent infinite loops and memory leaks
  const isInitializedRef = useRef(false);
  const isMountedRef = useRef(true);

  const initialize = useCallback(async (config: AboutConfig, force = false) => {
    // Prevent multiple initializations unless forced
    if (isInitializedRef.current && !force) {
      return;
    }

    // Check if component is still mounted
    if (!isMountedRef.current) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const defaultAppInfo: AppInfo = {
        name: config.appInfo?.name || '',
        version: config.appInfo?.version || '1.0.0',
        description: config.appInfo?.description,
        developer: config.appInfo?.developer,
        contactEmail: config.appInfo?.contactEmail,
        websiteUrl: config.appInfo?.websiteUrl,
        websiteDisplay: config.appInfo?.websiteDisplay,
        moreAppsUrl: config.appInfo?.moreAppsUrl,
      };

      await repository.saveAppInfo(defaultAppInfo);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setAppInfo(defaultAppInfo);
        isInitializedRef.current = true;
      }
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      // Only update loading state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [repository]);

  const update = useCallback(async (config: AboutConfig) => {
    if (!isMountedRef.current) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedAppInfo: AppInfo = {
        name: config.appInfo?.name || '',
        version: config.appInfo?.version || '1.0.0',
        description: config.appInfo?.description,
        developer: config.appInfo?.developer,
        contactEmail: config.appInfo?.contactEmail,
        websiteUrl: config.appInfo?.websiteUrl,
        websiteDisplay: config.appInfo?.websiteDisplay,
        moreAppsUrl: config.appInfo?.moreAppsUrl,
      };

      await repository.saveAppInfo(updatedAppInfo);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setAppInfo(updatedAppInfo);
      }
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      // Only update loading state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [repository]);

  const updateAppInfo = useCallback(async (updates: Partial<AppInfo>) => {
    if (!appInfo || !isMountedRef.current) {
      if (isMountedRef.current) {
        setError('App info not initialized');
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedInfo = await repository.updateAppInfo(updates);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setAppInfo(updatedInfo);
      }
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      // Only update loading state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [repository, appInfo]);

  const refresh = useCallback(async () => {
    if (!isMountedRef.current || !appInfo) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const refreshedInfo = await repository.getAppInfo();

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setAppInfo(refreshedInfo);
      }
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      // Only update loading state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [repository, appInfo]);

  const reset = useCallback(() => {
    if (!isMountedRef.current) {
      return;
    }

    setAppInfo(null);
    setError(null);
    setLoading(false);
    isInitializedRef.current = false;
  }, []);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      // Cleanup repository if it has destroy method
      if (repository && typeof repository.destroy === 'function') {
        repository.destroy();
      }
    };
  }, [repository]);



  // Set initial config when provided (if autoInit is not explicitly false)
  useEffect(() => {
    if (initialConfig && autoInit !== false && isMountedRef.current && !isInitializedRef.current) {
      const defaultAppInfo: AppInfo = {
        name: initialConfig.appInfo?.name || '',
        version: initialConfig.appInfo?.version || '1.0.0',
        description: initialConfig.appInfo?.description,
        developer: initialConfig.appInfo?.developer,
        contactEmail: initialConfig.appInfo?.contactEmail,
        websiteUrl: initialConfig.appInfo?.websiteUrl,
        websiteDisplay: initialConfig.appInfo?.websiteDisplay,
        moreAppsUrl: initialConfig.appInfo?.moreAppsUrl,
      };

      setAppInfo(defaultAppInfo);
      isInitializedRef.current = true;
    }
  }, [initialConfig, autoInit]);

  // Auto-initialize with dependency optimization
  useEffect(() => {
    if (autoInit === true && initialConfig && isMountedRef.current) {
      initialize(initialConfig, true);
    }
  }, [autoInit, initialConfig, initialize]);

  return {
    appInfo,
    loading,
    error,
    initialize,
    update,
    updateAppInfo,
    refresh,
    reset,
  };
};