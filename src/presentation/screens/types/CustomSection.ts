/**
 * Custom Settings Section Type
 * Allows apps to add custom sections to the settings screen
 */

import type { ReactNode } from "react";

/**
 * Custom Settings Section
 */
export interface CustomSettingsSection {
  /** Section title */
  title: string;
  /** Section content (React nodes) */
  content: ReactNode;
  /** Section order (lower = higher in list) */
  order?: number;
  /** Section ID for identification */
  id?: string;
}