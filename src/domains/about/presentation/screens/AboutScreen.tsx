/**
 * About Screen Component
 * Main screen component for displaying app information
 * Fully configurable and generic
 * Optimized for performance and memory safety
 */
import { ScreenLayout, NavigationHeader, useAppDesignTokens, useAppNavigation, AtomicText, AtomicSpinner } from '@umituz/react-native-design-system';
import { useAboutInfo } from '../hooks/useAboutInfo';
import { AboutScreenContent } from './AboutScreenContent';

export interface AboutScreenProps {
  /** Configuration for the about screen */
  config: import('../../domain/entities/AppInfo').AboutConfig;
  /** Custom container style */
  containerStyle?: import('react-native').ViewStyle;
  /** Custom header style */
  headerStyle?: import('react-native').ViewStyle;
  /** Custom title style */
  titleStyle?: import('react-native').TextStyle;
  /** Custom version style */
  versionStyle?: import('react-native').TextStyle;
  /** Show app header with name and version */
  showHeader?: boolean;
  /** Custom header component */
  headerComponent?: React.ReactNode;
  /** Custom footer component */
  footerComponent?: React.ReactNode;
  /** Test ID for E2E testing */
  testID?: string;
}

export const AboutScreen: React.FC<AboutScreenProps> = (props) => {
  const { config, testID = 'about-screen' } = props;
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();

  const { appInfo, loading, error } = useAboutInfo({
    autoInit: true,
    initialConfig: config,
  });

  const header = (
    <NavigationHeader 
      title={config.texts?.title || ""} 
      onBackPress={() => navigation.goBack()} 
    />
  );

  if (loading) {
    return (
      <ScreenLayout header={header} testID={testID}>
        <AtomicSpinner fullContainer size="lg" />
      </ScreenLayout>
    );
  }

  if (error || !appInfo) {
    const errorText = error ? `${config.texts?.errorPrefix || ""} ${error}` : (config.texts?.noInfo || "");
    return (
      <ScreenLayout header={header} testID={testID}>
        <AtomicText type="bodyMedium" color="error" style={{ textAlign: 'center', marginTop: 20 }}>
          {errorText}
        </AtomicText>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout header={header} testID={testID}>
      <AboutScreenContent
        {...props}
        appInfo={appInfo}
        _tokens={tokens}
      />
    </ScreenLayout>
  );
};