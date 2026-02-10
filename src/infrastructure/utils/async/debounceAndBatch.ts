/**
 * Debounce and Batch Utilities
 * Utilities for debouncing and batching async operations
 */

import type { AsyncResult } from "./core";

/**
 * Debounced async operation
 */
export const createDebouncedAsyncOperation = <T extends unknown[], R>(
  operation: (...args: T) => Promise<R>,
  delayMs: number
): ((...args: T) => Promise<R>) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: T): Promise<R> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await operation(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delayMs);
    });
  };
};

/**
 * Batch async operations
 */
export const batchAsyncOperations = async <T, R>(
  items: T[],
  operation: (item: T) => Promise<R>,
  options: {
    concurrency?: number;
    onProgress?: (completed: number, total: number) => void;
  } = {}
): Promise<AsyncResult<R[]>> => {
  const { concurrency = 5, onProgress } = options;

  try {
    const results: R[] = [];
    const batches: T[][] = [];

    // Create batches
    for (let i = 0; i < items.length; i += concurrency) {
      batches.push(items.slice(i, i + concurrency));
    }

    // Process batches
    for (const batch of batches) {
      const batchResults = await Promise.all(batch.map(operation));
      results.push(...batchResults);
      onProgress?.(results.length, items.length);
    }

    return { success: true, data: results };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err };
  }
};
