/**
 * FAQ Screen Component
 * Full-screen FAQ viewer with search functionality
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, TextStyle, useWindowDimensions } from 'react-native';
import { useAppDesignTokens, AtomicText, ScreenLayout, getContentMaxWidth } from '@umituz/react-native-design-system';
import { FAQCategory } from '../../domain/entities/FAQEntity';
import { useFAQSearch } from '../hooks/useFAQSearch';
import { useFAQExpansion } from '../hooks/useFAQExpansion';
import { FAQSearchBar, FAQSearchBarStyles } from '../components/FAQSearchBar';
import { FAQEmptyState, FAQEmptyStateStyles } from '../components/FAQEmptyState';
import { FAQCategoryComponent, FAQCategoryStyles } from '../components/FAQCategory';

export interface FAQScreenStyles {
  container?: ViewStyle;
  header?: ViewStyle;
  title?: TextStyle;
  content?: ViewStyle;
  searchBar?: FAQSearchBarStyles;
  emptyState?: FAQEmptyStateStyles;
  category?: FAQCategoryStyles;
}

export interface FAQScreenProps {
  categories: FAQCategory[];
  searchPlaceholder: string;
  emptySearchTitle: string;
  emptySearchMessage: string;
  headerTitle: string;
  onBack?: () => void;
  renderHeader?: (props: { onBack: () => void }) => React.ReactElement | null;
  styles?: FAQScreenStyles;
}

export const FAQScreen: React.FC<FAQScreenProps> = ({
  categories,
  searchPlaceholder,
  emptySearchTitle,
  emptySearchMessage,
  headerTitle,
  onBack,
  renderHeader,
  styles: customStyles,
}) => {
  const tokens = useAppDesignTokens();
  const { width: windowWidth } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => getContentMaxWidth(windowWidth), [windowWidth]);
  const { searchQuery, setSearchQuery, filteredCategories, hasResults } = useFAQSearch(categories);
  const { isExpanded, toggleExpansion } = useFAQExpansion();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        header: {
          padding: tokens.spacing.md,
        },
        content: {
          flex: 1,
        },
      }),
    [tokens]
  );

  const renderContent = () => {
    if (searchQuery && !hasResults) {
      return (
        <FAQEmptyState
          title={emptySearchTitle}
          message={emptySearchMessage}
          styles={customStyles?.emptyState}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.header, customStyles?.header]}>
          <AtomicText
            type="headlineMedium"
            color="textPrimary"
            style={{ marginBottom: tokens.spacing.md, fontWeight: '700' }}
          >
            {headerTitle}
          </AtomicText>
          <FAQSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            styles={customStyles?.searchBar}
          />
        </View>

        <ScrollView
          style={[styles.content, customStyles?.content]}
          contentContainerStyle={{ paddingVertical: tokens.spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {filteredCategories.map((category) => (
            <FAQCategoryComponent
              key={category.id}
              category={category}
              isExpanded={isExpanded}
              onToggleItem={toggleExpansion}
              styles={customStyles?.category}
            />
          ))}
          <View style={{ height: tokens.spacing.xl * 2 }} />
        </ScrollView>
      </View>
    );
  };

  if (renderHeader && onBack) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
        <View style={[styles.container, customStyles?.container]}>
          <View style={{ alignSelf: 'center', width: '100%', maxWidth: contentMaxWidth }}>
            {renderHeader({ onBack })}
          </View>
          {renderContent()}
        </View>
      </View>
    );
  }

  return (
    <ScreenLayout edges={['bottom']} scrollable={false}>
      <View style={[styles.container, customStyles?.container]}>
        {renderContent()}
      </View>
    </ScreenLayout>
  );
};