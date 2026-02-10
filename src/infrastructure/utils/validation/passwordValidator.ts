/**
 * Password Validator
 * Password-specific validation logic
 */

import type { ValidationResult, PasswordValidationOptions } from "./core";

/**
 * Validates a password
 */
export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult => {
  const {
    minLength = 8,
    requireUppercase = false,
    requireLowercase = false,
    requireNumber = false,
    requireSpecialChar = false,
  } = options;

  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`at least ${minLength} characters`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push("one lowercase letter");
  }

  if (requireNumber && !/\d/.test(password)) {
    errors.push("one number");
  }

  if (requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("one special character");
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      error: `Password must contain ${errors.join(", ")}`,
    };
  }

  return { isValid: true };
};
