/**
 * About Screen Component
 * Main screen component for displaying app information
 * Fully configurable and generic
 * Optimized for performance and memory safety
 */
import React from 'react';
import { AboutScreenContainer } from './AboutScreenContainer';

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
  return <AboutScreenContainer {...props} />;
};