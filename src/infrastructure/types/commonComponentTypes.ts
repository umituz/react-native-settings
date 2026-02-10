/**
 * Common Component Types
 * Shared interfaces for common component props to reduce duplication
 */

import type { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "@umituz/react-native-design-system";

/**
 * Base props for settings item components
 */
export interface BaseSettingsItemProps {
  title: string;
  description?: string;
  icon?: IconName;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Base props for card components
 */
export interface BaseCardProps {
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Base props for section components
 */
export interface BaseSectionProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Navigation item props
 */
export interface NavigationItemProps extends BaseSettingsItemProps {
  route?: string;
  showChevron?: boolean;
}

/**
 * Toggle item props (items with switches)
 */
export interface ToggleItemProps extends BaseSettingsItemProps {
  showSwitch: true;
  switchValue: boolean;
  onSwitchChange: (value: boolean) => void;
}

/**
 * Pressable item props
 */
export interface PressableItemProps extends BaseSettingsItemProps {
  onPress: () => void;
}

/**
 * Icon styling props
 */
export interface IconStyleProps {
  iconBgColor?: string;
  iconColor?: string;
  iconSize?: number;
}

/**
 * Loading state props
 */
export interface LoadingStateProps {
  loading?: boolean;
}

/**
 * Badge props (for notification counts, etc.)
 */
export interface BadgeProps {
  badge?: string | number;
  badgeColor?: string;
  badgeTextColor?: string;
}

/**
 * Screen header props
 */
export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * List item props
 */
export interface ListItemProps extends BaseSettingsItemProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

/**
 * Modal props
 */
export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  testID?: string;
}

/**
 * Form input props
 */
export interface BaseInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Button props
 */
export interface BaseButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
