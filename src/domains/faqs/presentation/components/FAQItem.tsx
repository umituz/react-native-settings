/**
 * FAQ Item Component
 * Individual FAQ question/answer item
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useResponsiveDesignTokens, AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { FAQItem as FAQItemType } from '../../domain/entities/FAQEntity';

export interface FAQItemStyles {
    container?: ViewStyle;
    header?: ViewStyle;
    content?: ViewStyle;
    questionStyle?: object;
    answerContainer?: ViewStyle;
    answerStyle?: object;
}

export interface FAQItemProps {
    item: FAQItemType;
    isExpanded: boolean;
    onToggle: () => void;
    isLast?: boolean;
    styles?: FAQItemStyles;
}

export const FAQItemComponent: React.FC<FAQItemProps> = ({
    item,
    isExpanded,
    onToggle,
    styles: customStyles,
}) => {
    const tokens = useResponsiveDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    marginHorizontal: tokens.spacing.md,
                    marginBottom: tokens.spacing.xs,
                    borderRadius: 12,
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: tokens.colors.border,
                },
                header: {
                    flexDirection: 'row' as const,
                    alignItems: 'center' as const,
                    padding: tokens.spacing.md,
                },
                content: {
                    flex: 1,
                    marginRight: tokens.spacing.xs,
                },
                answerContainer: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingBottom: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: tokens.colors.borderLight,
                },
            }),
        [tokens]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <TouchableOpacity
                onPress={onToggle}
                style={[styles.header, customStyles?.header]}
                activeOpacity={0.7}
            >
                <View style={[styles.content, customStyles?.content]}>
                    <AtomicText
                        type="bodyLarge"
                        color="textPrimary"
                        style={customStyles?.questionStyle}
                        numberOfLines={isExpanded ? undefined : 2}
                    >
                        {item.question}
                    </AtomicText>
                </View>
                <AtomicIcon
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                />
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.answerContainer, customStyles?.answerContainer]}>
                    <AtomicText
                        type="bodyMedium"
                        color="textSecondary"
                        style={customStyles?.answerStyle}
                    >
                        {item.answer}
                    </AtomicText>
                </View>
            )}
        </View>
    );
};
