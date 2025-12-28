/**
 * FAQ Search Bar Component
 * Search input for filtering FAQ items
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens, AtomicIcon } from '@umituz/react-native-design-system';

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
    const tokens = useAppDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: tokens.colors.surfaceSecondary || tokens.colors.backgroundSecondary,
                    borderRadius: 16,
                    paddingHorizontal: tokens.spacing.md,
                    borderWidth: 1,
                    borderColor: tokens.colors.borderLight,
                    height: 48,
                },
                iconContainer: {
                    marginRight: tokens.spacing.sm,
                },
                input: {
                    flex: 1,
                    height: '100%',
                    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
                    color: tokens.colors.textPrimary,
                },
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <View style={styles.iconContainer}>
                <AtomicIcon name="search" size="md" color="textSecondary" />
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
