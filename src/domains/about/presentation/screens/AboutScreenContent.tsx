/**
 * AboutScreen Content Component
 * Pure presentational component for About screen
 * No business logic, only rendering
 */
import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { AboutHeader } from '../components/AboutHeader';
import { AboutContent } from '../components/AboutContent';
import { AboutConfig, AppInfo } from '../../domain/entities/AppInfo';
import type { DesignTokens } from '@umituz/react-native-design-system';
import type { AboutScreenProps } from './AboutScreen';

export interface AboutScreenContentProps extends Omit<AboutScreenProps, 'config'> {
  appInfo: AppInfo;
  config: AboutConfig;
  _tokens: DesignTokens;
}

interface AboutHeaderSectionProps {
  appInfo: AppInfo;
  config: AboutConfig;
  showHeader: boolean;
  headerComponent?: React.ReactNode;
  headerStyle?: AboutScreenContentProps['headerStyle'];
  titleStyle?: AboutScreenContentProps['titleStyle'];
  versionStyle?: AboutScreenContentProps['versionStyle'];
}

const AboutHeaderSection: React.FC<AboutHeaderSectionProps> = ({
  appInfo,
  config,
  showHeader,
  headerComponent,
  headerStyle,
  titleStyle,
  versionStyle,
}) => {
  if (headerComponent) {
    return <>{headerComponent}</>;
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
};

interface AboutFooterSectionProps {
  footerComponent?: React.ReactNode;
  borderColor: string;
  footerStyle: ReturnType<typeof getStyles>['footer'];
}

const AboutFooterSection: React.FC<AboutFooterSectionProps> = ({
  footerComponent,
  borderColor,
  footerStyle,
}) => {
  if (!footerComponent) {
    return null;
  }
  return (
    <View style={[footerStyle, { borderTopColor: borderColor }]}>
      {footerComponent}
    </View>
  );
};

interface AboutContentSectionProps {
  appInfo: AppInfo;
  config: AboutConfig;
}

const AboutContentSection: React.FC<AboutContentSectionProps> = ({ appInfo, config }) => {
  if (!appInfo) {
    return null;
  }
  return <AboutContent appInfo={appInfo} config={config} />;
};

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

  const containerStyles = useMemo(() => [
    styles.container,
    { backgroundColor: colors.backgroundPrimary },
    containerStyle
  ], [containerStyle, colors.backgroundPrimary, styles]);

  return (
    <View style={containerStyles} testID={testID}>
      <AboutHeaderSection
        appInfo={appInfo}
        config={config}
        showHeader={showHeader}
        headerComponent={headerComponent}
        headerStyle={headerStyle}
        titleStyle={titleStyle}
        versionStyle={versionStyle}
      />
      <AboutContentSection appInfo={appInfo} config={config} />
      <AboutFooterSection
        footerComponent={footerComponent}
        borderColor={colors.border}
        footerStyle={styles.footer}
      />
    </View>
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
