/**
 * Disclaimer Screen
 *
 * Full screen for displaying disclaimer/important legal notice.
 * Replaces modal approach with native navigation.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { AtomicText } from '@umituz/react-native-design-system/atoms';
import { NavigationHeader, useAppNavigation } from '@umituz/react-native-design-system/molecules';

export interface DisclaimerScreenParams {
  title: string;
  content: string;
  [key: string]: unknown;
}

export interface DisclaimerScreenProps {
  route: {
    params: DisclaimerScreenParams;
  };
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ route }) => {
  const navigation = useAppNavigation();
  const { title, content } = route.params;

  return (
    <ScreenLayout
      scrollable={true}
      edges={['top', 'bottom', 'left', 'right']}
      hideScrollIndicator={false}
    >
      <NavigationHeader
        title={title || 'Disclaimer'}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <AtomicText style={styles.content}>{content}</AtomicText>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
