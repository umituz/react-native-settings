/**
 * Validation Utilities
 * Barrel export for all validation modules
 */

export * from "./core";
export * from "./textValidators";
export * from "./passwordValidator";
export * from "./numericValidators";
export * from "./formValidators";

import type { ValidationResult } from "./core";

/**
 * Form field validator factory
 * Creates a validator function for a specific field
 */
export const createFieldValidator = <T>(
  validator: (value: T) => ValidationResult
) => {
  return (value: T): ValidationResult => validator(value);
};

/**
 * Multi-field validator
 * Validates multiple fields and returns the first error
 */
export const validateMultipleFields = (
  fields: Record<string, ValidationResult>
): ValidationResult => {
  for (const result of Object.values(fields)) {
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};
