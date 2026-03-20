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
import { ICON_PATHS } from '../../../../utils/iconPaths';
import { createLanguageItemStyles } from './LanguageItem.styles';

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

// SVG path for checkmark icon (works without external icon library)
const CHECKMARK_PATH = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";

export const LanguageItem: React.FC<LanguageItemProps> = React.memo(({
  item,
  isSelected,
  onSelect,
  customStyles,
}) => {
  const tokens = useAppDesignTokens();
  const styles = createLanguageItemStyles(tokens);

  const themedStyles = useMemo(() => ({
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
        styles.languageItem,
        isSelected && styles.selectedLanguageItem,
        customStyles?.languageItem,
      ]}
      onPress={() => {
        onSelect(item.code);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.languageContent, customStyles?.languageContent]}>
        <View style={themedStyles.flagContainer}>
          {item.flag && item.flag !== '🌐' ? (
            <AtomicText
              style={[
                styles.flag,
                { fontSize: 24, marginRight: 0, fontFamily: undefined },
                customStyles?.flag
              ]}
            >
              {item.flag}
            </AtomicText>
          ) : (
            <AtomicIcon
              svgPath={ICON_PATHS['globe']}
              customSize={24}
              customColor={tokens.colors.primary}
            />
          )}
        </View>
        <View style={[styles.languageText, customStyles?.languageText]}>
          <AtomicText
            type="bodyLarge"
            style={[styles.nativeName, { fontWeight: '600' }, customStyles?.nativeName]}
          >
            {item.nativeName}
          </AtomicText>
          <AtomicText
            type="labelMedium"
            style={[styles.languageName, customStyles?.nativeName]}
          >
            {item.name}
          </AtomicText>
        </View>
      </View>
      {isSelected && (
        <View style={themedStyles.flagContainer}>
          <AtomicIcon
            svgPath={CHECKMARK_PATH}
            customSize={24}
            customColor={tokens.colors.primary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
});

