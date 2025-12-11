/**
 * About & Legal Section Component
 * Single Responsibility: Render about and legal settings section
 */
import React from "react";
import type { AboutConfig, LegalConfig } from "../types";
interface AboutLegalSectionProps {
    showAbout: boolean;
    showLegal: boolean;
    aboutConfig?: AboutConfig;
    legalConfig?: LegalConfig;
}
export declare const AboutLegalSection: React.FC<AboutLegalSectionProps>;
export {};
//# sourceMappingURL=AboutLegalSection.d.ts.map