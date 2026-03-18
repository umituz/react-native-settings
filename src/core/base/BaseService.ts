/**
 * BaseService
 *
 * Abstract base class for all domain services.
 * Provides consistent error handling, logging, and result patterns.
 *
 * @example
 * ```ts
 * class MyService extends BaseService {
 *   protected serviceName = 'MyService';
 *
 *   async doSomething(input: Input): Promise<Data> {
 *     return this.execute('doSomething', async () => {
 *       // Your logic here
 *       return result;
 *     });
 *   }
 * }
 * ```
 */

import { isDev } from '../../utils/devUtils';
import { formatErrorMessage } from '../../utils/errorUtils';

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type AsyncResult<T> = Promise<Result<T>>;

/**
 * Abstract base service with error handling and logging
 */
export abstract class BaseService {
  /**
   * Service name for logging (must be implemented by subclass)
   */
  protected abstract serviceName: string;

  /**
   * Execute an operation with automatic error handling and logging
   *
   * @param operation - Operation name for logging
   * @param fn - Async function to execute
   * @returns Result object with success flag
   */
  protected async execute<T>(
    operation: string,
    fn: () => Promise<T>
  ): AsyncResult<T> {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error) {
      this.logError(operation, error);
      return { success: false, error: formatErrorMessage(error) };
    }
  }

  /**
   * Execute without error handling (for critical operations that should crash)
   *
   * @param operation - Operation name for logging
   * @param fn - Async function to execute
   * @returns Direct result from function
   */
  protected async executeUnsafe<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      this.logError(operation, error);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Execute a synchronous operation with error handling
   *
   * @param operation - Operation name for logging
   * @param fn - Sync function to execute
   * @returns Result object with success flag
   */
  protected executeSync<T>(
    operation: string,
    fn: () => T
  ): Result<T> {
    try {
      const data = fn();
      return { success: true, data };
    } catch (error) {
      this.logError(operation, error);
      return { success: false, error: formatErrorMessage(error) };
    }
  }

  /**
   * Log error in development mode
   *
   * @param operation - Operation name
   * @param error - Error to log
   */
  protected logError(operation: string, error: unknown): void {
    if (isDev()) {
      console.error(`[${this.serviceName}] ${operation}:`, error);
    }
  }

  /**
   * Log info in development mode
   *
   * @param operation - Operation name
   * @param message - Message to log
   */
  protected logInfo(operation: string, message: string): void {
    if (isDev()) {
      console.log(`[${this.serviceName}] ${operation}:`, message);
    }
  }

  /**
   * Log warning in development mode
   *
   * @param operation - Operation name
   * @param message - Warning message
   */
  protected logWarning(operation: string, message: string): void {
    if (isDev()) {
      console.warn(`[${this.serviceName}] ${operation}:`, message);
    }
  }

  /**
   * Check if running in development mode
   */
  protected get isDev(): boolean {
    return isDev();
  }
}
