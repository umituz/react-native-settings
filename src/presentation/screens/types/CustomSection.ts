import type { ReactNode } from "react";
import type { IconName } from "@umituz/react-native-design-system";

/**
 * Custom Settings Item
 */
export interface CustomSettingsItem {
  /** Item unique ID */
  id: string;
  /** Item title */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Icon name (Ionicons) */
  icon: IconName;
  /** Press handler */
  onPress: () => void;
  /** Optional right icon (Ionicons) */
  rightIcon?: IconName;
  /** Optional icon color */
  iconColor?: string;
  /** Optional icon background color */
  iconBgColor?: string;
}

/**
 * Custom Settings Section
 */
export interface CustomSettingsSection {
  /** Section title */
  title: string;
  /** Section content (React nodes) - takes priority over items */
  content?: ReactNode;
  /** List of settings items to render */
  items?: CustomSettingsItem[];
  /** Section order (lower = higher in list) */
  order?: number;
  /** Section ID for identification */
  id?: string;
}