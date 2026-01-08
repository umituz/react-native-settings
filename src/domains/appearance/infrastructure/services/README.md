# Appearance Services

Service layer for appearance domain including system theme detection, validation, and appearance management.

## Services

### AppearanceService

Main service for managing appearance settings including theme mode, custom colors, and system theme detection.

```typescript
import { AppearanceService } from '@umituz/react-native-settings';

const appearanceService = new AppearanceService();

// Get current theme mode
const themeMode = await appearanceService.getThemeMode();

// Set theme mode
await appearanceService.setThemeMode('dark');

// Get custom colors
const colors = await appearanceService.getCustomColors();

// Set custom colors
await appearanceService.setCustomColors({ primary: '#FF5722' });

// Reset to defaults
await appearanceService.resetColors();
```

#### Methods

**getThemeMode(): Promise<'light' | 'dark' | 'auto'>**

Gets the current theme mode setting.

```typescript
const themeMode = await appearanceService.getThemeMode();
console.log(themeMode); // 'light' | 'dark' | 'auto'
```

**setThemeMode(mode: 'light' | 'dark' | 'auto'): Promise<void>**

Sets the theme mode setting.

```typescript
await appearanceService.setThemeMode('dark');
```

**getCustomColors(): Promise<ColorPalette | undefined>**

Gets the custom color palette if set.

```typescript
const colors = await appearanceService.getCustomColors();
if (colors) {
  console.log(colors.primary);
}
```

**setCustomColors(colors: ColorPalette): Promise<void>**

Sets the custom color palette.

```typescript
await appearanceService.setCustomColors({
  primary: '#FF5722',
  secondary: '#2196F3',
  accent: '#FFC107',
  background: '#FFFFFF',
  surface: '#F5F5F5',
});
```

**resetColors(): Promise<void>**

Resets colors to default theme.

```typescript
await appearanceService.resetColors();
```

### SystemThemeDetectionService

Service for detecting and monitoring system theme changes.

```typescript
import { SystemThemeDetectionService } from '@umituz/react-native-settings';

const detectionService = new SystemThemeDetectionService();

// Get current system theme
const systemTheme = detectionService.getSystemTheme();
console.log(systemTheme); // 'light' | 'dark' | null

// Listen for system theme changes
const unsubscribe = detectionService.listen((theme) => {
  console.log('System theme changed to:', theme);
});

// Stop listening
unsubscribe();
```

#### Methods

**getSystemTheme(): 'light' | 'dark' | null**

Gets the current system theme preference.

```typescript
const theme = detectionService.getSystemTheme();
if (theme === 'dark') {
  console.log('System is in dark mode');
}
```

**listen(callback: (theme: 'light' | 'dark') => void): () => void**

Listens for system theme changes.

```typescript
const unsubscribe = detectionService.listen((theme) => {
  console.log('Theme changed to:', theme);
  // Update app theme accordingly
});

// Cleanup on unmount
useEffect(() => {
  return () => unsubscribe();
}, []);
```

### ValidationService

Service for validating appearance settings.

```typescript
import { ValidationService } from '@umituz/react-native-settings';

const validationService = new ValidationService();

// Validate theme mode
const themeValid = validationService.validateThemeMode('dark');
console.log(themeValid); // true

const themeInvalid = validationService.validateThemeMode('invalid');
console.log(themeInvalid); // false

// Validate color hex
const colorValid = validationService.validateColor('#FF5722');
console.log(colorValid); // true

const colorInvalid = validationService.validateColor('invalid');
console.log(colorInvalid); // false

// Validate color palette
const paletteValid = validationService.validateColorPalette({
  primary: '#FF5722',
  secondary: '#2196F3',
});
console.log(paletteValid); // true
```

#### Methods

**validateThemeMode(mode: string): boolean**

Validates if the provided mode is a valid theme mode.

```typescript
if (validationService.validateThemeMode(themeMode)) {
  await appearanceService.setThemeMode(themeMode);
} else {
  console.error('Invalid theme mode');
}
```

**validateColor(color: string): boolean**

Validates if the provided string is a valid hex color.

```typescript
if (validationService.validateColor('#FF5722')) {
  // Color is valid
}
```

**validateColorPalette(palette: ColorPalette): boolean**

Validates a complete color palette.

```typescript
const palette = {
  primary: '#FF5722',
  secondary: '#2196F3',
  accent: '#FFC107',
  background: '#FFFFFF',
  surface: '#F5F5F5',
};

if (validationService.validateColorPalette(palette)) {
  await appearanceService.setCustomColors(palette);
}
```

## Usage Examples

### Auto Theme with System Detection

```tsx
function useAutoTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { themeMode } = useAppearance();

  useEffect(() => {
    if (themeMode === 'auto') {
      // Use system theme
      const systemTheme = SystemThemeDetectionService.getSystemTheme();
      if (systemTheme) {
        setTheme(systemTheme);
      }

      // Listen for changes
      const unsubscribe = SystemThemeDetectionService.listen((newTheme) => {
        setTheme(newTheme);
      });

      return unsubscribe;
    } else {
      // Use explicit theme
      setTheme(themeMode === 'dark' ? 'dark' : 'light');
    }
  }, [themeMode]);

  return theme;
}
```

### Theme Persistence

```tsx
class ThemePersistence {
  private service: AppearanceService;

  constructor() {
    this.service = new AppearanceService();
  }

  async loadTheme(): Promise<'light' | 'dark' | 'auto'> {
    const mode = await this.service.getThemeMode();
    return mode;
  }

  async saveTheme(mode: 'light' | 'dark' | 'auto'): Promise<void> {
    await this.service.setThemeMode(mode);
  }

  async loadColors(): Promise<ColorPalette | undefined> {
    return await this.service.getCustomColors();
  }

  async saveColors(colors: ColorPalette): Promise<void> {
    if (ValidationService.validateColorPalette(colors)) {
      await this.service.setCustomColors(colors);
    } else {
      throw new Error('Invalid color palette');
    }
  }
}
```

### Color Validation

```tsx
function ColorInput({ value, onChange }) {
  const validationService = new ValidationService();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (color: string) => {
    if (validationService.validateColor(color)) {
      setError(null);
      onChange(color);
    } else {
      setError('Invalid color format. Use hex format: #RRGGBB');
    }
  };

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder="#FF5722"
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
```

### Theme Switcher with Validation

```tsx
function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useAppearance();
  const validationService = new ValidationService();

  const handleThemeChange = async (mode: string) => {
    if (validationService.validateThemeMode(mode)) {
      await setThemeMode(mode as 'light' | 'dark' | 'auto');
    } else {
      Alert.alert('Error', 'Invalid theme mode');
    }
  };

  return (
    <View>
      <Button
        onPress={() => handleThemeChange('light')}
        title="Light Mode"
      />
      <Button
        onPress={() => handleThemeChange('dark')}
        title="Dark Mode"
      />
      <Button
        onPress={() => handleThemeChange('auto')}
        title="Auto Mode"
      />
    </View>
  );
}
```

### Complete Appearance Manager

```tsx
class AppearanceManager {
  private appearanceService: AppearanceService;
  private detectionService: SystemThemeDetectionService;
  private validationService: ValidationService;

  constructor() {
    this.appearanceService = new AppearanceService();
    this.detectionService = new SystemThemeDetectionService();
    this.validationService = new ValidationService();
  }

  async initialize(): Promise<void> {
    const mode = await this.appearanceService.getThemeMode();
    return mode;
  }

  async setTheme(mode: 'light' | 'dark' | 'auto'): Promise<void> {
    if (!this.validationService.validateThemeMode(mode)) {
      throw new Error('Invalid theme mode');
    }

    await this.appearanceService.setThemeMode(mode);
  }

  getEffectiveTheme(): 'light' | 'dark' {
    const mode = this.appearanceService.getThemeMode();
    if (mode === 'auto') {
      return this.detectionService.getSystemTheme() || 'light';
    }
    return mode;
  }

  listenToThemeChanges(callback: (theme: 'light' | 'dark') => void): () => void {
    return this.detectionService.listen(callback);
  }

  async setCustomColors(colors: ColorPalette): Promise<void> {
    if (!this.validationService.validateColorPalette(colors)) {
      throw new Error('Invalid color palette');
    }

    await this.appearanceService.setCustomColors(colors);
  }

  async reset(): Promise<void> {
    await this.appearanceService.resetColors();
  }
}
```

## Color Palette

```typescript
interface ColorPalette {
  primary: string;      // #FF5722
  secondary: string;    // #2196F3
  accent: string;       // #FFC107
  background: string;   // #FFFFFF
  surface: string;      // #F5F5F5
  error: string;        // #F44336
  success: string;      // #4CAF50
  warning: string;      // #FF9800
}
```

## Default Palettes

### Light Theme

```typescript
const lightColors: ColorPalette = {
  primary: '#FF5722',
  secondary: '#2196F3',
  accent: '#FFC107',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
};
```

### Dark Theme

```typescript
const darkColors: ColorPalette = {
  primary: '#FF5722',
  secondary: '#2196F3',
  accent: '#FFC107',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
};
```

## Best Practices

1. **Validation**: Always validate colors before saving
2. **System Theme**: Respect system theme when mode is 'auto'
3. **Cleanup**: Unsubscribe from theme listeners on unmount
4. **Error Handling**: Handle invalid colors gracefully
5. **Hex Format**: Use proper hex color format (#RRGGBB)
6. **Persistence**: Save theme changes immediately
7. **Performance**: Cache theme detection results

## Related

- **Appearance Hooks**: React hooks for appearance
- **Appearance Components**: UI components for appearance
- **Appearance Repository**: Data persistence layer

## License

MIT
