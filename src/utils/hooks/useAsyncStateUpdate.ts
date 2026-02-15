/**
 * Async State Update Hook
 * Safely handles async operations with loading, error, and mounted state management
 *
 * Eliminates common patterns:
 * - Manual isMountedRef checks
 * - Duplicate try-catch-finally blocks
 * - Repetitive loading/error state management
 *
 * @example
 * ```typescript
 * const { data, loading, error, execute } = useAsyncStateUpdate<User>({
 *   onSuccess: (user) => console.log('User loaded:', user),
 *   onError: (error) => console.error('Failed:', error),
 * });
 *
 * const loadUser = async () => {
 *   await execute(async () => {
 *     return await api.fetchUser(userId);
 *   });
 * };
 * ```
 */
import { useState, useCallback } from 'react';
import { useMountSafety } from './useMountSafety';
import { formatErrorMessage } from '../errorUtils';

export interface AsyncStateOptions<T> {
  /** Initial data value */
  initialData?: T | null;
  /** Callback invoked on successful operation */
  onSuccess?: (data: T) => void;
  /** Callback invoked on error */
  onError?: (error: string) => void;
}

export interface AsyncStateResult<T> {
  /** Current data value */
  data: T | null;
  /** Loading state */
  loading: boolean;
  /** Error message if operation failed */
  error: string | null;
  /** Execute an async operation with automatic state management */
  execute: (operation: () => Promise<T>) => Promise<T | null>;
  /** Manually set data */
  setData: (data: T | null) => void;
  /** Manually set error */
  setError: (error: string | null) => void;
}

/**
 * Hook for managing async operations with automatic state updates
 *
 * Features:
 * - Automatic loading state management
 * - Safe mounted state checks
 * - Standardized error handling
 * - Optional success/error callbacks
 *
 * @param options - Configuration options
 * @returns Async state result with execute function
 */
export const useAsyncStateUpdate = <T = unknown>(
  options?: AsyncStateOptions<T>
): AsyncStateResult<T> => {
  const [data, setData] = useState<T | null>(options?.initialData ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useMountSafety();

  const execute = useCallback(
    async (operation: () => Promise<T>): Promise<T | null> => {
      if (!isMountedRef.current) return null;

      setLoading(true);
      setError(null);

      try {
        const result = await operation();

        if (isMountedRef.current) {
          setData(result);
          options?.onSuccess?.(result);
        }

        return result;
      } catch (err) {
        const errorMessage = formatErrorMessage(err);

        if (isMountedRef.current) {
          setError(errorMessage);
          options?.onError?.(errorMessage);
        }

        return null;
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [isMountedRef, options]
  );

  return {
    data,
    loading,
    error,
    execute,
    setData,
    setError,
  };
};
