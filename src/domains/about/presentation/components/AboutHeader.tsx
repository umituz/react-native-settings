/**
 * About Header Component
 * Displays app name, version, and description
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppInfo } from '../../domain/entities/AppInfo';

export interface AboutHeaderProps {
  /** App information to display */
  appInfo: AppInfo;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom title style */
  titleStyle?: TextStyle;
  /** Custom version style */
  versionStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  versionPrefix?: string;
  testID?: string;
}

import { useAppDesignTokens } from '@umituz/react-native-design-system';

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  appInfo,
  containerStyle,
  titleStyle,
  versionStyle,
  descriptionStyle,
  versionPrefix = "Version",
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }, containerStyle]} testID={testID}>
      <Text style={[styles.appName, { color: colors.textPrimary }, titleStyle]}>{appInfo.name}</Text>
      <Text style={[styles.version, { color: colors.textSecondary }, versionStyle]}>
        {versionPrefix} {appInfo.version}
      </Text>
      {appInfo.description && (
        <Text style={[styles.description, { color: colors.textSecondary }, descriptionStyle]}>
          {appInfo.description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});