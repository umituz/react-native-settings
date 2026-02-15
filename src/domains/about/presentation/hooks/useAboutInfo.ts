/**
 * Hook for managing About information
 * Provides reactive state management for About data
 * Refactored to use useAsyncStateUpdate for clean async state management
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';
import { AboutRepository } from '../../infrastructure/repositories/AboutRepository';
import { useAsyncStateUpdate } from '../../../../utils/hooks/useAsyncStateUpdate';
import { createDefaultAppInfo } from '../../utils/AppInfoFactory';
import type { UseAboutInfoOptions, UseAboutInfoReturn } from './useAboutInfo.types';

export const useAboutInfo = (
  options: UseAboutInfoOptions = {}
): UseAboutInfoReturn => {
  const { initialConfig, autoInit } = options;
  const [repository] = useState(() => new AboutRepository());
  const isInitializedRef = useRef(false);

  // Use the new useAsyncStateUpdate hook for clean async state management
  const { data: appInfo, loading, error, execute, setData: setAppInfo, setError } = useAsyncStateUpdate<AppInfo>({
    initialData: null,
  });

  /**
   * Initialize app info with config
   */
  const initialize = useCallback(
    async (config: AboutConfig) => {
      if (isInitializedRef.current) {
        return;
      }

      await execute(async () => {
        const defaultAppInfo = createDefaultAppInfo(config);
        await repository.saveAppInfo(defaultAppInfo);
        isInitializedRef.current = true;
        return defaultAppInfo;
      });
    },
    [repository, execute]
  );

  /**
   * Update app info with new config
   */
  const update = useCallback(
    async (config: AboutConfig) => {
      await execute(async () => {
        const updatedAppInfo = createDefaultAppInfo(config);
        await repository.saveAppInfo(updatedAppInfo);
        return updatedAppInfo;
      });
    },
    [repository, execute]
  );

  /**
   * Update app info with partial updates
   */
  const updateAppInfoCallback = useCallback(
    async (updates: Partial<AppInfo>) => {
      if (!appInfo) {
        setError('App info not initialized');
        return;
      }

      await execute(async () => {
        return await repository.updateAppInfo(updates);
      });
    },
    [repository, appInfo, execute, setError]
  );

  /**
   * Refresh app info from repository
   */
  const refresh = useCallback(
    async () => {
      await execute(async () => {
        return await repository.getAppInfo();
      });
    },
    [repository, execute]
  );

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setAppInfo(null);
    setError(null);
    isInitializedRef.current = false;
  }, [setAppInfo, setError]);

  /**
   * Auto-initialize if config provided
   */
  useEffect(() => {
    if (autoInit && initialConfig && !isInitializedRef.current) {
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
