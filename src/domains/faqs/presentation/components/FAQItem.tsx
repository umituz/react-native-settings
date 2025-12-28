/**
 * FAQ Item Component
 * Individual FAQ question/answer item
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens, AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
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
    const tokens = useAppDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    marginHorizontal: tokens.spacing.md * tokens.spacingMultiplier,
                    marginBottom: tokens.spacing.sm * tokens.spacingMultiplier,
                    borderRadius: 20 * tokens.spacingMultiplier,
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: isExpanded ? tokens.colors.primary : tokens.colors.border,
                    overflow: 'hidden',
                },
                header: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: tokens.spacing.lg * tokens.spacingMultiplier,
                },
                content: {
                    flex: 1,
                    marginRight: tokens.spacing.md * tokens.spacingMultiplier,
                },
                questionText: {
                    fontWeight: '700',
                },
                answerContainer: {
                    paddingHorizontal: tokens.spacing.lg * tokens.spacingMultiplier,
                    paddingBottom: tokens.spacing.lg * tokens.spacingMultiplier,
                    borderTopWidth: 1,
                    borderTopColor: tokens.colors.borderLight,
                    backgroundColor: tokens.colors.surfaceSecondary || tokens.colors.backgroundSecondary,
                },
                iconContainer: {
                    width: 36 * tokens.spacingMultiplier,
                    height: 36 * tokens.spacingMultiplier,
                    borderRadius: 18 * tokens.spacingMultiplier,
                    backgroundColor: isExpanded ? tokens.colors.primary : tokens.colors.surfaceSecondary || tokens.colors.backgroundSecondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }),
        [tokens, isExpanded]
    );

    return (
        <View style={[styles.container, customStyles?.container]}>
            <TouchableOpacity
                onPress={onToggle}
                style={[styles.header, customStyles?.header]}
                activeOpacity={0.8}
            >
                <View style={[styles.content, customStyles?.content]}>
                    <AtomicText
                        type="bodyLarge"
                        color={isExpanded ? "primary" : "textPrimary"}
                        style={[styles.questionText, customStyles?.questionStyle]}
                    >
                        {item.question}
                    </AtomicText>
                </View>
                <View style={styles.iconContainer}>
                    <AtomicIcon
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={isExpanded ? "onPrimary" : "textSecondary"}
                    />
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.answerContainer, customStyles?.answerContainer]}>
                    <AtomicText
                        type="bodyMedium"
                        color="textSecondary"
                        style={[{ lineHeight: 22 * tokens.spacingMultiplier }, customStyles?.answerStyle]}
                    >
                        {item.answer}
                    </AtomicText>
                </View>
            )}
        </View>
    );
};
