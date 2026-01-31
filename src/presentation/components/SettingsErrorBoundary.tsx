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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // Silent error handling - error already captured in state
    void _error;
    void _errorInfo;
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          fallbackTitle={this.props.fallbackTitle}
          fallbackMessage={this.props.fallbackMessage}
        />
      );
    }

    return this.props.children;
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