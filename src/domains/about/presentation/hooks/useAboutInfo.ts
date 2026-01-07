/**
 * Hook for managing About information
 * Provides reactive state management for About data
 * Optimized for performance and memory safety
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';
import { AboutRepository } from '../../infrastructure/repositories/AboutRepository';
import type { UseAboutInfoOptions, UseAboutInfoReturn } from './useAboutInfo.types';
import {
  setErrorIfMounted,
  setLoadingIfMounted,
  initializeAppInfo,
  updateAppInfoConfig,
  updateAppInfoPartial,
  refreshAppInfo,
} from './useAboutInfo.utils';

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

  const initialize = useCallback(
    (config: AboutConfig) => initializeAppInfo(
      config,
      repository,
      isMountedRef,
      isInitializedRef,
      setAppInfo,
      setError,
      setLoading
    ),
    [repository]
  );

  const update = useCallback(
    (config: AboutConfig) => updateAppInfoConfig(
      config,
      repository,
      isMountedRef,
      setAppInfo,
      setError,
      setLoading
    ),
    [repository]
  );

  const updateAppInfoCallback = useCallback(
    (updates: Partial<AppInfo>) => {
      if (!appInfo) {
        setErrorIfMounted(isMountedRef, setError, 'App info not initialized');
        return Promise.resolve();
      }
      return updateAppInfoPartial(
        updates,
        repository,
        isMountedRef,
        setAppInfo,
        setError,
        setLoading
      );
    },
    [repository, appInfo]
  );

  const refresh = useCallback(
    () => refreshAppInfo(
      repository,
      isMountedRef,
      setAppInfo,
      setError,
      setLoading
    ),
    [repository]
  );

  const reset = useCallback(() => {
    if (!isMountedRef.current) {
      return;
    }

    setAppInfo(null);
    setError(null);
    setLoading(false);
    isInitializedRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (repository && typeof repository.destroy === 'function') {
        repository.destroy();
      }
    };
  }, [repository]);

  // Initialize with default config if provided
  useEffect(() => {
    if (
      initialConfig &&
      autoInit !== false &&
      isMountedRef.current &&
      !isInitializedRef.current
    ) {
      const { createDefaultAppInfo } = require('../../utils/AppInfoFactory');
      const defaultAppInfo = createDefaultAppInfo(initialConfig);
      setAppInfo(defaultAppInfo);
      isInitializedRef.current = true;
    }
  }, [initialConfig, autoInit]);

  // Auto-initialize if autoInit is true
  useEffect(() => {
    if (autoInit === true && initialConfig && isMountedRef.current) {
      initialize(initialConfig);
    }
  }, [autoInit, initialConfig, initialize]);

  return {
    appInfo,
    loading,
    error,
    initialize,
    update,
    updateAppInfo: updateAppInfoCallback,
    refresh,
    reset,
  };
};

// Re-export types for convenience
export type { UseAboutInfoOptions, UseAboutInfoReturn } from './useAboutInfo.types';
