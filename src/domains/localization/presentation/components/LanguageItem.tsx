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
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radius.lg,
      backgroundColor: tokens.colors.surfaceSecondary,
      marginBottom: tokens.spacing.md,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    } as ViewStyle,
    selectedLanguageItem: {
      backgroundColor: tokens.colors.surface,
      borderColor: tokens.colors.primary,
      borderWidth: 1.5,
    } as ViewStyle,
    nativeName: {
      color: tokens.colors.textPrimary,
    } as TextStyle,
    languageName: {
      color: tokens.colors.textSecondary,
    } as TextStyle,
    flagContainer: {
      width: 44,
      height: 44,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.backgroundPrimary,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: tokens.spacing.md,
    } as ViewStyle,
  }), [tokens]);

  return (
    <TouchableOpacity
      testID="language-item-test"
      style={[
        themedStyles.languageItem,
        isSelected && themedStyles.selectedLanguageItem,
        customStyles?.languageItem,
      ]}
      onPress={() => {
        onSelect(item.code);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.languageContent, customStyles?.languageContent]}>
        <View style={themedStyles.flagContainer}>
          <AtomicText 
            style={[
              styles.flag, 
              { fontSize: 24, marginRight: 0, fontFamily: undefined }, 
              customStyles?.flag
            ]}
          >
            {item.flag || '🌐'}
          </AtomicText>
        </View>
        <View style={[styles.languageText, customStyles?.languageText]}>
          <AtomicText 
            type="bodyLarge"
            style={[themedStyles.nativeName, { fontWeight: '600' }, customStyles?.nativeName]}
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
        <AtomicIcon name="checkmark-circle" size="md" color="primary" />
      )}
    </TouchableOpacity>
  );
};

