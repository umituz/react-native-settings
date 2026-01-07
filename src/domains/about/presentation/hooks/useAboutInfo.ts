/**
 * Hook for managing About information
 * Provides reactive state management for About data
 * Optimized for performance and memory safety
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';
import { AboutRepository } from '../../infrastructure/repositories/AboutRepository';
import { createDefaultAppInfo } from '../../utils/AppInfoFactory';

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

  const isInitializedRef = useRef(false);
  const isMountedRef = useRef(true);

  const setErrorIfMounted = useCallback((err: string | null) => {
    if (isMountedRef.current) {
      setError(err);
    }
  }, []);

  const setLoadingIfMounted = useCallback((value: boolean) => {
    if (isMountedRef.current) {
      setLoading(value);
    }
  }, []);

  const initialize = useCallback(async (config: AboutConfig, force = false) => {
    if (isInitializedRef.current && !force) {
      return;
    }

    if (!isMountedRef.current) {
      return;
    }

    setLoadingIfMounted(true);
    setErrorIfMounted(null);

    try {
      const defaultAppInfo = createDefaultAppInfo(config);
      await repository.saveAppInfo(defaultAppInfo);

      if (isMountedRef.current) {
        setAppInfo(defaultAppInfo);
        isInitializedRef.current = true;
      }
    } catch (err) {
      setErrorIfMounted(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingIfMounted(false);
    }
  }, [repository, setErrorIfMounted, setLoadingIfMounted]);

  const update = useCallback(async (config: AboutConfig) => {
    if (!isMountedRef.current) {
      return;
    }

    setLoadingIfMounted(true);
    setErrorIfMounted(null);

    try {
      const updatedAppInfo = createDefaultAppInfo(config);
      await repository.saveAppInfo(updatedAppInfo);

      if (isMountedRef.current) {
        setAppInfo(updatedAppInfo);
      }
    } catch (err) {
      setErrorIfMounted(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingIfMounted(false);
    }
  }, [repository, setErrorIfMounted, setLoadingIfMounted]);

  const updateAppInfo = useCallback(async (updates: Partial<AppInfo>) => {
    if (!appInfo || !isMountedRef.current) {
      if (isMountedRef.current) {
        setErrorIfMounted('App info not initialized');
      }
      return;
    }

    setLoadingIfMounted(true);
    setErrorIfMounted(null);

    try {
      const updatedInfo = await repository.updateAppInfo(updates);

      if (isMountedRef.current) {
        setAppInfo(updatedInfo);
      }
    } catch (err) {
      setErrorIfMounted(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingIfMounted(false);
    }
  }, [repository, appInfo, setErrorIfMounted, setLoadingIfMounted]);

  const refresh = useCallback(async () => {
    if (!isMountedRef.current || !appInfo) {
      return;
    }

    setLoadingIfMounted(true);
    setErrorIfMounted(null);

    try {
      const refreshedInfo = await repository.getAppInfo();

      if (isMountedRef.current) {
        setAppInfo(refreshedInfo);
      }
    } catch (err) {
      setErrorIfMounted(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingIfMounted(false);
    }
  }, [repository, appInfo, setErrorIfMounted, setLoadingIfMounted]);

  const reset = useCallback(() => {
    if (!isMountedRef.current) {
      return;
    }

    setAppInfo(null);
    setError(null);
    setLoading(false);
    isInitializedRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (repository && typeof repository.destroy === 'function') {
        repository.destroy();
      }
    };
  }, [repository]);

  useEffect(() => {
    if (initialConfig && autoInit !== false && isMountedRef.current && !isInitializedRef.current) {
      const defaultAppInfo = createDefaultAppInfo(initialConfig);
      setAppInfo(defaultAppInfo);
      isInitializedRef.current = true;
    }
  }, [initialConfig, autoInit]);

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
