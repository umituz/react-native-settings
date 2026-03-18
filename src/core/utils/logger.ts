/**
 * Logger Utility
 *
 * Centralized logging with development mode support.
 * All logging should go through this utility for consistency.
 *
 * @example
 * ```ts
 * import { logger } from '@/core/utils/logger';
 *
 * logger.info('MyComponent', 'Component mounted');
 * logger.error('MyService', 'Operation failed', error);
 * ```
 */

import { isDev } from '../../utils/devUtils';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  component?: string;
  service?: string;
  domain?: string;
  operation?: string;
}

/**
 * Centralized logger with development mode support
 */
export class Logger {
  private context: LogContext;

  constructor(context: LogContext) {
    this.context = context;
  }

  /**
   * Log info message (only in development)
   */
  info(message: string, ...args: unknown[]): void {
    if (isDev()) {
      const prefix = this.formatPrefix('INFO');
      console.log(prefix, message, ...args);
    }
  }

  /**
   * Log warning message (only in development)
   */
  warn(message: string, ...args: unknown[]): void {
    if (isDev()) {
      const prefix = this.formatPrefix('WARN');
      console.warn(prefix, message, ...args);
    }
  }

  /**
   * Log error message (only in development)
   */
  error(message: string, error?: unknown, ...args: unknown[]): void {
    if (isDev()) {
      const prefix = this.formatPrefix('ERROR');
      console.error(prefix, message, error, ...args);
    }
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, ...args: unknown[]): void {
    if (isDev()) {
      const prefix = this.formatPrefix('DEBUG');
      console.log(prefix, message, ...args);
    }
  }

  /**
   * Create a child logger with additional context
   */
  child(additionalContext: Partial<LogContext>): Logger {
    return new Logger({ ...this.context, ...additionalContext });
  }

  /**
   * Format log prefix with context
   */
  private formatPrefix(level: LogLevel): string {
    const parts = [`[${level}]`];

    if (this.context.domain) {
      parts.push(this.context.domain);
    }

    if (this.context.service) {
      parts.push(this.context.service);
    }

    if (this.context.component) {
      parts.push(this.context.component);
    }

    if (this.context.operation) {
      parts.push(`#${this.context.operation}`);
    }

    return parts.join(' | ');
  }
}

/**
 * Create a logger instance with context
 *
 * @example
 * ```ts
 * const logger = createLogger({ component: 'MyComponent' });
 * logger.info('Something happened');
 * // Output: [INFO] | MyComponent: Something happened
 * ```
 */
export function createLogger(context: LogContext): Logger {
  return new Logger(context);
}

/**
 * Default logger instance for quick usage
 */
export const logger = new Logger({});

/**
 * Convenience functions for quick logging
 */
export const log = {
  info: (message: string, ...args: unknown[]) => logger.info(message, ...args),
  warn: (message: string, ...args: unknown[]) => logger.warn(message, ...args),
  error: (message: string, error?: unknown, ...args: unknown[]) =>
    logger.error(message, error, ...args),
  debug: (message: string, ...args: unknown[]) => logger.debug(message, ...args),
};
