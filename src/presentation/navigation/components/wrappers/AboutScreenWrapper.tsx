/**
 * About Screen Wrapper Component
 */
import React from "react";
import { AboutScreen } from "../../../../domains/about";
import type { AboutConfig } from "../../../../domains/about/domain/entities/AppInfo";

export interface AboutScreenWrapperProps {
  config: AboutConfig;
}

export const AboutScreenWrapper: React.FC<AboutScreenWrapperProps> = ({
  config,
}) => <AboutScreen config={config} />;
