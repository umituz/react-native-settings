# Appearance Components

Components for theme management and appearance customization including theme selection, color picking, and live preview.

## Components

### AppearanceScreen

Main screen for managing appearance settings including theme mode and custom colors.

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

function AppearanceStack() {
  return (
    <Stack.Screen
      name="Appearance"
      component={AppearanceScreen}
      options={{ title: 'Appearance' }}
    />
  );
}
```

#### Features

- Theme mode selection (light/dark/auto)
- Custom color palette configuration
- Live theme preview
- Reset to defaults

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `route` | `RouteProp` | **Required** | Route with optional config |
| `navigation` | `NavigationProp` | **Required** | Navigation object |

#### Route Params

```typescript
interface AppearanceScreenParams {
  showThemeSection?: boolean;
  showColorsSection?: boolean;
  showPreviewSection?: boolean;
}
```

### ThemeModeSection

Section component for selecting theme mode (light, dark, or auto/system).

```tsx
import { ThemeModeSection } from '@umituz/react-native-settings';

function ThemeSelector() {
  const { themeMode, setThemeMode } = useAppearance();

  return (
    <ThemeModeSection
      themeMode={themeMode}
      onThemeModeChange={setThemeMode}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `themeMode` | `'light' \| 'dark' \| 'auto'` | **Required** | Current theme mode |
| `onThemeModeChange` | `(mode: 'light' \| 'dark' \| 'auto') => void` | **Required** | Theme change handler |
| `showPreview` | `boolean` | `true` | Show theme preview |
| `title` | `string` | `'Theme'` | Section title |

#### Example

```tsx
<ThemeModeSection
  themeMode="dark"
  onThemeModeChange={(mode) => {
    console.log('Theme changed to:', mode);
    setThemeMode(mode);
  }}
  showPreview={true}
  title="Appearance"
/>
```

### CustomColorsSection

Section component for customizing color palette.

```tsx
import { CustomColorsSection } from '@umituz/react-native-settings';

function ColorCustomizer() {
  const { customColors, setCustomColors } = useAppearanceActions();

  return (
    <CustomColorsSection
      colors={customColors || defaultColors}
      onColorsChange={setCustomColors}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `ColorPalette` | **Required** | Current color palette |
| `onColorsChange` | `(colors: ColorPalette) => void` | **Required** | Color change handler |
| `availableColors` | `string[]` | `undefined` | Predefined color options |
| `showPreview` | `boolean` | `true` | Show color preview |
| `title` | `string` | `'Colors'` | Section title |

#### Example

```tsx
<CustomColorsSection
  colors={{
    primary: '#FF5722',
    secondary: '#2196F3',
    accent: '#FFC107',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  }}
  onColorsChange={(newColors) => {
    setCustomColors(newColors);
  }}
  availableColors={[
    '#FF5722', '#2196F3', '#4CAF50', '#FF9800',
    '#9C27B0', '#00BCD4', '#8BC34A', '#FFC107'
  ]}
/>
```

### AppearancePreview

Component showing live preview of theme changes.

```tsx
import { AppearancePreview } from '@umituz/react-native-settings';

function ThemePreview() {
  const { themeMode, customColors } = useAppearance();

  return (
    <AppearancePreview
      themeMode={themeMode}
      customColors={customColors}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `themeMode` | `'light' \| 'dark' \| 'auto'` | **Required** | Theme mode |
| `customColors` | `ColorPalette` | `undefined` | Custom colors |
| `showSystemTheme` | `boolean` | `true` | Show system theme |

### ThemeOption

Individual theme option button/card.

```tsx
import { ThemeOption } from '@umituz/react-native-settings';

function ThemeOptions() {
  return (
    <View>
      <ThemeOption
        mode="light"
        title="Light"
        icon="sunny-outline"
        selected={themeMode === 'light'}
        onPress={() => setThemeMode('light')}
      />

      <ThemeOption
        mode="dark"
        title="Dark"
        icon="moon-outline"
        selected={themeMode === 'dark'}
        onPress={() => setThemeMode('dark')}
      />

      <ThemeOption
        mode="auto"
        title="Auto"
        icon="phone-portrait-outline"
        selected={themeMode === 'auto'}
        onPress={() => setThemeMode('auto')}
      />
    </View>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'light' \| 'dark' \| 'auto'` | **Required** | Theme mode |
| `title` | `string` | **Required** | Theme title |
| `icon` | `IconName` | **Required** | Theme icon |
| `selected` | `boolean` | `false` | Selected state |
| `onPress` | `() => void` | **Required** | Press handler |
| `description` | `string` | `undefined` | Theme description |

### ColorPicker

Color picker component for selecting custom colors.

```tsx
import { ColorPicker } from '@umituz/react-native-settings';

function PrimaryColorPicker() {
  const [color, setColor] = useState('#FF5722');

  return (
    <ColorPicker
      label="Primary Color"
      value={color}
      onChange={setColor}
      availableColors={['#FF5722', '#2196F3', '#4CAF50', '#FF9800']}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **Required** | Color label |
| `value` | `string` | **Required** | Current color (hex) |
| `onChange` | `(color: string) => void` | **Required** | Change handler |
| `availableColors` | `string[]` | `undefined` | Predefined colors |
| `showCustomPicker` | `boolean` | `true` | Show custom color picker |
| `allowAlpha` | `boolean` | `false` | Allow alpha channel |

## Examples

### Complete Appearance Screen

```tsx
function AppearanceScreen() {
  const { themeMode, customColors } = useAppearance();
  const { setThemeMode, setCustomColors, resetColors } = useAppearanceActions();

  return (
    <ScrollView>
      <AppearancePreview
        themeMode={themeMode}
        customColors={customColors}
      />

      <ThemeModeSection
        themeMode={themeMode}
        onThemeModeChange={setThemeMode}
        showPreview={true}
      />

      <CustomColorsSection
        colors={customColors || defaultColors}
        onColorsChange={setCustomColors}
        showPreview={true}
      />

      <TouchableOpacity onPress={resetColors}>
        <Text>Reset to Defaults</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

### Custom Color Palette

```tsx
function CustomThemeBuilder() {
  const [colors, setColors] = useState(defaultColors);
  const { setCustomColors } = useAppearanceActions();

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View>
      <ColorPicker
        label="Primary"
        value={colors.primary}
        onChange={(color) => handleColorChange('primary', color)}
      />

      <ColorPicker
        label="Secondary"
        value={colors.secondary}
        onChange={(color) => handleColorChange('secondary', color)}
      />

      <ColorPicker
        label="Accent"
        value={colors.accent}
        onChange={(color) => handleColorChange('accent', color)}
      />

      <Button
        onPress={() => setCustomColors(colors)}
        title="Apply Theme"
      />
    </View>
  );
}
```

### Theme Switcher

```tsx
function QuickThemeSwitcher() {
  const { themeMode, setThemeMode } = useAppearanceActions();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, themeMode === 'light' && styles.selected]}
        onPress={() => setThemeMode('light')}
      >
        <Ionicons name="sunny" size={24} />
        <Text>Light</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, themeMode === 'dark' && styles.selected]}
        onPress={() => setThemeMode('dark')}
      >
        <Ionicons name="moon" size={24} />
        <Text>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, themeMode === 'auto' && styles.selected]}
        onPress={() => setThemeMode('auto')}
      >
        <Ionicons name="phone-portrait" size={24} />
        <Text>Auto</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Preset Themes

```tsx
function ThemePresets() {
  const { setCustomColors } = useAppearanceActions();

  const presets = {
    ocean: {
      primary: '#2196F3',
      secondary: '#00BCD4',
      accent: '#4FC3F7',
    },
    sunset: {
      primary: '#FF5722',
      secondary: '#FF9800',
      accent: '#FFC107',
    },
    forest: {
      primary: '#4CAF50',
      secondary: '#8BC34A',
      accent: '#CDDC39',
    },
  };

  return (
    <View>
      <Text>Choose a preset theme:</Text>

      {Object.entries(presets).map(([name, colors]) => (
        <TouchableOpacity
          key={name}
          onPress={() => setCustomColors(colors)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: colors.primary, width: 20, height: 20 }} />
            <View style={{ backgroundColor: colors.secondary, width: 20, height: 20 }} />
            <View style={{ backgroundColor: colors.accent, width: 20, height: 20 }} />
            <Text>{name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

## Styling

### Theme Styles

```typescript
const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.lg,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borderRadius.md,
    marginBottom: tokens.spacing.sm,
  },
  themeOptionSelected: {
    borderWidth: 2,
    borderColor: tokens.colors.primary,
  },
  themeIcon: {
    marginRight: tokens.spacing.md,
  },
  themeTitle: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: '600',
    color: tokens.colors.textPrimary,
  },
  themeDescription: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.textSecondary,
  },
});
```

## Color Palettes

### Light Theme Default

```typescript
const lightColors: ColorPalette = {
  primary: '#2196F3',
  secondary: '#00BCD4',
  accent: '#FFC107',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
};
```

### Dark Theme Default

```typescript
const darkColors: ColorPalette = {
  primary: '#2196F3',
  secondary: '#00BCD4',
  accent: '#FFC107',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
};
```

## Best Practices

1. **Preview**: Always show theme preview
2. **System Theme**: Respect system preference in auto mode
3. **Persistence**: Save theme changes immediately
4. **Validation**: Validate color hex codes
5. **Reset**: Provide reset to defaults
6. **Performance**: Use smooth transitions
7. **Accessibility**: Ensure sufficient contrast

## Related

- **Appearance Hooks**: Theme management hooks
- **Appearance Services**: System theme detection
- **Appearance Domain**: Appearance domain documentation

## License

MIT
