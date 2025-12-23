/**
 * FAQ Screen Component
 * Full-screen FAQ viewer with search functionality
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useResponsiveDesignTokens, AtomicText, ScreenLayout } from '@umituz/react-native-design-system';
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
  const tokens = useResponsiveDesignTokens();
  const { searchQuery, setSearchQuery, filteredCategories, hasResults } =
    useFAQSearch(categories);
  const { isExpanded, toggleExpansion } = useFAQExpansion();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: tokens.colors.backgroundPrimary,
        },
        header: {
          padding: tokens.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: tokens.colors.border,
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
      <ScrollView
        style={[styles.content, customStyles?.content]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, customStyles?.header]}>
          <AtomicText type="headlineMedium" color="textPrimary" style={{ marginBottom: tokens.spacing.sm }}>
            {headerTitle}
          </AtomicText>
          <FAQSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            styles={customStyles?.searchBar}
          />
        </View>

        {filteredCategories.map((category) => (
          <FAQCategoryComponent
            key={category.id}
            category={category}
            isExpanded={isExpanded}
            onToggleItem={toggleExpansion}
            styles={customStyles?.category}
          />
        ))}
      </ScrollView>
    );
  };

  if (renderHeader) {
    return (
      <View style={[styles.container, customStyles?.container]}>
        {renderHeader({ onBack: onBack || (() => { }) })}
        {renderContent()}
      </View>
    );
  }

  return (
    <ScreenLayout edges={['bottom']}>
      <View style={[styles.container, customStyles?.container]}>
        {renderContent()}
      </View>
    </ScreenLayout>
  );
};