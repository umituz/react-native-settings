# Appearance Domain

The Appearance domain provides comprehensive theme management and customization capabilities for your React Native app, including light/dark mode switching and custom color schemes.

## Features

- **Theme Mode Switching**: Toggle between light and dark themes
- **Custom Color Schemes**: Define and apply custom color palettes
- **Live Preview**: See theme changes in real-time
- **Persistent Settings**: Theme preferences are saved automatically
- **System Theme Detection**: Respect device theme preferences
- **Type-Safe**: Full TypeScript support

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### AppearanceScreen

The main screen for managing appearance settings including theme mode and custom colors.

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

function MyAppearanceScreen() {
  return <AppearanceScreen />;
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `texts` | `AppearanceTexts` | `undefined` | Custom text labels |
| `headerComponent` | `ReactNode` | `undefined` | Custom header component |
| `showThemeSection` | `boolean` | `true` | Show theme mode section |
| `showColorsSection` | `boolean` | `true` | Show custom colors section |
| `showPreviewSection` | `boolean` | `true` | Show preview section |

#### Example with Custom Texts

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

function LocalizedAppearanceScreen() {
  const texts = {
    title: 'Appearance',
    subtitle: 'Customize your app experience',
    themeSectionTitle: 'Theme',
    themeSectionDescription: 'Choose your preferred theme mode',
    featuresSectionTitle: 'Features',
    colorsSectionTitle: 'Custom Colors',
    colorsSectionDescription: 'Personalize your color scheme',
    previewSectionTitle: 'Preview',
    previewSectionDescription: 'See how your changes look',
    resetButtonText: 'Reset to Default',
    lightMode: {
      title: 'Light Mode',
      subtitle: 'Bright and clean',
      description: 'Perfect for daytime use',
      features: ['Easy on the eyes', 'Better visibility', 'Classic look'],
    },
    darkMode: {
      title: 'Dark Mode',
      subtitle: 'Easy on the eyes',
      description: 'Great for low-light environments',
      features: ['Reduces eye strain', 'Saves battery', 'Modern look'],
    },
  };

  return <AppearanceScreen texts={texts} />;
}
```

### ThemeModeSection

Section for selecting between light and dark theme modes.

```tsx
import { ThemeModeSection } from '@umituz/react-native-settings';

function ThemeSection() {
  const themes = [
    {
      mode: 'light',
      title: 'Light Mode',
      subtitle: 'Bright and clean',
      description: 'Perfect for daytime use',
      features: ['Easy on the eyes', 'Better visibility'],
    },
    {
      mode: 'dark',
      title: 'Dark Mode',
      subtitle: 'Easy on the eyes',
      description: 'Great for low-light environments',
      features: ['Reduces eye strain', 'Saves battery'],
    },
  ];

  return (
    <ThemeModeSection
      themeMode="dark"
      onThemeSelect={(mode) => console.log('Selected:', mode)}
      title="Choose Theme"
      description="Select your preferred theme"
      themes={themes}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `DesignTokens` | **Required** | Design tokens from design system |
| `themeMode` | `ThemeMode` | **Required** | Current theme mode |
| `onThemeSelect` | `(mode) => void` | **Required** | Theme change handler |
| `title` | `string` | `undefined` | Section title |
| `description` | `string` | `undefined` | Section description |
| `themes` | `ThemeOptionConfig[]` | **Required** | Available theme options |

### CustomColorsSection

Section for customizing app colors.

```tsx
import { CustomColorsSection } from '@umituz/react-native-settings';

function ColorsSection() {
  const customColors = {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF9500',
  };

  return (
    <CustomColorsSection
      localCustomColors={customColors}
      onColorChange={(key, color) => console.log(`${key}: ${color}`)}
      onResetColors={() => console.log('Reset colors')}
      title="Custom Colors"
      description="Personalize your color scheme"
      resetButtonText="Reset"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `DesignTokens` | **Required** | Design tokens from design system |
| `localCustomColors` | `CustomThemeColors` | **Required** | Current custom colors |
| `onColorChange` | `(key, color) => void` | **Required** | Color change handler |
| `onResetColors` | `() => void` | **Required** | Reset handler |
| `title` | `string` | `undefined` | Section title |
| `description` | `string` | `undefined` | Section description |
| `resetButtonText` | `string` | `undefined` | Reset button text |

### AppearancePreview

Live preview component showing how theme changes look.

```tsx
import { AppearancePreview } from '@umituz/react-native-settings';

function PreviewSection() {
  const customColors = {
    primary: '#007AFF',
    secondary: '#5856D6',
  };

  return (
    <AppearancePreview
      localCustomColors={customColors}
      title="Preview"
      description="See how your changes look in real-time"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `DesignTokens` | **Required** | Design tokens from design system |
| `localCustomColors` | `CustomThemeColors` | **Required** | Custom colors to preview |
| `title` | `string` | `undefined` | Section title |
| `description` | `string` | `undefined` | Section description |

### ColorPicker

Color picker component for selecting custom colors.

```tsx
import { ColorPicker } from '@umituz/react-native-settings';

function MyColorPicker() {
  return (
    <ColorPicker
      label="Primary Color"
      value="#007AFF"
      onChange={(color) => console.log('Color:', color)}
    />
  );
}
```

### AppearanceHeader

Header component for the appearance screen.

```tsx
import { AppearanceHeader } from '@umituz/react-native-settings';

function MyAppearanceHeader() {
  const tokens = useAppDesignTokens();

  return (
    <AppearanceHeader
      tokens={tokens}
      title="Appearance"
      subtitle="Customize your app"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `DesignTokens` | **Required** | Design tokens |
| `title` | `string` | `undefined` | Header title |
| `subtitle` | `string` | `undefined` | Header subtitle |

## Hooks

### useAppearance

Main hook for accessing and managing appearance settings.

```tsx
import { useAppearance } from '@umituz/react-native-settings';

function MyComponent() {
  const {
    themeMode,
    customColors,
    isLoading,
    setThemeMode,
    setCustomColors,
    reset,
  } = useAppearance();

  return (
    <View>
      <Text>Current theme: {themeMode}</Text>
      <Button title="Switch to Dark" onPress={() => setThemeMode('dark')} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `themeMode` | `ThemeMode` | Current theme mode (`'light'` or `'dark'`) |
| `customColors` | `CustomThemeColors \| undefined` | Custom color scheme |
| `isLoading` | `boolean` | Loading state |
| `setThemeMode` | `(mode) => void` | Function to set theme mode |
| `setCustomColors` | `(colors) => void` | Function to set custom colors |
| `reset` | `() => void` | Reset to default appearance |

### useAppearanceActions

Hook for appearance-related actions and handlers.

```tsx
import { useAppearanceActions } from '@umituz/react-native-settings';

function AppearanceActions() {
  const {
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  } = useAppearanceActions();

  return (
    <View>
      <Button
        title="Select Dark Theme"
        onPress={() => handleThemeSelect('dark')}
      />
      <Button
        title="Change Primary Color"
        onPress={() => handleColorChange('primary', '#FF0000')}
      />
      <Button title="Reset Colors" onPress={handleResetColors} />
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `localCustomColors` | `CustomThemeColors` | Current custom colors |
| `handleThemeSelect` | `(mode) => void` | Handle theme selection |
| `handleColorChange` | `(key, color) => void` | Handle color change |
| `handleResetColors` | `() => void` | Handle color reset |

## Types

### ThemeMode

```typescript
type ThemeMode = 'light' | 'dark';
```

### CustomThemeColors

```typescript
interface CustomThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  surface?: string;
  // ... more color options
}
```

### AppearanceSettings

```typescript
interface AppearanceSettings {
  themeMode: ThemeMode;
  customColors?: CustomThemeColors;
}
```

### AppearanceTexts

```typescript
interface AppearanceTexts {
  title?: string;
  subtitle?: string;
  themeSectionTitle?: string;
  themeSectionDescription?: string;
  featuresSectionTitle?: string;
  colorsSectionTitle?: string;
  colorsSectionDescription?: string;
  previewSectionTitle?: string;
  previewSectionDescription?: string;
  resetButtonText?: string;
  lightMode?: ThemeModeTextConfig;
  darkMode?: ThemeModeTextConfig;
}
```

### ThemeModeTextConfig

```typescript
interface ThemeModeTextConfig {
  title: string;
  subtitle?: string;
  description?: string;
  features: string[];
}
```

### ThemeOptionConfig

```typescript
interface ThemeOptionConfig {
  mode: ThemeMode;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  featuresTitle?: string;
}
```

## Examples

### Basic Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { AppearanceScreen } from '@umituz/react-native-settings';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppearanceScreen />
    </View>
  );
}
```

### Custom Sections

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

function CustomAppearanceScreen() {
  return (
    <AppearanceScreen
      showThemeSection={true}
      showColorsSection={false}  // Hide color customization
      showPreviewSection={true}
    />
  );
}
```

### Using the Hook

```tsx
import { useAppearance } from '@umituz/react-native-settings';

function ThemeToggle() {
  const { themeMode, setThemeMode } = useAppearance();

  return (
    <View>
      <Text>Current: {themeMode}</Text>
      <Button
        title="Toggle Theme"
        onPress={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
      />
    </View>
  );
}
```

### Custom Colors

```tsx
import { useAppearance } from '@umituz/react-native-settings';

function ColorCustomizer() {
  const { customColors, setCustomColors } = useAppearance();

  const applyCustomTheme = () => {
    setCustomColors({
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
    });
  };

  return (
    <View>
      <Text>Primary: {customColors?.primary}</Text>
      <Button title="Apply Custom Theme" onPress={applyCustomTheme} />
    </View>
  );
}
```

### Complete Customization

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

function FullyCustomizedScreen() {
  const texts = {
    title: 'Personalization',
    subtitle: 'Make it yours',
    themeSectionTitle: 'Theme Mode',
    colorsSectionTitle: 'Color Palette',
    resetButtonText: 'Reset Everything',
    lightMode: {
      title: 'Light',
      features: ['Clean look', 'Better readability'],
    },
    darkMode: {
      title: 'Dark',
      features: ['Easy on eyes', 'Saves battery'],
    },
  };

  const customHeader = (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        App Settings
      </Text>
    </View>
  );

  return (
    <AppearanceScreen
      texts={texts}
      headerComponent={customHeader}
      showPreviewSection={false}
    />
  );
}
```

## Architecture

The Appearance domain follows a clean architecture pattern:

```
src/domains/appearance/
├── application/           # Application logic
│   └── ports/            # Repository interfaces
├── infrastructure/        # Implementation
│   ├── repositories/     # Data persistence
│   └── services/         # System theme detection, validation
├── presentation/          # UI components
│   ├── screens/         # AppearanceScreen
│   ├── components/      # ThemeModeSection, CustomColorsSection, etc.
│   └── hooks/           # useAppearance, useAppearanceActions
├── data/                 # Color palettes and constants
└── types/               # TypeScript definitions
```

## Best Practices

1. **Respect System Theme**: Detect and respect the user's device theme preference
2. **Provide Preview**: Always show users how changes look before applying
3. **Smooth Transitions**: Animate theme changes for a polished experience
4. **Persist Choices**: Save theme preferences automatically
5. **Accessibility First**: Ensure good contrast ratios in both themes
6. **Test Both Themes**: Verify your UI looks good in light and dark modes

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { AppearanceScreen } from '@umituz/react-native-settings';

describe('AppearanceScreen', () => {
  it('displays theme options', () => {
    const { getByText } = render(<AppearanceScreen />);

    expect(getByText(/light/i)).toBeTruthy();
    expect(getByText(/dark/i)).toBeTruthy();
  });

  it('handles theme selection', () => {
    const { getByText } = render(<AppearanceScreen />);

    const darkButton = getByText(/dark/i);
    fireEvent.press(darkButton);

    // Assert theme changed
  });
});
```

## Integration with Design System

This domain integrates seamlessly with `@umituz/react-native-design-system`:

```tsx
import { useAppDesignTokens, ThemeProvider } from '@umituz/react-native-design-system';
import { AppearanceScreen } from '@umituz/react-native-settings';

function App() {
  return (
    <ThemeProvider>
      <AppearanceScreen />
    </ThemeProvider>
  );
}
```

## Related

- **Settings**: Main settings management
- **Design System**: Theme and styling foundation
- **Storage**: Persistent theme storage

## License

MIT
