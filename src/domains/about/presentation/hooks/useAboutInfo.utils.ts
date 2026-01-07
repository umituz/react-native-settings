/**
 * useAboutInfo Hook Utilities
 * Shared utility functions for about info hook
 */

import type { MutableRefObject } from 'react';
import type { AppInfo, AboutConfig } from '../../domain/entities/AppInfo';
import type { AboutRepository } from '../../infrastructure/repositories/AboutRepository';
import { createDefaultAppInfo } from '../../utils/AppInfoFactory';

/**
 * Safely set error if component is mounted
 */
export const setErrorIfMounted = (
  isMountedRef: MutableRefObject<boolean>,
  setError: (error: string | null) => void,
  err: string | null
) => {
  if (isMountedRef.current) {
    setError(err);
  }
};

/**
 * Safely set loading state if component is mounted
 */
export const setLoadingIfMounted = (
  isMountedRef: MutableRefObject<boolean>,
  setLoading: (loading: boolean) => void,
  value: boolean
) => {
  if (isMountedRef.current) {
    setLoading(value);
  }
};

/**
 * Initialize app info with config
 */
export const initializeAppInfo = async (
  config: AboutConfig,
  repository: AboutRepository,
  isMountedRef: MutableRefObject<boolean>,
  isInitializedRef: MutableRefObject<boolean>,
  setAppInfo: (info: AppInfo | null) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void,
  force = false
): Promise<void> => {
  if (isInitializedRef.current && !force) {
    return;
  }

  if (!isMountedRef.current) {
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const defaultAppInfo = createDefaultAppInfo(config);
    await repository.saveAppInfo(defaultAppInfo);

    if (isMountedRef.current) {
      setAppInfo(defaultAppInfo);
      isInitializedRef.current = true;
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};

/**
 * Update app info with new config
 */
export const updateAppInfoConfig = async (
  config: AboutConfig,
  repository: AboutRepository,
  isMountedRef: MutableRefObject<boolean>,
  setAppInfo: (info: AppInfo | null) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  if (!isMountedRef.current) {
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const updatedAppInfo = createDefaultAppInfo(config);
    await repository.saveAppInfo(updatedAppInfo);

    if (isMountedRef.current) {
      setAppInfo(updatedAppInfo);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};

/**
 * Update app info with partial updates
 */
export const updateAppInfoPartial = async (
  updates: Partial<AppInfo>,
  repository: AboutRepository,
  isMountedRef: MutableRefObject<boolean>,
  setAppInfo: (info: AppInfo | null) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  if (!isMountedRef.current) {
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const updatedInfo = await repository.updateAppInfo(updates);

    if (isMountedRef.current) {
      setAppInfo(updatedInfo);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};

/**
 * Refresh app info from repository
 */
export const refreshAppInfo = async (
  repository: AboutRepository,
  isMountedRef: MutableRefObject<boolean>,
  setAppInfo: (info: AppInfo | null) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  if (!isMountedRef.current) {
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const refreshedInfo = await repository.getAppInfo();

    if (isMountedRef.current) {
      setAppInfo(refreshedInfo);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};
