/**
 * Core Async Operation Utilities
 * Base types and handlers for async operations
 */

import type { ValidationResult } from "../validation";

/**
 * Result type for async operations
 */
export type AsyncResult<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Generic async handler with error handling
 */
export const handleAsyncOperation = async <T>(
  operation: () => Promise<T>,
  onError?: (error: Error) => void
): Promise<AsyncResult<T>> => {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (onError) {
      onError(err);
    }
    return { success: false, error: err };
  }
};

/**
 * Async operation with loading state
 * FIXED: Properly handles errors in onSuccess callback
 */
export const createAsyncHandler = <T extends unknown[], R>(
  handler: (...args: T) => Promise<R>,
  options: {
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    onError?: (error: Error) => void;
    onSuccess?: (result: R) => void;
  }
) => {
  return async (...args: T): Promise<void> => {
    const { onLoadingStart, onLoadingEnd, onError, onSuccess } = options;

    let loadingStarted = false;

    try {
      onLoadingStart?.();
      loadingStarted = true;
      const result = await handler(...args);
      // FIXED: Wrap onSuccess in try-catch to handle errors separately
      try {
        onSuccess?.(result);
      } catch (callbackError) {
        // Log callback error but don't treat it as handler error
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[createAsyncHandler] onSuccess callback error:", callbackError);
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
    } finally {
      // FIXED: Only call onLoadingEnd if it was started
      if (loadingStarted) {
        try {
          onLoadingEnd?.();
        } catch (callbackError) {
          // Log callback error but don't throw
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[createAsyncHandler] onLoadingEnd callback error:", callbackError);
          }
        }
      }
    }
  };
};

/**
 * Async operation with validation
 */
export const createValidatedAsyncHandler = <T, R>(
  validator: (data: T) => ValidationResult,
  handler: (data: T) => Promise<R>,
  options: {
    onValidationError?: (error: string) => void;
    onError?: (error: Error) => void;
  } = {}
) => {
  return async (data: T): Promise<AsyncResult<R>> => {
    const { onValidationError, onError } = options;

    // Validate first
    const validationResult = validator(data);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.error || "Validation failed");
      onValidationError?.(error.message);
      return { success: false, error };
    }

    // Execute handler
    return handleAsyncOperation(() => handler(data), onError);
  };
};
