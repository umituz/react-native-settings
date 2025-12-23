/**
 * Dynamic Color Palettes
 * 
 * Generic color palettes that can be customized by host applications
 * These serve as sensible defaults for appearance customization
 */

export interface ColorPalette {
  name: string;
  colors: string[];
}

/**
 * Generic primary color palette
 * Suitable for most applications
 */
export const DEFAULT_PRIMARY_COLORS: ColorPalette = {
  name: "primary",
  colors: [
    "#007AFF", // Blue
    "#5856D6", // Purple  
    "#FF3B30", // Red
    "#FF9500", // Orange
    "#FFCC00", // Yellow
    "#4CD964", // Green
    "#5AC8FA", // Light Blue
    "#FF2D92", // Pink
  ],
};

/**
 * Generic secondary color palette
 * Neutral colors for secondary elements
 */
export const DEFAULT_SECONDARY_COLORS: ColorPalette = {
  name: "secondary", 
  colors: [
    "#E5E5EA", // Light Gray
    "#C7C7CC", // Medium Gray
    "#8E8E93", // Dark Gray
    "#636366", // Very Dark Gray
    "#48484A", // Black Gray
    "#3A3A3C", // Near Black
    "#2C2C2E", // Almost Black
    "#1C1C1E", // Black
  ],
};

/**
 * Generic accent color palette
 * Vibrant colors for accent elements
 */
export const DEFAULT_ACCENT_COLORS: ColorPalette = {
  name: "accent",
  colors: [
    "#FF6B6B", // Light Red
    "#4ECDC4", // Teal
    "#45B7D1", // Sky Blue
    "#96CEB4", // Sage Green
    "#FFEAA7", // Light Yellow
    "#DDA0DD", // Plum
    "#98D8C8", // Mint
    "#F7DC6F", // Soft Yellow
  ],
};

/**
 * Generate custom color palette
 * @param baseColor - Base color to generate variations from
 * @param count - Number of variations to generate
 * @returns Color palette with variations
 */
export const generateColorPalette = (
  baseColor: string, 
  count: number = 8
): ColorPalette => {
  const colors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    // Simple color variation logic - in real implementation, 
    // this would use HSL/HSV color space manipulation
    colors.push(baseColor);
  }
  
  return {
    name: "custom",
    colors,
  };
};

// Legacy exports for backward compatibility
export const PRIMARY_COLORS = DEFAULT_PRIMARY_COLORS.colors;
export const SECONDARY_COLORS = DEFAULT_SECONDARY_COLORS.colors;
export const ACCENT_COLORS = DEFAULT_ACCENT_COLORS.colors;