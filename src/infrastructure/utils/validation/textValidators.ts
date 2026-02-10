/**
 * Text Validators
 * Validation functions for text-based inputs
 */

import type { ValidationResult, TextValidationOptions } from "./core";

/**
 * Validates a text field based on provided options
 */
export const validateTextField = (
  value: string,
  options: TextValidationOptions = {}
): ValidationResult => {
  const {
    minLength,
    maxLength,
    required = false,
    pattern,
    customValidator,
  } = options;

  // Check required
  if (required && !value.trim()) {
    return { isValid: false, error: "This field is required" };
  }

  // Skip other validations if empty and not required
  if (!value.trim() && !required) {
    return { isValid: true };
  }

  // Check min length
  if (minLength && value.length < minLength) {
    return { isValid: false, error: `Minimum length is ${minLength} characters` };
  }

  // Check max length
  if (maxLength && value.length > maxLength) {
    return { isValid: false, error: `Maximum length is ${maxLength} characters` };
  }

  // Check pattern
  if (pattern && !pattern.test(value)) {
    return { isValid: false, error: "Invalid format" };
  }

  // Custom validator
  if (customValidator) {
    const customError = customValidator(value);
    if (customError) {
      return { isValid: false, error: customError };
    }
  }

  return { isValid: true };
};

/**
 * Validates an email address
 */
export const validateEmail = (
  email: string,
  options: { required?: boolean; allowEmpty?: boolean } = {}
): ValidationResult => {
  const { required = false, allowEmpty = false } = options;

  // Check if empty
  if (!email.trim()) {
    if (required && !allowEmpty) {
      return { isValid: false, error: "Email is required" };
    }
    return { isValid: true };
  }

  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { isValid: false, error: "Invalid email address" };
  }

  return { isValid: true };
};

/**
 * Validates a URL
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url.trim()) {
    return { isValid: true };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Invalid URL" };
  }
};

/**
 * Validates a phone number (basic validation)
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: true };
  }

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if length is reasonable (10-15 digits)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, error: "Invalid phone number" };
  }

  return { isValid: true };
};
