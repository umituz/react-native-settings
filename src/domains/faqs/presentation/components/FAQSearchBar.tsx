/**
 * FAQ Search Bar Component
 * Search input for filtering FAQ items
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useResponsiveDesignTokens, AtomicIcon } from '@umituz/react-native-design-system';

export interface FAQSearchBarStyles {
    container?: ViewStyle;
    input?: TextStyle;
}

export interface FAQSearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    styles?: FAQSearchBarStyles;
}

export const FAQSearchBar: React.FC<FAQSearchBarProps> = ({
    value,
    onChangeText,
    placeholder,
    styles: customStyles,
}) => {
    const tokens = useResponsiveDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: 'row' as const,
                    alignItems: 'center' as const,
                    backgroundColor: tokens.colors.surface,
                    borderRadius: 12,
                    paddingHorizontal: tokens.spacing.sm,
                    borderWidth: 1,
                    borderColor: tokens.colors.border,
                },
                iconContainer: {
                    marginRight: tokens.spacing.xs,
                },
                input: {
                    flex: 1,
                    paddingVertical: tokens.spacing.sm,
                    fontSize: 16,
                    color: tokens.colors.textPrimary,
                },
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <View style={styles.iconContainer}>
                <AtomicIcon name="search" size={18} />
            </View>
            <TextInput
                style={[styles.input, customStyles?.input]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={tokens.colors.textTertiary}
            />
        </View>
    );
};
