/**
 * Core Validation Utilities
 * Base validation interfaces and types
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Text validation options
 */
export interface TextValidationOptions {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

/**
 * Email validation options
 */
export interface EmailValidationOptions {
  required?: boolean;
  allowEmpty?: boolean;
}

/**
 * Password validation options
 */
export interface PasswordValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
}
