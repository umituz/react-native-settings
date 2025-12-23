/**
 * Legal Config
 * Configuration for the Legal section
 */
export interface LegalConfig {
    /** Section title */
    title?: string;
    /** Section description */
    description?: string;
    /** Navigation route name */
    route?: string;
    /** Default navigation route name */
    defaultRoute?: string;
    /** Privacy Policy title */
    privacyTitle?: string;
    /** Terms of Service title */
    termsTitle?: string;
    /** EULA title */
    eulaTitle?: string;
    /** Privacy Policy URL */
    privacyUrl?: string;
    /** Terms of Service URL */
    termsUrl?: string;
    /** EULA URL */
    eulaUrl?: string;
}
