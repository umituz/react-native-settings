/**
 * FAQ Category Component
 * Renders a category with its FAQ items
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system/atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
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

// Memoized FAQ items list to prevent unnecessary re-renders when other categories update
const FAQItemsList: React.FC<{
    items: FAQCategoryType['items'];
    isExpanded: (itemId: string) => boolean;
    onToggleItem: (itemId: string) => void;
    customStyles?: FAQCategoryStyles;
}> = React.memo(({ items, isExpanded, onToggleItem, customStyles }) => (
    <>
        {items.map((item, index) => (
            <FAQItemComponent
                key={item.id}
                item={item}
                isExpanded={isExpanded(item.id)}
                onToggle={() => onToggleItem(item.id)}
                isLast={index === items.length - 1}
                styles={customStyles?.itemStyles}
            />
        ))}
    </>
));

FAQItemsList.displayName = "FAQItemsList";

export const FAQCategoryComponent: React.FC<FAQCategoryProps> = ({
    category,
    isExpanded,
    onToggleItem,
    styles: customStyles,
}) => {
    const tokens = useAppDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    marginBottom: tokens.spacing.xl,
                },
                titleContainer: {
                    marginBottom: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                titleLine: {
                    flex: 1,
                    height: 1,
                    backgroundColor: tokens.colors.border,
                    marginLeft: tokens.spacing.md,
                }
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <View style={styles.titleContainer}>
                <AtomicText
                    type="labelLarge"
                    color="textSecondary"
                    style={[{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' }, customStyles?.titleStyle]}
                >
                    {category.title}
                </AtomicText>
                <View style={styles.titleLine} />
            </View>
            <FAQItemsList
                items={category.items}
                isExpanded={isExpanded}
                onToggleItem={onToggleItem}
                customStyles={customStyles}
            />
        </View>
    );
};
