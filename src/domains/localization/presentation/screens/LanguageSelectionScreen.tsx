/**
 * Language Selection Screen
 * Generic language selector with search functionality
 */

import React from 'react';
import { FlatList } from 'react-native';
import {
  useAppDesignTokens,
  SearchBar,
  ScreenLayout,
  NavigationHeader,
  useAppNavigation,
} from '@umituz/react-native-design-system';
import { useLanguageSelection } from '../../infrastructure/hooks/useLanguageSelection';
import { LanguageItem } from '../components/LanguageItem';
import type { Language } from '../../infrastructure/storage/types/Language';
import type { LanguageSelectionScreenProps } from './LanguageSelectionScreen.types';
import { styles } from './LanguageSelectionScreen.styles';

interface LanguageListItemProps {
  item: Language;
  selectedCode: string;
  onSelect: (code: string) => void;
  renderLanguageItem?: LanguageSelectionScreenProps['renderLanguageItem'];
  customStyles?: LanguageSelectionScreenProps['styles'];
}

const LanguageListItem: React.FC<LanguageListItemProps> = ({
  item,
  selectedCode,
  onSelect,
  renderLanguageItem,
  customStyles,
}) => {
  const isSelected = selectedCode === item.code;

  if (renderLanguageItem) {
    return <>{renderLanguageItem(item, isSelected, onSelect)}</>;
  }

  return (
    <LanguageItem
      item={item}
      isSelected={isSelected}
      onSelect={onSelect}
      customStyles={customStyles}
    />
  );
};

interface LanguageSearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder?: string;
  renderSearchInput?: LanguageSelectionScreenProps['renderSearchInput'];
  customStyles?: LanguageSelectionScreenProps['styles'];
}

const LanguageSearchComponent: React.FC<LanguageSearchComponentProps> = ({
  searchQuery,
  setSearchQuery,
  searchPlaceholder,
  renderSearchInput,
  customStyles,
}) => {
  const tokens = useAppDesignTokens();

  if (renderSearchInput) {
    return renderSearchInput(searchQuery, setSearchQuery, searchPlaceholder || '');
  }

  return (
    <SearchBar
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder={searchPlaceholder}
      containerStyle={[
        { marginBottom: tokens.spacing.md },
        customStyles?.searchContainer
      ]}
      inputStyle={customStyles?.searchInput}
    />
  );
};

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  renderLanguageItem,
  renderSearchInput,
  headerTitle,
  onBackPress,
  styles: customStyles,
  searchPlaceholder,
  testID = 'language-selection-screen',
}) => {
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();
  const {
    searchQuery,
    setSearchQuery,
    selectedCode,
    filteredLanguages,
    handleLanguageSelect,
  } = useLanguageSelection();

  const onSelect = async (code: string) => {
    await handleLanguageSelect(code, () => {
      navigation.goBack();
    });
  };

  const renderItem = ({ item }: { item: Language }) => (
    <LanguageListItem
      item={item}
      selectedCode={selectedCode}
      onSelect={onSelect}
      renderLanguageItem={renderLanguageItem}
      customStyles={customStyles}
    />
  );

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenLayout
      testID={testID}
      scrollable={false}
      edges={['top', 'bottom', 'left', 'right']}
      backgroundColor={tokens.colors.backgroundPrimary}
      header={
        <NavigationHeader
          title={headerTitle || ""}
          onBackPress={handleBack}
        />
      }
      containerStyle={customStyles?.container}
    >
      <LanguageSearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={searchPlaceholder}
        renderSearchInput={renderSearchInput}
        customStyles={customStyles}
      />
      <FlatList
        data={filteredLanguages}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tokens.spacing.xl },
          customStyles?.listContent
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 64,
          offset: 64 * index,
          index,
        })}
      />
    </ScreenLayout>
  );
};

