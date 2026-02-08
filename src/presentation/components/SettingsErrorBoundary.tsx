/**
 * Settings Error Boundary Component
 * Catches and handles errors in settings components
 */

import React, { Component, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { useLocalization } from '../../domains/localization';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SettingsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Initialize state using unknown to avoid type assertion issues
    (this as unknown as { state: State }).state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    if (__DEV__) {
      console.error('Settings Error Boundary caught an error:', _error);
      console.error('Error Info:', _errorInfo);
    }
  }

  render(): ReactNode {
    // Safe access through unknown to avoid type assertion issues
    const self = this as unknown as { state: State; props: Props };
    const hasError = self.state.hasError;
    const error = self.state.error;
    const fallback = self.props.fallback;
    const fallbackTitle = self.props.fallbackTitle;
    const fallbackMessage = self.props.fallbackMessage;
    const children = self.props.children;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={error}
          fallbackTitle={fallbackTitle}
          fallbackMessage={fallbackMessage}
        />
      );
    }

    return children;
  }
}

interface ErrorBoundaryFallbackProps {
  error?: Error;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  fallbackTitle,
  fallbackMessage
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const title = __DEV__ && error?.message
    ? t("error_boundary.dev_title")
    : (fallbackTitle || t("error_boundary.title"));

  const message = __DEV__ && error?.message
    ? `${t("error_boundary.dev_message")}: ${error.message}`
    : (fallbackMessage || t("error_boundary.message"));

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={[styles.content, { backgroundColor: tokens.colors.surface }]}>
        <AtomicIcon
          name="alert-circle"
          color="warning"
          size="lg"
          style={styles.icon}
        />
        <AtomicText
          type="headlineSmall"
          color="primary"
          style={styles.title}
        >
          {title}
        </AtomicText>
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={styles.message}
        >
          {message}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
  },
});