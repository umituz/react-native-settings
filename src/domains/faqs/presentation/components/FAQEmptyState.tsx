/**
 * FAQ Empty State Component
 * Shown when no search results found
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useResponsiveDesignTokens, AtomicText } from '@umituz/react-native-design-system';

export interface FAQEmptyStateStyles {
    container?: ViewStyle;
    icon?: TextStyle;
    titleStyle?: object;
    messageStyle?: object;
}

export interface FAQEmptyStateProps {
    title: string;
    message: string;
    icon?: string;
    styles?: FAQEmptyStateStyles;
}

export const FAQEmptyState: React.FC<FAQEmptyStateProps> = ({
    title,
    message,
    icon = '❓',
    styles: customStyles,
}) => {
    const tokens = useResponsiveDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: tokens.spacing.lg,
                },
                icon: {
                    fontSize: 48,
                    marginBottom: tokens.spacing.md,
                },
                textCenter: {
                    textAlign: 'center',
                },
                message: {
                    marginTop: tokens.spacing.xs,
                },
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <Text style={[styles.icon, customStyles?.icon]}>{icon}</Text>
            <AtomicText
                type="headlineSmall"
                color="textPrimary"
                style={[styles.textCenter, customStyles?.titleStyle]}
            >
                {title}
            </AtomicText>
            <AtomicText
                type="bodyMedium"
                color="textSecondary"
                style={[styles.textCenter, styles.message, customStyles?.messageStyle]}
            >
                {message}
            </AtomicText>
        </View>
    );
};
