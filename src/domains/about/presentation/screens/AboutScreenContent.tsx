/**
 * AboutScreen Content Component
 * Pure presentational component for About screen
 * No business logic, only rendering
 */
import React, { useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AboutHeader } from '../components/AboutHeader';
import { AboutContent } from '../components/AboutContent';
import { AboutConfig, AppInfo } from '../../domain/entities/AppInfo';
import type { DesignTokens } from '@umituz/react-native-design-system';
import type { AboutScreenProps } from './AboutScreen';

export interface AboutScreenContentProps extends Omit<AboutScreenProps, 'config'> {
  /** App info data */
  appInfo: AppInfo;
  /** Configuration for the about screen */
  config: AboutConfig;
  /** Design tokens */
  _tokens: DesignTokens;
}

export const AboutScreenContent: React.FC<AboutScreenContentProps> = ({
  appInfo,
  config,
  containerStyle,
  headerStyle,
  titleStyle,
  versionStyle,
  showHeader = true,
  headerComponent,
  footerComponent,
  testID,
  _tokens,
}) => {
  const styles = getStyles(_tokens);
  const colors = _tokens.colors;

  // Memoize header rendering to prevent unnecessary re-renders
  const renderHeader = useCallback(() => {
    if (headerComponent) {
      return headerComponent;
    }

    if (!showHeader || !appInfo) {
      return null;
    }

    return (
      <AboutHeader
        appInfo={appInfo}
        containerStyle={headerStyle}
        titleStyle={titleStyle}
        versionStyle={versionStyle}
        versionPrefix={config.texts?.versionPrefix}
      />
    );
  }, [headerComponent, showHeader, appInfo, headerStyle, titleStyle, versionStyle, config.texts?.versionPrefix]);

  // Memoize footer rendering
  const renderFooter = useCallback(() => {
    if (!footerComponent) {
      return null;
    }

    return (
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        {footerComponent}
      </View>
    );
  }, [footerComponent, colors.border, styles]);

  // Memoize content rendering
  const renderContent = useCallback(() => {
    if (!appInfo) {
      return null;
    }

    return (
      <AboutContent
        appInfo={appInfo}
        config={config}
      />
    );
  }, [appInfo, config]);

  // Memoize container style to prevent unnecessary re-renders
  const containerStyles = useMemo(() => {
    return [
      styles.container,
      { backgroundColor: colors.backgroundPrimary },
      containerStyle
    ];
  }, [containerStyle, colors.backgroundPrimary, styles]);

  return (
    <ScrollView
      style={containerStyles}
      testID={testID}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </ScrollView>
  );
};

const getStyles = (_tokens: DesignTokens) => StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
});
