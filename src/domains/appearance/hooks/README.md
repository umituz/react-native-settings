# Appearance Hooks

Custom hooks for managing appearance settings including theme mode and custom colors.

## Hooks

### useAppearance

Hook for accessing current appearance settings and theme mode.

```tsx
import { useAppearance } from '@umituz/react-native-settings';

function AppearanceScreen() {
  const { themeMode, customColors, isLoading } = useAppearance();

  return (
    <View>
      <Text>Current theme: {themeMode}</Text>
      {customColors && <Text>Custom colors enabled</Text>}
    </View>
  );
}
```

#### Returns

```typescript
interface UseAppearanceResult {
  themeMode: 'light' | 'dark' | 'auto';   // Current theme mode
  customColors?: ColorPalette;             // Custom color palette
  isLoading: boolean;                      // Loading state
  error?: Error;                           // Error object
}
```

#### Examples

**Basic Usage:**

```tsx
function ThemeDisplay() {
  const { themeMode } = useAppearance();

  return (
    <Text>Current theme: {themeMode}</Text>
  );
}
```

**With Loading State:**

```tsx
function ThemeSelector() {
  const { themeMode, isLoading } = useAppearance();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Picker selectedValue={themeMode}>
      <Picker.Item label="Light" value="light" />
      <Picker.Item label="Dark" value="dark" />
      <Picker.Item label="Auto" value="auto" />
    </Picker>
  );
}
```

**With Custom Colors:**

```tsx
function ColorDisplay() {
  const { customColors } = useAppearance();

  return (
    <View>
      <View style={{ backgroundColor: customColors?.primary }} />
      <View style={{ backgroundColor: customColors?.secondary }} />
      <View style={{ backgroundColor: customColors?.accent }} />
    </View>
  );
}
```

### useAppearanceActions

Hook for accessing appearance action functions to update theme and colors.

```tsx
import { useAppearanceActions } from '@umituz/react-native-settings';

function AppearanceControls() {
  const { setThemeMode, setCustomColors, resetColors } = useAppearanceActions();

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setThemeMode(theme);
  };

  const handleSetColors = (colors: ColorPalette) => {
    setCustomColors(colors);
  };

  const handleReset = () => {
    resetColors();
  };

  return (
    <View>
      <Button onPress={() => handleThemeChange('dark')} title="Dark Mode" />
      <Button onPress={() => handleSetColors(newColors)} title="Set Colors" />
      <Button onPress={handleReset} title="Reset Colors" />
    </View>
  );
}
```

#### Returns

```typescript
interface UseAppearanceActionsResult {
  setThemeMode: (themeMode: 'light' | 'dark' | 'auto') => void;
  setCustomColors: (colors: ColorPalette) => void;
  resetColors: () => void;
  isUpdating: boolean;
}
```

#### Actions

**setThemeMode:**

Sets the theme mode.

```tsx
const { setThemeMode } = useAppearanceActions();

// Set to dark mode
setThemeMode('dark');

// Set to light mode
setThemeMode('light');

// Set to auto (system preference)
setThemeMode('auto');
```

**setCustomColors:**

Sets custom color palette.

```tsx
const { setCustomColors } = useAppearanceActions();

const colors = {
  primary: '#FF5722',
  secondary: '#2196F3',
  accent: '#FFC107',
  background: '#FFFFFF',
  surface: '#F5F5F5',
};

setCustomColors(colors);
```

**resetColors:**

Resets to default colors.

```tsx
const { resetColors } = useAppearanceActions();

resetColors();
```

## Complete Example

### Theme Switcher

```tsx
function ThemeSwitcher() {
  const { themeMode } = useAppearance();
  const { setThemeMode } = useAppearanceActions();

  return (
    <View>
      <Text>Current Theme: {themeMode}</Text>

      <TouchableOpacity onPress={() => setThemeMode('light')}>
        <Text>Light Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setThemeMode('dark')}>
        <Text>Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setThemeMode('auto')}>
        <Text>Auto (System)</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Color Customizer

```tsx
function ColorCustomizer() {
  const { customColors } = useAppearance();
  const { setCustomColors, resetColors } = useAppearanceActions();

  const [colors, setColors] = useState(customColors || defaultColors);

  const handleSave = () => {
    setCustomColors(colors);
  };

  const handleReset = () => {
    resetColors();
    setColors(defaultColors);
  };

  return (
    <View>
      <ColorPicker
        label="Primary Color"
        value={colors.primary}
        onChange={(color) => setColors({ ...colors, primary: color })}
      />

      <ColorPicker
        label="Secondary Color"
        value={colors.secondary}
        onChange={(color) => setColors({ ...colors, secondary: color })}
      />

      <Button onPress={handleSave} title="Save Colors" />
      <Button onPress={handleReset} title="Reset to Default" />
    </View>
  );
}
```

### Theme Toggle Button

```tsx
function ThemeToggleButton() {
  const { themeMode } = useAppearance();
  const { setThemeMode } = useAppearanceActions();
  const isDark = themeMode === 'dark';

  const handleToggle = useCallback(() => {
    setThemeMode(isDark ? 'light' : 'dark');
  }, [isDark, setThemeMode]);

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
}
```

### Live Preview

```tsx
function AppearancePreview() {
  const { themeMode, customColors } = useAppearance();
  const { setThemeMode } = useAppearanceActions();

  const effectiveTheme = useEffectiveTheme(themeMode);

  return (
    <View style={{ backgroundColor: effectiveTheme.background }}>
      <Text style={{ color: effectiveTheme.text }}>
        Theme Preview
      </Text>

      <View style={{ backgroundColor: customColors?.primary }}>
        <Text>Primary Color</Text>
      </View>

      <TouchableOpacity onPress={() => setThemeMode('dark')}>
        <Text>Switch to Dark</Text>
      </TouchableOpacity>
    </View>
  );
}

function useEffectiveTheme(themeMode: 'light' | 'dark' | 'auto') {
  const systemTheme = useColorScheme();
  const effectiveMode = themeMode === 'auto' ? systemTheme : themeMode;

  return effectiveMode === 'dark' ? darkTheme : lightTheme;
}
```

## System Theme Detection

### Auto Theme

```tsx
function AutoThemeDetector() {
  const { themeMode } = useAppearance();
  const systemTheme = useColorScheme();

  const effectiveTheme = useMemo(() => {
    if (themeMode === 'auto') {
      return systemTheme;
    }
    return themeMode;
  }, [themeMode, systemTheme]);

  return (
    <Text>
      Theme Mode: {themeMode}
      Effective Theme: {effectiveTheme}
    </Text>
  );
}
```

### Theme Provider

```tsx
function AppearanceProvider({ children }) {
  const { themeMode, customColors } = useAppearance();

  const theme = useMemo(() => ({
    mode: themeMode,
    colors: customColors || defaultColors,
  }), [themeMode, customColors]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Best Practices

1. **Persistence**: Theme changes are automatically persisted
2. **System Preference**: Respect system theme when mode is 'auto'
3. **Transition**: Use smooth transitions when changing themes
4. **Validation**: Validate color values before setting
5. **Reset**: Provide option to reset to defaults
6. **Preview**: Show live preview of changes
7. **Performance**: Use useMemo for expensive calculations

## Related

- **AppearanceScreen**: Appearance screen component
- **ThemeModeSection**: Theme mode section
- **CustomColorsSection**: Custom colors section
- **Appearance Store**: Zustand store for appearance state

## License

MIT
