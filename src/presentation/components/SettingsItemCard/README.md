# SettingsItemCard

A premium, consistent card component for settings items with icons, text, optional controls, and smooth interactions.

## Features

- **Versatile**: Supports buttons, switches, links, and navigation
- **Customizable**: Icon, title, subtitle, colors, and styles
- **Interactive**: Press feedback, switch controls, right icons
- **Accessible**: Full accessibility support with proper labels
- **Modern**: Sleek design, smooth animations
- **Design System**: Uses tokens for consistent styling

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Clickable Item

```tsx
import { SettingsItemCard } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <SettingsItemCard
      icon="settings-outline"
      title="Settings"
      description="Configure your preferences"
      onPress={() => navigation.navigate('Settings')}
    />
  );
}
```

### With Switch

```tsx
function NotificationsSettings() {
  const [enabled, setEnabled] = useState(true);

  return (
    <SettingsItemCard
      icon="notifications-outline"
      title="Notifications"
      description="Enable push notifications"
      showSwitch={true}
      switchValue={enabled}
      onSwitchChange={setEnabled}
    />
  );
}
```

### With Right Icon

```tsx
function LanguageItem() {
  return (
    <SettingsItemCard
      icon="globe-outline"
      title="Language"
      subtitle="English"
      rightIcon="chevron-forward"
      onPress={() => navigation.navigate('Language')}
    />
  );
}
```

### With Custom Colors

```tsx
function CustomColoredItem() {
  return (
    <SettingsItemCard
      icon="heart-outline"
      title="Favorites"
      iconBgColor="#FF5722"
      iconColor="#FFFFFF"
      onPress={() => navigation.navigate('Favorites')}
    />
  );
}
```

## Props

### SettingsItemCardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconName` | **Required** | Icon name from Ionicons |
| `title` | `string` | **Required** | Main title text |
| `subtitle` | `string` | `undefined` | Subtitle/description text |
| `description` | `string` | `undefined` | Description text (alias for subtitle) |
| `onPress` | `() => void` | `undefined` | Press handler |
| `showSwitch` | `boolean` | `false` | Show switch control |
| `switchValue` | `boolean` | `false` | Switch value |
| `onSwitchChange` | `(value: boolean) => void` | `undefined` | Switch change handler |
| `rightIcon` | `IconName` | `undefined` | Right arrow/icon |
| `iconBgColor` | `string` | `undefined` | Icon background color |
| `iconColor` | `string` | `undefined` | Icon foreground color |
| `disabled` | `boolean` | `false` | Disabled state |
| `style` | `ViewStyle` | `undefined` | Custom container style |
| `testID` | `string` | `undefined` | Test identifier |

## Component Structure

```
SettingsItemCard
├── Icon Container
│   ├── Icon Background
│   └── Icon
├── Content
│   ├── Title
│   └── Subtitle/Description
└── Right Element
    ├── Switch (if showSwitch)
    ├── Right Icon (if rightIcon)
    └── Chevron (default if onPress)
```

## Examples

### Navigation Item

```tsx
<SettingsItemCard
  icon="person-outline"
  title="Account"
  subtitle="Manage your account"
  rightIcon="chevron-forward"
  onPress={() => navigation.navigate('Account')}
/>
```

### Toggle Setting

```tsx
const [darkMode, setDarkMode] = useState(false);

<SettingsItemCard
  icon="moon-outline"
  title="Dark Mode"
  description="Enable dark theme"
  showSwitch={true}
  switchValue={darkMode}
  onSwitchChange={setDarkMode}
/>
```

### Link Item

```tsx
<SettingsItemCard
  icon="help-circle-outline"
  title="Help & Support"
  rightIcon="open-outline"
  onPress={() => Linking.openURL('https://support.example.com')}
/>
```

### With Custom Icon Colors

```tsx
<SettingsItemCard
  icon="shield-checkmark-outline"
  title="Privacy"
  iconBgColor="#4CAF50"
  iconColor="white"
  rightIcon="chevron-forward"
  onPress={() => navigation.navigate('Privacy')}
/>
```

### Disabled Item

```tsx
<SettingsItemCard
  icon="cloud-upload-outline"
  title="Cloud Sync"
  description="Not available"
  disabled={true}
/>
```

### Multiple Items in Section

```tsx
function SettingsSection() {
  return (
    <SettingsSection title="GENERAL">
      <SettingsItemCard
        icon="person-outline"
        title="Profile"
        rightIcon="chevron-forward"
        onPress={() => {}}
      />

      <SettingsItemCard
        icon="notifications-outline"
        title="Notifications"
        showSwitch={true}
        switchValue={notifications}
        onSwitchChange={setNotifications}
      />

      <SettingsItemCard
        icon="moon-outline"
        title="Dark Mode"
        showSwitch={true}
        switchValue={darkMode}
        onSwitchChange={setDarkMode}
      />
    </SettingsSection>
  );
}
```

## Styling

### Default Styles

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.lg,
    marginHorizontal: tokens.spacing.lg,
    marginTop: tokens.spacing.sm,
    borderRadius: tokens.borderRadius.lg,
    ...tokens.shadows.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: tokens.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: tokens.spacing.md,
  },
  icon: {
    size: 'lg' as const,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: '600',
    color: tokens.colors.textPrimary,
  },
  subtitle: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.textSecondary,
    marginTop: 2,
  },
});
```

### Custom Styles

```tsx
<SettingsItemCard
  icon="settings"
  title="Settings"
  style={{
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  }}
/>
```

### Pressable Styles

The component uses Pressable with pressed state feedback:

```typescript
<Pressable
  style={({ pressed }) => [
    styles.container,
    {
      backgroundColor: pressed
        ? tokens.colors.surfaceVariant
        : tokens.colors.surface,
      opacity: pressed ? 0.8 : 1,
    },
  ]}
>
```

## Icon Colors

### Default Icon Colors

Icon backgrounds use predefined colors based on icon type:

```typescript
const defaultIconColors = {
  'settings-outline': '#2196F3',
  'notifications-outline': '#FF9800',
  'person-outline': '#9C27B0',
  'moon-outline': '#673AB7',
  'globe-outline': '#00BCD4',
  'shield-checkmark-outline': '#4CAF50',
  'help-circle-outline': '#FF5722',
};
```

### Custom Icon Colors

```tsx
// Custom background color
<SettingsItemCard
  icon="heart"
  iconBgColor="#E91E63"
  iconColor="white"
  title="Favorites"
/>

// Custom color
<SettingsItemCard
  icon="star"
  iconBgColor="#FFD700"
  iconColor="#333"
  title="Premium"
/>
```

## Accessibility

### Accessibility Labels

```tsx
<SettingsItemCard
  icon="notifications-outline"
  title="Notifications"
  showSwitch={true}
  switchValue={enabled}
  onSwitchChange={setEnabled}
  accessible={true}
  accessibilityLabel="Notifications setting"
  accessibilityHint="Toggle push notifications on or off"
/>
```

### Accessibility State

```tsx
<SettingsItemCard
  icon="cloud-upload-outline"
  title="Cloud Sync"
  disabled={true}
  accessibilityState={{ disabled: true }}
/>
```

## Variants

### Minimal Variant

```tsx
<SettingsItemCard
  icon="arrow-back"
  title="Back"
  onPress={() => navigation.goBack()}
/>
```

### Detailed Variant

```tsx
<SettingsItemCard
  icon="information-circle-outline"
  title="About"
  subtitle="Version 1.0.0"
  description="Build 100"
  rightIcon="chevron-forward"
  onPress={() => navigation.navigate('About')}
/>
```

### Control Variant

```tsx
<SettingsItemCard
  icon="volume-high-outline"
  title="Sound Effects"
  description="Play sounds for actions"
  showSwitch={true}
  switchValue={soundEnabled}
  onSwitchChange={setSoundEnabled}
/>
```

## Performance

### Memoization

The component is memoized for performance:

```tsx
export const SettingsItemCard = memo<Props>((props) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.switchValue === nextProps.switchValue &&
    prevProps.disabled === nextProps.disabled
  );
});
```

### Optimization Tips

1. **Stable Handlers**: Use useCallback for press handlers
2. **Memo Values**: Memoize subtitle and description values
3. **Avoid Inline Functions**: Don't define functions in render

```tsx
const handlePress = useCallback(() => {
  navigation.navigate('Settings');
}, [navigation]);

<SettingsItemCard
  icon="settings"
  title="Settings"
  onPress={handlePress}
/>
```

## Best Practices

1. **Icons**: Use descriptive, recognizable icons
2. **Titles**: Keep titles short and clear
3. **Descriptions**: Use descriptions for context
4. **Consistency**: Maintain consistent styling
5. **Feedback**: Provide press feedback
6. **Accessibility**: Add proper labels
7. **Performance**: Use stable handlers

## Related

- **SettingsSection**: Section container component
- **SettingsContent**: Content composer
- **SettingsScreen**: Main screen component

## License

MIT
