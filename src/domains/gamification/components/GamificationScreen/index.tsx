/**
 * GamificationScreen Component
 * Full gamification screen with integrated hook
 * Generic for 100+ apps - NO hardcoded strings
 *
 * Split into multiple files to keep each under 200 lines:
 * - GamificationScreen.tsx: Pure presentational component
 * - GamificationScreenWithConfig.tsx: Config-based version with hook
 * - index.tsx: Main entry point that routes to appropriate component
 */

import React from "react";
import { GamificationScreenInner } from "./GamificationScreen";
import { GamificationScreenWithConfig } from "./GamificationScreenWithConfig";
import type { GamificationScreenProps, GamificationConfigProps } from "./types";

/**
 * GamificationScreen that accepts either detailed props OR a config object
 * When config is provided, a hook consumer component is used
 */
export const GamificationScreen: React.FC<GamificationScreenProps | GamificationConfigProps> = (props) => {
  // If config is provided, use the hook-based component
  if ('config' in props && props.config) {
    return <GamificationScreenWithConfig config={props.config} />;
  }

  // Otherwise, render directly with provided props
  return <GamificationScreenInner {...(props as GamificationScreenProps)} />;
};

