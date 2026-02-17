/**
 * Store Configuration Standards
 * Standardized patterns for all Zustand stores
 *
 * Provides consistent configuration for:
 * - Persistence settings
 * - Version management
 * - State partializing (excluding transient state)
 * - Storage service integration
 */

import type { StateStorage } from 'zustand/middleware';
import { storageService } from '@umituz/react-native-design-system';

/**
 * Standard store configuration interface
 */
export interface StandardStoreConfig<T> {
  /** Unique storage key name */
  name: string;
  /** Store version for migrations */
  version: number;
  /** Enable persistence */
  persist: boolean;
  /** Custom partialize function to control what gets persisted */
  partialize?: (state: T) => Partial<T>;
  /** Storage service (defaults to design-system's storageService) */
  storage?: StateStorage;
}

/**
 * Create standardized store configuration
 *
 * @param config - Store configuration
 * @returns Complete store config with defaults
 *
 * @example
 * ```typescript
 * const config = createStoreConfig({
 *   name: 'my-store',
 *   version: 1,
 *   persist: true,
 *   partialize: excludeTransientState,
 * });
 * ```
 */
export const createStoreConfig = <T extends object>(
  config: StandardStoreConfig<T>
): Required<StandardStoreConfig<T>> => {
  return {
    name: config.name,
    version: config.version,
    persist: config.persist,
    partialize: config.partialize || ((state) => state),
    storage: config.storage || storageService,
  };
};

/**
 * Base interface for store state with transient flags
 */
export interface BaseStoreState {
  /** Loading state (never persisted) */
  isLoading?: boolean;
  /** Initialization state (never persisted) */
  isInitialized?: boolean;
}

/**
 * Standard partialize function that excludes loading/initialization flags
 * These flags are runtime state and should never be persisted
 *
 * @param state - Store state
 * @returns State with transient flags excluded
 *
 * @example
 * ```typescript
 * const config = createStoreConfig({
 *   name: 'my-store',
 *   version: 1,
 *   persist: true,
 *   partialize: excludeTransientState,
 * });
 * ```
 */
export const excludeTransientState = <T extends BaseStoreState>(
  state: T
): Partial<T> => {
  const { isLoading: _isLoading, isInitialized: _isInitialized, ...persistedState } = state;
  return persistedState as Partial<T>;
};

/**
 * Create partialize function that excludes specific keys
 *
 * @param excludeKeys - Keys to exclude from persistence
 * @returns Partialize function
 *
 * @example
 * ```typescript
 * const partialize = createPartializeExcluding(['isLoading', 'error', 'tempData']);
 * ```
 */
export const createPartializeExcluding = <T extends object>(
  excludeKeys: (keyof T)[]
) => {
  return (state: T): Partial<T> => {
    const result = { ...state };
    excludeKeys.forEach((key) => {
      delete result[key];
    });
    return result;
  };
};
