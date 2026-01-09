/**
 * About Header Component
 * Displays app name, version, and description
 */
import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens, AtomicText } from '@umituz/react-native-design-system';
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
  const styles = getStyles(tokens);
  const colors = tokens.colors;

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }, containerStyle]} testID={testID}>
      <AtomicText style={[styles.appName, { color: colors.textPrimary }, titleStyle]}>{appInfo.name}</AtomicText>
      <AtomicText style={[styles.version, { color: colors.textSecondary }, versionStyle]}>
        {versionPrefix} {appInfo.version}
      </AtomicText>
      {appInfo.description && (
        <AtomicText style={[styles.description, { color: colors.textSecondary }, descriptionStyle]}>
          {appInfo.description}
        </AtomicText>
      )}
    </View>
  );
};

const getStyles = (tokens: any) => StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  appName: {
    fontSize: tokens.typography.headlineMedium.responsiveFontSize,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: tokens.typography.bodyLarge.responsiveFontSize,
    marginBottom: 8,
  },
  description: {
    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    textAlign: 'center',
    lineHeight: 20,
  },
});