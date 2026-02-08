/**
 * AboutScreen Container Component
 * Handles business logic and state management for About screen
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AboutScreenContent } from './AboutScreenContent';
import { useAboutInfo } from '../hooks/useAboutInfo';
import { useAppDesignTokens, AtomicText, type DesignTokens } from '@umituz/react-native-design-system';
import type { AboutScreenProps } from './AboutScreen';

export const AboutScreenContainer: React.FC<AboutScreenProps> = ({
  config,
  containerStyle,
  headerStyle,
  titleStyle,
  versionStyle,
  showHeader = true,
  headerComponent,
  footerComponent,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const { appInfo, loading, error } = useAboutInfo({
    autoInit: true,
    initialConfig: config,
  });

  const containerStyles = React.useMemo(() => {
    return [
      styles.container,
      { backgroundColor: tokens.colors.backgroundPrimary },
      containerStyle
    ];
  }, [containerStyle, tokens.colors.backgroundPrimary, styles]);

  const texts = config.texts || {};

  if (loading) {
    return (
      <View style={containerStyles} testID={testID}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.statusText}
        >
          {texts.loading}
        </AtomicText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={containerStyles} testID={testID}>
        <AtomicText
          type="bodyMedium"
          color="error"
          style={styles.statusText}
        >
          {texts.errorPrefix} {error}
        </AtomicText>
      </View>
    );
  }

  if (!appInfo) {
    return (
      <View style={containerStyles} testID={testID}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.statusText}
        >
          {texts.noInfo}
        </AtomicText>
      </View>
    );
  }

  return (
    <AboutScreenContent
      appInfo={appInfo}
      config={config}
      containerStyle={containerStyle}
      headerStyle={headerStyle}
      titleStyle={titleStyle}
      versionStyle={versionStyle}
      showHeader={showHeader}
      headerComponent={headerComponent}
      footerComponent={footerComponent}
      testID={testID}
      _tokens={tokens}
    />
  );
};

const getStyles = (tokens: DesignTokens) => StyleSheet.create({
  container: {
    flex: 1,
  },
  statusText: {
    textAlign: 'center',
    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    marginTop: 20,
  },
});
