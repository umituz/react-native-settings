/**
 * FAQ Category Component
 * Renders a category with its FAQ items
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useResponsiveDesignTokens, AtomicText } from '@umituz/react-native-design-system';
import { FAQCategory as FAQCategoryType } from '../../domain/entities/FAQEntity';
import { FAQItemComponent, FAQItemStyles } from './FAQItem';

export interface FAQCategoryStyles {
    container?: ViewStyle;
    titleStyle?: object;
    itemStyles?: FAQItemStyles;
}

export interface FAQCategoryProps {
    category: FAQCategoryType;
    isExpanded: (itemId: string) => boolean;
    onToggleItem: (itemId: string) => void;
    styles?: FAQCategoryStyles;
}

export const FAQCategoryComponent: React.FC<FAQCategoryProps> = ({
    category,
    isExpanded,
    onToggleItem,
    styles: customStyles,
}) => {
    const tokens = useResponsiveDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    marginBottom: tokens.spacing.lg,
                },
                titleContainer: {
                    marginBottom: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                },
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <View style={styles.titleContainer}>
                <AtomicText
                    type="headlineSmall"
                    color="textPrimary"
                    style={customStyles?.titleStyle}
                >
                    {category.title}
                </AtomicText>
            </View>
            {category.items.map((item, index) => (
                <FAQItemComponent
                    key={item.id}
                    item={item}
                    isExpanded={isExpanded(item.id)}
                    onToggle={() => onToggleItem(item.id)}
                    isLast={index === category.items.length - 1}
                    styles={customStyles?.itemStyles}
                />
            ))}
        </View>
    );
};
