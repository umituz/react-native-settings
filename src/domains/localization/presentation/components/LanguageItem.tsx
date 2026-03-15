/**
 * Language Item Component
 *
 * Renders a single language item in the language selection list
 * Theme-aware component that adapts to light/dark mode
 */

import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system/atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import type { Language } from '../../infrastructure/storage/types/Language';
import { styles } from './LanguageItem.styles';

interface LanguageItemProps {
  item: Language;
  isSelected: boolean;
  onSelect: (code: string) => void;
  customStyles?: {
    languageItem?: StyleProp<ViewStyle>;
    languageContent?: StyleProp<ViewStyle>;
    languageText?: StyleProp<ViewStyle>;
    flag?: StyleProp<TextStyle>;
    nativeName?: StyleProp<TextStyle>;
  };
}

export const LanguageItem: React.FC<LanguageItemProps> = ({
  item,
  isSelected,
  onSelect,
  customStyles,
}) => {
  const tokens = useAppDesignTokens();

  const themedStyles = useMemo(() => ({
    languageItem: {
      padding: tokens.spacing.md,
      borderRadius: tokens.borders.radius.lg,
      backgroundColor: tokens.colors.surface,
      borderColor: tokens.colors.border,
      borderWidth: 1,
      marginBottom: tokens.spacing.md,
    } as ViewStyle,
    selectedLanguageItem: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.surfaceVariant,
      borderWidth: 1.5,
    } as ViewStyle,
    nativeName: {
      color: tokens.colors.textPrimary,
      marginBottom: 2,
    } as TextStyle,
    languageName: {
      color: tokens.colors.textSecondary,
    } as TextStyle,
  }), [tokens]);

  return (
    <TouchableOpacity
      testID="language-item-test"
      style={[
        styles.languageItem,
        themedStyles.languageItem,
        isSelected ? [styles.selectedLanguageItem, themedStyles.selectedLanguageItem] : undefined,
        customStyles?.languageItem,
      ]}
      onPress={() => {
        onSelect(item.code);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.languageContent, customStyles?.languageContent]}>
        <AtomicText style={[styles.flag, { fontSize: 28, fontFamily: undefined }, customStyles?.flag]}>
          {item.flag || '🌐'}
        </AtomicText>
        <View style={[styles.languageText, { gap: 4 }, customStyles?.languageText]}>
          <AtomicText 
            type="bodyLarge"
            style={[themedStyles.nativeName, { fontWeight: '700' }, customStyles?.nativeName]}
          >
            {item.nativeName}
          </AtomicText>
          <AtomicText 
            type="labelMedium" 
            style={[themedStyles.languageName, customStyles?.nativeName]}
          >
            {item.name}
          </AtomicText>
        </View>
      </View>
      {isSelected && (
        <AtomicIcon name="checkmark" size="sm" color="primary" />
      )}
    </TouchableOpacity>
  );
};

