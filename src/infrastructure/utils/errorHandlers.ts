/**
 * Error Handling Utilities
 * Centralized error handling and error message generation
 * FIXED: Added safety checks for showToast and proper error handling
 */

/**
 * Error types for better error classification
 */
export enum ErrorType {
  NETWORK = "NETWORK",
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

/**
 * Custom error class with error type
 */
export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType = ErrorType.UNKNOWN,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Error handler result
 */
export interface ErrorHandlerResult {
  message: string;
  type: ErrorType;
  shouldShowToUser: boolean;
}

/**
 * Classify error based on error properties
 */
export const classifyError = (error: unknown): ErrorType => {
  if (error instanceof AppError) {
    return error.type;
  }

  if (!(error instanceof Error)) {
    return ErrorType.UNKNOWN;
  }

  const errorMessage = error.message.toLowerCase();

  // Network errors
  if (
    errorMessage.includes("network") ||
    errorMessage.includes("fetch") ||
    errorMessage.includes("connection")
  ) {
    return ErrorType.NETWORK;
  }

  // Authentication errors
  if (
    errorMessage.includes("unauthorized") ||
    errorMessage.includes("unauthenticated") ||
    errorMessage.includes("token") ||
    errorMessage.includes("401")
  ) {
    return ErrorType.AUTHENTICATION;
  }

  // Authorization errors
  if (
    errorMessage.includes("forbidden") ||
    errorMessage.includes("permission") ||
    errorMessage.includes("403")
  ) {
    return ErrorType.AUTHORIZATION;
  }

  // Not found errors
  if (
    errorMessage.includes("not found") ||
    errorMessage.includes("404")
  ) {
    return ErrorType.NOT_FOUND;
  }

  // Server errors
  if (
    errorMessage.includes("500") ||
    errorMessage.includes("502") ||
    errorMessage.includes("503")
  ) {
    return ErrorType.SERVER;
  }

  return ErrorType.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyErrorMessage = (
  error: unknown,
  context?: {
    operation?: string;
    entity?: string;
  }
): ErrorHandlerResult => {
  const errorType = classifyError(error);

  let message = "An unexpected error occurred";
  let shouldShowToUser = true;

  switch (errorType) {
    case ErrorType.NETWORK:
      message = "Unable to connect. Please check your internet connection and try again.";
      break;

    case ErrorType.AUTHENTICATION:
      message = "Your session has expired. Please sign in again.";
      break;

    case ErrorType.AUTHORIZATION:
      message = "You don't have permission to perform this action.";
      break;

    case ErrorType.NOT_FOUND:
      if (context?.entity) {
        // FIXED: Sanitize entity name to prevent injection
        const sanitizedEntity = String(context.entity).replace(/[<>]/g, "");
        message = `${sanitizedEntity} not found`;
      } else {
        message = "The requested resource was not found.";
      }
      break;

    case ErrorType.SERVER:
      message = "Server error. Please try again later.";
      shouldShowToUser = false;
      break;

    case ErrorType.VALIDATION:
      message = error instanceof Error ? error.message : "Invalid input";
      break;

    default:
      if (error instanceof Error) {
        message = error.message;
      }
  }

  return { message, type: errorType, shouldShowToUser };
};

/**
 * Log error appropriately based on type
 */
export const logError = (
  error: unknown,
  context?: {
    operation?: string;
    userId?: string;
    additionalInfo?: Record<string, unknown>;
  }
): void => {
  const errorType = classifyError(error);
  const errorMessage = error instanceof Error ? error.message : String(error);

  const logData = {
    type: errorType,
    message: errorMessage,
    operation: context?.operation,
    userId: context?.userId,
    ...context?.additionalInfo,
  };

  // In production, send to error tracking service
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[Error]", logData);
  }

  // TODO: Send to error tracking service in production
  // ErrorTracking.captureException(error, logData);
};

/**
 * Handle error with logging and user message
 */
export const handleError = (
  error: unknown,
  context?: {
    operation?: string;
    entity?: string;
    userId?: string;
    showToast?: (message: string) => void;
  }
): ErrorHandlerResult => {
  // Log the error
  logError(error, context);

  // Get user-friendly message
  const result = getUserFriendlyErrorMessage(error, context);

  // Show toast if provided and safe to do so
  // FIXED: Added safety check and try-catch for showToast
  if (context?.showToast && result.shouldShowToUser) {
    try {
      if (typeof context.showToast === "function") {
        context.showToast(result.message);
      }
    } catch (toastError) {
      // Log toast error but don't crash error handling
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[ErrorHandlers] showToast failed:", toastError);
      }
    }
  }

  return result;
};

/**
 * Wrap an async function with error handling
 */
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  options: {
    operation?: string;
    entity?: string;
    showToast?: (message: string) => void;
    onError?: (result: ErrorHandlerResult) => void;
  }
): Promise<{ success: true; data: T } | { success: false; error: ErrorHandlerResult }> => {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const errorResult = handleError(error, options);
    options?.onError?.(errorResult);
    return { success: false, error: errorResult };
  }
};
