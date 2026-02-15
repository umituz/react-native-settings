/**
 * withErrorBoundary HOC
 * Wraps screens with SettingsErrorBoundary for error handling
 */

import React from 'react';
import { SettingsErrorBoundary } from './SettingsErrorBoundary';

export interface WithErrorBoundaryOptions {
  domainName: string;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Higher-Order Component to wrap screens with ErrorBoundary
 *
 * @example
 * ```tsx
 * export const AppearanceScreen = withErrorBoundary(
 *   AppearanceScreenComponent,
 *   { domainName: 'Appearance' }
 * );
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorBoundaryOptions
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <SettingsErrorBoundary
        domainName={options.domainName}
        fallback={options.fallback}
        onError={options.onError}
      >
        <Component {...props} />
      </SettingsErrorBoundary>
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
