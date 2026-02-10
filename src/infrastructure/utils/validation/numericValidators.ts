/**
 * Numeric Validators
 * Validation functions for numeric inputs
 */

import type { ValidationResult } from "./core";

/**
 * Validates a rating value (1-5)
 */
export const validateRating = (rating: number): ValidationResult => {
  if (rating < 1 || rating > 5) {
    return { isValid: false, error: "Rating must be between 1 and 5" };
  }
  return { isValid: true };
};

/**
 * Validates a number is within a range
 */
export const validateRange = (
  value: number,
  min: number,
  max: number,
  fieldName?: string
): ValidationResult => {
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `${fieldName || "Value"} must be between ${min} and ${max}`,
    };
  }
  return { isValid: true };
};

/**
 * Validates a positive number
 */
export const validatePositiveNumber = (
  value: number,
  fieldName?: string
): ValidationResult => {
  if (value <= 0) {
    return {
      isValid: false,
      error: `${fieldName || "Value"} must be greater than 0`,
    };
  }
  return { isValid: true };
};

/**
 * Validates a non-negative number
 */
export const validateNonNegativeNumber = (
  value: number,
  fieldName?: string
): ValidationResult => {
  if (value < 0) {
    return {
      isValid: false,
      error: `${fieldName || "Value"} must be 0 or greater`,
    };
  }
  return { isValid: true };
};
