/**
 * Form Validators
 * Domain-specific form validation functions
 */

import type { ValidationResult } from "./core";
import { validateRating } from "./numericValidators";
import { TEXT_LENGTH_LIMITS } from "../constants/textLimits";

/**
 * Feedback form validation
 */
export const validateFeedbackForm = (data: {
  type: string;
  rating: number;
  description: string;
}): ValidationResult => {
  // Validate rating
  const ratingResult = validateRating(data.rating);
  if (!ratingResult.isValid) {
    return ratingResult;
  }

  // Validate description (required)
  if (!data.description.trim()) {
    return { isValid: false, error: "Please provide a description" };
  }

  // Check description length
  if (data.description.length < 10) {
    return { isValid: false, error: "Description must be at least 10 characters" };
  }

  if (data.description.length > TEXT_LENGTH_LIMITS.BODY) {
    return { isValid: false, error: `Description must be less than ${TEXT_LENGTH_LIMITS.BODY} characters` };
  }

  return { isValid: true };
};

/**
 * Reminder form validation
 */
export const validateReminderForm = (data: {
  title: string;
  body?: string;
  frequency: string;
  hour?: number;
  minute?: number;
  weekday?: number;
  maxTitleLength?: number;
  maxBodyLength?: number;
}): ValidationResult => {
  // Validate title
  if (!data.title.trim()) {
    return { isValid: false, error: "Title is required" };
  }

  if (data.maxTitleLength && data.title.length > data.maxTitleLength) {
    return { isValid: false, error: `Title must be less than ${data.maxTitleLength} characters` };
  }

  // Validate body length if provided
  if (data.body && data.maxBodyLength && data.body.length > data.maxBodyLength) {
    return { isValid: false, error: `Body must be less than ${data.maxBodyLength} characters` };
  }

  // Validate time values if provided
  if (data.hour !== undefined && (data.hour < 0 || data.hour > 23)) {
    return { isValid: false, error: "Hour must be between 0 and 23" };
  }

  if (data.minute !== undefined && (data.minute < 0 || data.minute > 59)) {
    return { isValid: false, error: "Minute must be between 0 and 59" };
  }

  // Validate weekday if frequency is weekly
  if (data.frequency === "weekly" && (data.weekday === undefined || data.weekday < 0 || data.weekday > 6)) {
    return { isValid: false, error: "Please select a valid day" };
  }

  return { isValid: true };
};
