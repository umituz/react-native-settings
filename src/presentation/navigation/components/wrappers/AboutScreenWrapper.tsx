/**
 * About Screen Wrapper Component
 */
import React from "react";
import { AboutScreen } from "../../../../domains/about";

export interface AboutScreenWrapperProps {
  config: any;
}

export const AboutScreenWrapper: React.FC<AboutScreenWrapperProps> = ({
  config,
}) => <AboutScreen config={config} />;
