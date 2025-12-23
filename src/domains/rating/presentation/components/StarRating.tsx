import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useAppDesignTokens, AtomicIcon } from "@umituz/react-native-design-system";

export interface StarRatingProps {
    rating: number;
    maxRating?: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
    activeColor?: string;
    inactiveColor?: string;
    disabled?: boolean;
    style?: ViewStyle;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    onRatingChange,
    size = 24,
    activeColor,
    inactiveColor,
    disabled = false,
    style,
}) => {
    const tokens = useAppDesignTokens();
    const [internalRating, setInternalRating] = useState(rating);

    const filledColor = activeColor || tokens.colors.warning || "#FFD700";
    const emptyColor = inactiveColor || tokens.colors.border || "#E0E0E0";

    const handlePress = (index: number) => {
        if (disabled) return;
        const newRating = index + 1;
        setInternalRating(newRating);
        onRatingChange?.(newRating);
    };

    return (
        <View style={[styles.container, style]}>
            {Array.from({ length: maxRating }).map((_, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(index)}
                    disabled={disabled}
                    activeOpacity={0.7}
                    style={styles.starContainer}
                >
                    <AtomicIcon
                        name={index < (onRatingChange ? internalRating : rating) ? "star" : "star-outline"}
                        customSize={size}
                        customColor={index < (onRatingChange ? internalRating : rating) ? filledColor : emptyColor}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    starContainer: {
        padding: 4,
    },
});
