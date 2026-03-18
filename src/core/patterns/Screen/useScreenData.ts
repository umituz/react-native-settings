/**
 * useScreenData Hook
 *
 * Generic screen data management hook.
 * Handles loading, error, and data states for screens.
 *
 * @example
 * ```ts
 * const screenData = useScreenData({
 *   fetch: async () => await api.getData(),
 *   autoFetch: true
 * });
 *
 * if (screenData.loading) return <LoadingSpinner />;
 * if (screenData.error) return <ErrorMessage error={screenData.error} />;
 * return <DataView data={screenData.data} />;
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ScreenData,
  ScreenDataState,
  ScreenDataActions,
  ScreenFetchFunction,
} from './ScreenConfig';

export interface UseScreenDataOptions<T> {
  /**
   * Fetch function to load data
   */
  fetch: ScreenFetchFunction<T>;

  /**
   * Auto-fetch on mount
   */
  autoFetch?: boolean;

  /**
   * Initial data
   */
  initialData?: T | null;

  /**
   * Dependencies for re-fetching
   */
  deps?: unknown[];

  /**
   * Error handler
   */
  onError?: (error: Error) => void;

  /**
   * Success handler
   */
  onSuccess?: (data: T) => void;
}

/**
 * Generic screen data management hook
 */
export function useScreenData<T>(options: UseScreenDataOptions<T>): ScreenData<T> {
  const {
    fetch,
    autoFetch = true,
    initialData = null,
    deps = [],
    onError,
    onSuccess,
  } = options;

  const [state, setState] = useState<ScreenDataState<T>>({
    loading: autoFetch,
    error: null,
    data: initialData,
    initialized: false,
  });

  const isMountedRef = useRef(true);
  const isFetchingRef = useRef(false);

  // Update mounted ref
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Reset function
  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null,
      initialized: false,
    });
  }, []);

  // Set loading function
  const setLoading = useCallback((loading: boolean) => {
    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, loading }));
    }
  }, []);

  // Set error function
  const setError = useCallback((error: string | null) => {
    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, error, loading: false }));
    }
  }, []);

  // Set data function
  const setData = useCallback((data: T | null) => {
    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, data, loading: false, error: null, initialized: true }));
    }
  }, []);

  // Refresh function
  const refresh = useCallback(async () => {
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetch();

      if (isMountedRef.current) {
        setState((prev) => ({
          ...prev,
          data,
          loading: false,
          error: null,
          initialized: true,
        }));
        onSuccess?.(data);
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        onError?.(error as Error);
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [fetch, setLoading, setError, onSuccess, onError]);

  // Auto-fetch on mount and dependency changes
  useEffect(() => {
    if (autoFetch && !state.initialized) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, state.initialized, ...deps]);

  return {
    ...state,
    setLoading,
    setError,
    setData,
    reset,
    refresh,
  };
}

/**
 * Simple version for basic use cases
 *
 * @example
 * ```ts
 * const { loading, error, data, refresh } = useSimpleScreenData(
 *   async () => await api.getData()
 * );
 * ```
 */
export function useSimpleScreenData<T>(
  fetch: ScreenFetchFunction<T>,
  autoFetch = true
): ScreenDataState<T> & { refresh: () => Promise<void> } {
  const screenData = useScreenData({ fetch, autoFetch });

  return {
    loading: screenData.loading,
    error: screenData.error,
    data: screenData.data,
    initialized: screenData.initialized,
    refresh: screenData.refresh,
  };
}
