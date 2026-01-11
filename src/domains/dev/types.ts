/**
 * Dev Domain Types
 * Environment variable types for dev tools
 */

export interface EnvVariable {
  /** Environment variable key */
  key: string;
  /** Environment variable value (masked if sensitive) */
  value: string;
  /** Whether this is a sensitive value (API keys, secrets) */
  sensitive?: boolean;
}

export interface EnvConfig {
  /** List of environment variables to display */
  variables: EnvVariable[];
  /** App version info */
  version?: string;
  /** Build number */
  buildNumber?: string;
  /** Environment name (development, staging, production) */
  environmentName?: string;
}
