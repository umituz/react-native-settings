/**
 * GenericScreen Component
 *
 * Universal screen component that works with ScreenConfig.
 * Handles loading, error, and empty states automatically.
 *
 * @example
 * ```ts
 * const screenData = useScreenData({ fetch: async () => await api.getData() });
 *
 * return (
 *   <GenericScreen
 *     data={screenData}
 *     config={ScreenPresets.default}
 *   >
 *     <MyContent data={screenData.data} />
 *   </GenericScreen>
 * );
 * ```
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import {
  NavigationHeader,
  useAppNavigation,
} from '@umituz/react-native-design-system/molecules';
import {
  AtomicText,
  AtomicButton,
  AtomicSpinner,
  AtomicIcon,
} from '@umituz/react-native-design-system/atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import type {
  ScreenConfig,
  ScreenData,
} from '../../core/patterns/Screen/ScreenConfig';

export interface GenericScreenProps<T> {
  /**
   * Screen data from useScreenData hook
   */
  data: ScreenData<T>;

  /**
   * Screen configuration
   */
  config?: ScreenConfig;

  /**
   * Content component (renders when data is loaded)
   */
  children: React.ReactNode | ((data: T) => React.ReactNode);

  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

export function GenericScreen<T>({
  data,
  config = {},
  children,
  testID = 'generic-screen',
}: GenericScreenProps<T>) {
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  const {
    header,
    loading = {},
    error = {},
    empty,
    layout = {},
  } = config;

  // Header configuration
  const showBackButton = header?.showBackButton !== false;
  const onBackPress = header?.onBackPress || (() => navigation.goBack());

  const navigationHeader = header?.custom ? (
    header.custom
  ) : header?.title || showBackButton ? (
    <NavigationHeader
      title={header?.title || ''}
      onBackPress={showBackButton ? onBackPress : undefined}
      actions={header?.actions?.map((action) => ({
        icon: action.icon,
        onPress: action.onPress,
        testID: action.testID,
      }))}
    />
  ) : undefined;

  // Loading state
  if (data.loading) {
    return (
      <ScreenLayout
        edges={layout.edges || ['top', 'bottom', 'left', 'right']}
        header={navigationHeader}
        scrollable={layout.scrollable}
        keyboardAvoiding={layout.keyboardAvoiding}
        hideScrollIndicator={layout.hideScrollIndicator}
        contentContainerStyle={layout.contentContainerStyle}
        testID={testID}
      >
        {loading.custom ? (
          loading.custom
        ) : (
          <View style={styles.centerContainer}>
            <AtomicSpinner
              size={loading.size || 'lg'}
              fullContainer={loading.fullContainer !== false}
            />
            {loading.message && (
              <AtomicText
                type="bodyMedium"
                color="onSurfaceVariant"
                style={styles.stateMessage}
              >
                {loading.message}
              </AtomicText>
            )}
          </View>
        )}
      </ScreenLayout>
    );
  }

  // Error state
  if (data.error) {
    return (
      <ScreenLayout
        edges={layout.edges || ['top', 'bottom', 'left', 'right']}
        header={navigationHeader}
        scrollable={layout.scrollable}
        keyboardAvoiding={layout.keyboardAvoiding}
        hideScrollIndicator={layout.hideScrollIndicator}
        contentContainerStyle={layout.contentContainerStyle}
        testID={testID}
      >
        {error.custom ? (
          error.custom
        ) : (
          <View style={styles.centerContainer}>
            <AtomicIcon
              name={error.icon || 'error'}
              size="xl"
              color="error"
              style={styles.stateIcon}
            />
            <AtomicText
              type="headlineMedium"
              color="onSurface"
              style={styles.stateTitle}
            >
              {error.prefix || 'Error'}
            </AtomicText>
            <AtomicText
              type="bodyMedium"
              color="onSurfaceVariant"
              style={styles.stateMessage}
            >
              {error.message || data.error}
            </AtomicText>
            {error.showRetry && (
              <AtomicButton
                variant="outline"
                onPress={error.onRetry || data.refresh}
                style={styles.retryButton}
              >
                {error.retryText || 'Retry'}
              </AtomicButton>
            )}
          </View>
        )}
      </ScreenLayout>
    );
  }

  // Empty state
  if (!data.data && empty) {
    return (
      <ScreenLayout
        edges={layout.edges || ['top', 'bottom', 'left', 'right']}
        header={navigationHeader}
        scrollable={layout.scrollable}
        keyboardAvoiding={layout.keyboardAvoiding}
        hideScrollIndicator={layout.hideScrollIndicator}
        contentContainerStyle={layout.contentContainerStyle}
        testID={testID}
      >
        {empty.custom ? (
          empty.custom
        ) : (
          <View style={styles.centerContainer}>
            {empty.icon && (
              <AtomicIcon
                name={empty.icon}
                size="xl"
                color="onSurfaceVariant"
                style={styles.stateIcon}
              />
            )}
            <AtomicText
              type="headlineMedium"
              color="onSurface"
              style={styles.stateTitle}
            >
              {empty.message || 'No Data'}
            </AtomicText>
            {empty.description && (
              <AtomicText
                type="bodyMedium"
                color="onSurfaceVariant"
                style={styles.stateMessage}
              >
                {empty.description}
              </AtomicText>
            )}
            {empty.actionLabel && empty.onAction && (
              <AtomicButton
                variant="outline"
                onPress={empty.onAction}
                style={styles.retryButton}
              >
                {empty.actionLabel}
              </AtomicButton>
            )}
          </View>
        )}
      </ScreenLayout>
    );
  }

  // Content
  return (
    <ScreenLayout
      edges={layout.edges || ['top', 'bottom', 'left', 'right']}
      header={navigationHeader}
      scrollable={layout.scrollable}
      keyboardAvoiding={layout.keyboardAvoiding}
      hideScrollIndicator={layout.hideScrollIndicator}
      contentContainerStyle={layout.contentContainerStyle}
      testID={testID}
    >
      {typeof children === 'function' ? (children as (data: T) => React.ReactNode)(data.data!) : children}
    </ScreenLayout>
  );
}

const getStyles = (_tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    stateIcon: {
      marginBottom: 16,
    },
    stateTitle: {
      marginBottom: 8,
      textAlign: 'center',
    },
    stateMessage: {
      textAlign: 'center',
      marginBottom: 24,
    },
    retryButton: {
      minWidth: 120,
    },
  });
