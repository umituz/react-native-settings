/**
 * About Content Component
 * Displays the list of about items organized in sections
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AboutSettingItem } from './AboutSettingItem';
import { AppInfo } from '../../domain/entities/AppInfo';
import { AboutConfig } from '../../domain/entities/AppInfo';

import { useAppDesignTokens } from '@umituz/react-native-design-system';

export interface AboutContentProps {
  /** App information to display */
  appInfo: AppInfo;
  /** Configuration for actions */
  config: AboutConfig;
}

const AboutSectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);
  const colors = tokens.colors;

  return (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{title}</Text>
  );
};

export const AboutContent: React.FC<AboutContentProps> = ({
  appInfo,
  config,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);
  const hasContactInfo = appInfo.developer || appInfo.contactEmail || appInfo.websiteUrl;
  const hasMoreInfo = appInfo.moreAppsUrl;

  const texts = config.texts || {};

  return (
    <View style={styles.content}>
      {hasContactInfo && (
        <View style={styles.section}>
          <AboutSectionHeader title={texts.contact || "Contact"} />

          {appInfo.developer && (
            <AboutSettingItem
              title={texts.developer || "Developer"}
              value={appInfo.developer}
              testID="developer-item"
            />
          )}

          {appInfo.contactEmail && (
            <AboutSettingItem
              title={texts.email || "Email"}
              value={appInfo.contactEmail}
              onPress={config.actions?.onEmailPress}
              testID="email-item"
              showChevron={!!config.actions?.onEmailPress}
            />
          )}

          {appInfo.websiteUrl && (
            <AboutSettingItem
              title={texts.website || "Website"}
              value={appInfo.websiteDisplay || appInfo.websiteUrl}
              onPress={config.actions?.onWebsitePress}
              testID="website-item"
              showChevron={!!config.actions?.onWebsitePress}
            />
          )}
        </View>
      )}

      {hasMoreInfo && (
        <View style={styles.section}>
          <AboutSectionHeader title={texts.more || "More"} />
          <AboutSettingItem
            title={texts.moreApps || "More Apps"}
            onPress={config.actions?.onMoreAppsPress}
            testID="more-apps-item"
            showChevron={!!config.actions?.onMoreAppsPress}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (tokens: any) => StyleSheet.create({
  content: {
    paddingVertical: 8 * tokens.spacingMultiplier,
  },
  section: {
    marginBottom: 24 * tokens.spacingMultiplier,
  },
  sectionHeader: {
    fontSize: tokens.typography.labelSmall.responsiveFontSize,
    fontWeight: '600',
    marginBottom: 8 * tokens.spacingMultiplier,
    paddingHorizontal: 16 * tokens.spacingMultiplier,
    textTransform: 'uppercase',
    letterSpacing: 0.5 * tokens.spacingMultiplier,
  },
});