/**
 * Tests for SettingsErrorBoundary Component
 */

import React from 'react';
import { render, Text } from '@testing-library/react-native';
import { SettingsErrorBoundary } from '../SettingsErrorBoundary';

// Mock dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
      surface: '#f5f5f5',
    },
  }),
}));

jest.mock('@umituz/react-native-design-system', () => ({
  AtomicText: ({ children, type, color, style }: any) => (
    <Text style={style} testID={`atomic-text-${type}-${color}`}>
      {children}
    </Text>
  ),
  AtomicIcon: ({ name, color, size, style }: any) => (
    <Text style={style} testID={`atomic-icon-${name}-${color}-${size}`}>
      Icon: {name}
    </Text>
  ),
}));

// Component that throws an error
const ThrowErrorComponent = () => {
  throw new Error('Test error');
};

describe('SettingsErrorBoundary', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <SettingsErrorBoundary>
        <Text>Normal Content</Text>
      </SettingsErrorBoundary>
    );

    expect(getByText('Normal Content')).toBeTruthy();
  });

  it('catches and displays error boundary fallback', () => {
    const { getByTestId, getByText } = render(
      <SettingsErrorBoundary>
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    // Should show error fallback
    expect(getByTestId('atomic-icon-AlertTriangle-warning-lg')).toBeTruthy();
    expect(getByTestId('atomic-text-headlineSmall-primary')).toBeTruthy();
    expect(getByTestId('atomic-text-bodyMedium-secondary')).toBeTruthy();
  });

  it('uses custom fallback when provided', () => {
    const customFallback = <Text testID="custom-fallback">Custom Error</Text>;
    
    const { getByTestId, queryByTestId } = render(
      <SettingsErrorBoundary fallback={customFallback}>
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    expect(getByTestId('custom-fallback')).toBeTruthy();
    expect(queryByTestId('atomic-icon-AlertTriangle-warning-lg')).toBeNull();
  });

  it('uses custom fallback title and message', () => {
    const { getByTestId } = render(
      <SettingsErrorBoundary
        fallbackTitle="custom.error.title"
        fallbackMessage="custom.error.message"
      >
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    expect(getByTestId('atomic-text-headlineSmall-primary')).toBeTruthy();
    expect(getByTestId('atomic-text-bodyMedium-secondary')).toBeTruthy();
  });

  it('logs error in development mode', () => {
    const originalDev = __DEV__;
    (global as any).__DEV__ = true;

    render(
      <SettingsErrorBoundary>
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalledWith(
      'Settings Error Boundary caught an error:',
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );

    (global as any).__DEV__ = originalDev;
  });

  it('does not log error in production mode', () => {
    const originalDev = __DEV__;
    (global as any).__DEV__ = false;

    render(
      <SettingsErrorBoundary>
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    expect(consoleError).not.toHaveBeenCalled();

    (global as any).__DEV__ = originalDev;
  });

  it('resets error state when new children are provided', () => {
    const { rerender, getByText, queryByText } = render(
      <SettingsErrorBoundary>
        <ThrowErrorComponent />
      </SettingsErrorBoundary>
    );

    // Error state should be shown
    expect(queryByText('Normal Content')).toBeNull();

    // Rerender with normal content
    rerender(
      <SettingsErrorBoundary>
        <Text>Normal Content</Text>
      </SettingsErrorBoundary>
    );

    // Should show normal content again
    expect(getByText('Normal Content')).toBeTruthy();
  });

  it('handles different types of errors', () => {
    const StringErrorComponent = () => {
      throw 'String error';
    };

    const { getByTestId } = render(
      <SettingsErrorBoundary>
        <StringErrorComponent />
      </SettingsErrorBoundary>
    );

    expect(getByTestId('atomic-icon-AlertTriangle-warning-lg')).toBeTruthy();
  });

  it('handles async errors in useEffect', async () => {
    const AsyncErrorComponent = () => {
      React.useEffect(() => {
        throw new Error('Async error');
      }, []);
      return <Text>Async Component</Text>;
    };

    const { getByTestId } = render(
      <SettingsErrorBoundary>
        <AsyncErrorComponent />
      </SettingsErrorBoundary>
    );

    // Should catch the error
    expect(getByTestId('atomic-icon-AlertTriangle-warning-lg')).toBeTruthy();
  });
});