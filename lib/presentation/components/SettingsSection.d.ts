/**
 * Settings Section Component
 * Single Responsibility: Render a settings section with title and container
 */
import React from "react";
export interface SettingsSectionProps {
    /** Section title */
    title: string;
    /** Section content */
    children: React.ReactNode;
}
export declare const SettingsSection: React.FC<SettingsSectionProps>;
//# sourceMappingURL=SettingsSection.d.ts.map