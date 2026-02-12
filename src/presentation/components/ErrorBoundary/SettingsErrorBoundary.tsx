/**
 * Settings Error Boundary
 *
 * Generic error boundary component for Settings domains.
 * Catches JavaScript errors in child component tree and displays fallback UI.
 */

import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { devError } from '../../../utils/devUtils';

export interface SettingsErrorBoundaryProps {
  children: ReactNode;
  domainName: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface SettingsErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for Settings domains
 *
 * @example
 * ```tsx
 * <SettingsErrorBoundary domainName="Appearance">
 *   <AppearanceSection {...props} />
 * </SettingsErrorBoundary>
 * ```
 */
export class SettingsErrorBoundary extends Component<
  SettingsErrorBoundaryProps,
  SettingsErrorBoundaryState
> {
  constructor(props: SettingsErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SettingsErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { domainName, onError } = this.props;

    // Log error in development
    devError(`[${domainName}] Error caught by boundary:`, error, errorInfo);

    // Call custom error handler if provided
    onError?.(error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback, domainName } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {domainName} encountered an error. Please try again.
          </Text>
        </View>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});
