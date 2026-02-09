/**
 * Validation Utilities
 *
 * Provides validation functions for component props.
 */

export interface ValidationWarning {
  message: string;
  value: unknown;
}

/**
 * Validate settings item title
 */
export function validateTitle(title: unknown): ValidationWarning | null {
  if (!title || typeof title !== "string") {
    return {
      message: "[SettingsItemCard] Invalid title prop",
      value: title,
    };
  }
  return null;
}

/**
 * Validate settings item description
 */
export function validateDescription(description: unknown): ValidationWarning | null {
  if (description && typeof description !== "string") {
    return {
      message: "[SettingsItemCard] Invalid description prop",
      value: description,
    };
  }
  return null;
}

/**
 * Validate switch props
 */
export function validateSwitchProps(
  showSwitch: boolean,
  onSwitchChange?: ((value: boolean) => void) | null
): ValidationWarning | null {
  if (showSwitch && !onSwitchChange) {
    return {
      message: "[SettingsItemCard] Switch shown but no onSwitchChange provided",
      value: { showSwitch, hasOnSwitchChange: !!onSwitchChange },
    };
  }
  return null;
}

/**
 * Return validation result (no logging)
 */
export function getValidationResult(warning: ValidationWarning | null): ValidationWarning | null {
  return warning;
}
