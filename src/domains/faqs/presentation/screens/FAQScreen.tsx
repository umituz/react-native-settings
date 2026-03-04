/**
 * FAQ Screen Component
 * Full-screen FAQ viewer with search functionality
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, useWindowDimensions } from 'react-native';
import { getContentMaxWidth } from '@umituz/react-native-design-system/device';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { useAppNavigation } from '@umituz/react-native-design-system/molecules';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
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
  onBack,
  renderHeader,
  styles: customStyles,
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const { width: windowWidth } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => getContentMaxWidth(windowWidth), [windowWidth]);
  const { searchQuery, setSearchQuery, filteredCategories, hasResults } = useFAQSearch(categories);
  const { isExpanded, toggleExpansion } = useFAQExpansion();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        searchBar: {
          padding: tokens.spacing.md,
        },
        footer: {
          height: tokens.spacing.xl * 2,
        },
      }),
    [tokens]
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const header = renderHeader ? renderHeader({ onBack: handleBack }) : null;

  return (
    <ScreenLayout
      edges={['bottom']}
      scrollable={true}
      header={header}
      contentContainerStyle={customStyles?.content}
    >
      <View style={{ alignSelf: 'center', width: '100%', maxWidth: contentMaxWidth }}>
        <View style={[styles.searchBar, customStyles?.header]}>
          <FAQSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            styles={customStyles?.searchBar}
          />
        </View>

        {searchQuery && !hasResults ? (
          <FAQEmptyState
            title={emptySearchTitle}
            message={emptySearchMessage}
            styles={customStyles?.emptyState}
          />
        ) : (
          filteredCategories.map((cat) => (
            <FAQCategoryComponent
              key={cat.id}
              category={cat}
              isExpanded={isExpanded}
              onToggleItem={toggleExpansion}
              styles={customStyles?.category}
            />
          ))
        )}

        <View style={styles.footer} />
      </View>
    </ScreenLayout>
  );
};
