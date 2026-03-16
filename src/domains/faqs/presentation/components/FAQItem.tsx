/**
 * FAQ Item Component
 * Individual FAQ question/answer item
 * Uses design system tokens for theming
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system/atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
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

// SVG paths for chevron icons
const CHEVRON_UP_PATH = "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z";
const CHEVRON_DOWN_PATH = "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z";

export const FAQItemComponent: React.FC<FAQItemProps> = React.memo(({
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
                    marginHorizontal: tokens.spacing.md,
                    marginBottom: tokens.spacing.sm,
                    borderRadius: 20,
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: isExpanded ? tokens.colors.primary : tokens.colors.border,
                    overflow: 'hidden',
                },
                header: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: tokens.spacing.lg,
                },
                content: {
                    flex: 1,
                    marginRight: tokens.spacing.md,
                },
                questionText: {
                    fontWeight: '700',
                },
                answerContainer: {
                    paddingHorizontal: tokens.spacing.lg,
                    paddingBottom: tokens.spacing.lg,
                    borderTopWidth: 1,
                    borderTopColor: tokens.colors.borderLight,
                    backgroundColor: tokens.colors.surfaceSecondary || tokens.colors.backgroundSecondary,
                },
                iconContainer: {
                    width: 36,
                    height: 36,
                    borderRadius: 18,
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
                        svgPath={isExpanded ? CHEVRON_UP_PATH : CHEVRON_DOWN_PATH}
                        customSize={20}
                        customColor={isExpanded ? tokens.colors.onPrimary : tokens.colors.secondary}
                    />
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.answerContainer, customStyles?.answerContainer]}>
                    <AtomicText
                        type="bodyMedium"
                        color="textSecondary"
                        style={[{ lineHeight: 22 }, customStyles?.answerStyle]}
                    >
                        {item.answer}
                    </AtomicText>
                </View>
            )}
        </View>
    );
});
