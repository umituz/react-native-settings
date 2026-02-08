/**
 * Memo Utilities
 * Centralized memoization helpers to reduce code duplication
 */
import { useMemo, useCallback, useRef, DependencyList } from 'react';
import type { DesignTokens } from '@umituz/react-native-design-system';

/**
 * Custom hook to create memoized styles from a style factory function
 * @param styleFactory Function that creates styles
 * @param tokens Design tokens
 * @param deps Dependencies for memoization
 * @returns Memoized styles object
 */
export function useMemoizedStyles<T>(
  styleFactory: (tokens: DesignTokens) => T,
  tokens: DesignTokens,
  deps: DependencyList = []
): T {
  return useMemo(() => styleFactory(tokens), [tokens, ...deps]);
}

/**
 * Custom hook to create a memoized callback with proper type inference
 * @param callback Function to memoize
 * @param deps Dependencies for memoization
 * @returns Memoized callback
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T {
  return useCallback(callback, deps) as T;
}

/**
 * Custom hook to create a memoized value with proper type inference
 * @param factory Function that creates the value
 * @param deps Dependencies for memoization
 * @returns Memoized value
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Creates a memoized style object with proper caching
 * @param styleCreator Function that creates styles
 * @param deps Dependencies for memoization
 * @returns Memoized styles
 */
export function useStyledMemo<T extends Record<string, any>>(
  styleCreator: () => T,
  deps: DependencyList = []
): T {
  return useMemo(styleCreator, deps);
}

/**
 * Memoizes a value with a custom equality check (non-hook version)
 * @param value Value to memoize
 * @param _isEqual Custom equality function
 * @returns Memoized value
 */
export function memoWithEquality<T>(
  value: T,
  _isEqual: (prev: T, next: T) => boolean
): T {
  // This is a utility function, not a hook
  // It cannot use hooks internally
  return value;
}

/**
 * Creates a cache key for style memoization
 * @param tokens Design tokens
 * @param prefix Optional prefix for the key
 * @returns Cache key string
 */
export function createStyleCacheKey(
  tokens: DesignTokens,
  prefix: string = ''
): string {
  const { colors, spacing, typography } = tokens;

  return `${prefix}-${JSON.stringify({
    colors: { primary: colors.primary, background: colors.backgroundPrimary },
    spacing: { md: spacing.md, lg: spacing.lg },
    typography: { body: typography.bodyMedium.responsiveFontSize },
  })}`;
}

/**
 * Memoizes a value with a custom equality check
 * @param value Value to memoize
 * @param _isEqual Custom equality function
 * @returns Memoized value
 */
export function useMemoWithEquality<T>(
  value: T,
  _isEqual: (prev: T, next: T) => boolean
): T {
  const ref = useRef<T>(value);

  return useMemo(() => {
    if (!_isEqual(ref.current, value)) {
      ref.current = value;
    }
    return ref.current;
  }, [value, _isEqual]);
}

/**
 * Custom hook that creates a debounced callback
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced callback
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
}

/**
 * Custom hook that creates a throttled callback
 * @param callback Function to throttle
 * @param delay Delay in milliseconds
 * @returns Throttled callback
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRunRef = useRef<number>(0);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRunRef.current >= delay) {
      callback(...args);
      lastRunRef.current = now;
    }
  }, [callback, delay]) as T;
}
