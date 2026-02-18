/**
 * Screen Factory Utilities
 *
 * Helper functions for creating stack screen configurations.
 */

import React from "react";
import type { StackScreen } from "@umituz/react-native-design-system";
import type { AdditionalScreen } from "../navigation/types";

/**
 * Create a screen with props
 */
export function createScreenWithProps<P>(
  name: string,
  component: React.ComponentType<P>,
  props: P,
  options: { headerShown?: boolean } = {}
): StackScreen {
  return {
    name,
    options: { headerShown: false, ...options },
    children: (() => React.createElement(component as React.ComponentType, props as any)) as () => React.ReactElement,
  };
}

/**
 * Convert additional screen to stack screen
 */
export function convertAdditionalScreen(screen: AdditionalScreen): StackScreen {
  const stackScreen: Partial<StackScreen> = { name: screen.name };
  if (screen.component) stackScreen.component = screen.component;
  if (screen.children) stackScreen.children = screen.children as any;
  if (screen.options) stackScreen.options = screen.options;
  return stackScreen as StackScreen;
}

/**
 * Create conditional screen
 */
export function createConditionalScreen(
  condition: boolean,
  screenFactory: () => StackScreen
): StackScreen | null {
  return condition ? screenFactory() : null;
}

/**
 * Combine screens excluding null values
 */
export function combineScreens(...screens: (StackScreen | null | StackScreen[])[]): StackScreen[] {
  const result: StackScreen[] = [];
  for (const screen of screens) {
    if (screen === null) continue;
    if (Array.isArray(screen)) {
      result.push(...screen);
    } else {
      result.push(screen);
    }
  }
  return result;
}
