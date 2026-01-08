# Core Settings Components

Reusable core components for building settings screens in React Native apps. These components provide a consistent, modern UI for settings interfaces.

## Components

### SettingsItemCard

A premium, consistent card component for settings items with icons, text, and optional controls.

```tsx
import { SettingsItemCard } from '@umituz/react-native-settings';

// Basic clickable item
<SettingsItemCard
  icon="settings-outline"
  title="Settings"
  description="Configure your preferences"
  onPress={() => navigation.navigate('Settings')}
/>

// With switch
<SettingsItemCard
  icon="notifications-outline"
  title="Notifications"
  showSwitch={true}
  switchValue={enabled}
  onSwitchChange={setEnabled}
/>

// Disabled state
<SettingsItemCard
  icon="cloud-outline"
  title="Cloud Sync"
  description="Sync disabled"
  disabled={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Item title |
| `icon` | `IconName` | **Required** | Icon from design system |
| `description` | `string` | `undefined` | Optional description/value |
| `onPress` | `() => void` | `undefined` | Press handler |
| `showSwitch` | `boolean` | `false` | Show switch toggle |
| `switchValue` | `boolean` | `undefined` | Switch state |
| `onSwitchChange` | `(val) => void` | `undefined` | Switch change handler |
| `rightIcon` | `IconName` | `'chevron-forward'` | Custom right icon |
| `iconBgColor` | `string` | `primary with opacity` | Icon background |
| `iconColor` | `string` | `primary` | Icon color |
| `showChevron` | `boolean` | `auto` | Force chevron visibility |
| `disabled` | `boolean` | `false` | Disable interaction |
| `containerStyle` | `ViewStyle` | `undefined` | Custom container style |
| `sectionTitle` | `string` | `undefined` | Section title above item |

#### Examples

**Settings Navigation:**

```tsx
<SettingsItemCard
  icon="person-outline"
  title="Account"
  description="Manage your account"
  onPress={() => navigation.navigate('Account')}
/>

<SettingsItemCard
  icon="moon-outline"
  title="Appearance"
  description="Theme, colors"
  onPress={() => navigation.navigate('Appearance')}
/>
```

**Toggle Switches:**

```tsx
<SettingsItemCard
  icon="notifications-outline"
  title="Push Notifications"
  showSwitch={true}
  switchValue={pushEnabled}
  onSwitchChange={setPushEnabled}
/>

<SettingsItemCard
  icon="volume-high-outline"
  title="Sound Effects"
  description="Play sounds for actions"
  showSwitch={true}
  switchValue={soundEnabled}
  onSwitchChange={setSoundEnabled}
/>
```

**With Custom Icons:**

```tsx
<SettingsItemCard
  icon="shield-checkmark-outline"
  title="Privacy"
  description="Manage your privacy"
  iconColor="#10B981"
  iconBgColor="rgba(16, 185, 129, 0.1)"
  onPress={() => navigation.navigate('Privacy')}
/>
```

**With Right Icon:**

```tsx
<SettingsItemCard
  icon="globe-outline"
  title="Language"
  description="English"
  rightIcon="chevron-down"
  onPress={() => setShowLanguagePicker(true)}
/>
```

### SettingsSection

Section container for grouping related settings items with a title.

```tsx
import { SettingsSection } from '@umituz/react-native-settings';

<SettingsSection title="PREFERENCES">
  <SettingsItemCard icon="moon-outline" title="Dark Mode" showSwitch={true} />
  <SettingsItemCard icon="globe-outline" title="Language" description="English" />
</SettingsSection>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Section title |
| `children` | `ReactNode` | **Required** | Section content |

#### Example

```tsx
<View>
  <SettingsSection title="GENERAL">
    <SettingsItemCard
      icon="person-outline"
      title="Account"
      onPress={handleAccount}
    />
    <SettingsItemCard
      icon="notifications-outline"
      title="Notifications"
      onPress={handleNotifications}
    />
  </SettingsSection>

  <SettingsSection title="APPEARANCE">
    <SettingsItemCard
      icon="moon-outline"
      title="Dark Mode"
      showSwitch={true}
      switchValue={isDarkMode}
      onSwitchChange={setDarkMode}
    />
    <SettingsItemCard
      icon="color-palette-outline"
      title="Theme Color"
      description="Blue"
      onPress={handleThemeColor}
    />
  </SettingsSection>
</View>
```

### SettingsFooter

Footer component displaying app version information.

```tsx
import { SettingsFooter } from '@umituz/react-native-settings';

<SettingsFooter versionText="Version 1.0.0" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `versionText` | `string` | `undefined` | Custom version text |

#### Example

```tsx
import { SettingsFooter } from '@umituz/react-native-settings';
import { Constants } from 'expo-constants';

function MySettingsScreen() {
  const version = Constants.expoConfig?.version || '1.0.0';

  return (
    <View>
      {/* Settings content */}

      <SettingsFooter versionText={`Version ${version}`} />
    </View>
  );
}
```

### SettingsErrorBoundary

Error boundary component for catching and displaying errors in settings screens.

```tsx
import { SettingsErrorBoundary } from '@umituz/react-native-settings';

<SettingsErrorBoundary
  fallbackTitle="custom.error.title"
  fallbackMessage="custom.error.message"
>
  <YourSettingsComponents />
</SettingsErrorBoundary>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Child components |
| `fallback` | `ReactNode` | `undefined` | Custom fallback component |
| `fallbackTitle` | `string` | `undefined` | Error title translation key |
| `fallbackMessage` | `string` | `undefined` | Error message translation key |

#### Example

```tsx
<SettingsErrorBoundary
  fallbackTitle="settings_error"
  fallbackMessage="settings_error_message"
>
  <SettingsScreen />
</SettingsErrorBoundary>
```

**Custom Fallback:**

```tsx
const customFallback = (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Icon name="warning" size={64} color="#F59E0B" />
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16 }}>
      Settings Error
    </Text>
    <Button title="Retry" onPress={() => window.location.reload()} />
  </View>
);

<SettingsErrorBoundary fallback={customFallback}>
  <SettingsContent />
</SettingsErrorBoundary>
```

## Complete Examples

### Basic Settings Screen

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SettingsSection, SettingsItemCard, SettingsFooter } from '@umituz/react-native-settings';

function BasicSettingsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SettingsSection title="PREFERENCES">
        <SettingsItemCard
          icon="moon-outline"
          title="Dark Mode"
          showSwitch={true}
          switchValue={isDarkMode}
          onSwitchChange={setDarkMode}
        />
        <SettingsItemCard
          icon="globe-outline"
          title="Language"
          description="English"
          onPress={() => {}}
        />
      </SettingsSection>

      <SettingsSection title="SUPPORT">
        <SettingsItemCard
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => navigation.navigate('Help')}
        />
        <SettingsItemCard
          icon="chatbubble-outline"
          title="Contact Us"
          onPress={() => navigation.navigate('Contact')}
        />
      </SettingsSection>

      <SettingsFooter versionText="Version 1.0.0" />
    </ScrollView>
  );
}
```

### Advanced Settings Screen

```tsx
function AdvancedSettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
    autoSync: false,
  });

  return (
    <ScreenLayout>
      <SettingsSection title="NOTIFICATIONS">
        <SettingsItemCard
          icon="notifications-outline"
          title="Push Notifications"
          description="Receive push notifications"
          showSwitch={true}
          switchValue={settings.notifications}
          onSwitchChange={(value) => setSettings({ ...settings, notifications: value })}
        />
        <SettingsItemCard
          icon="mail-outline"
          title="Email Notifications"
          description="Receive email updates"
          showSwitch={true}
          switchValue={settings.emailNotifications}
          onSwitchChange={(value) => setSettings({ ...settings, emailNotifications: value })}
        />
      </SettingsSection>

      <SettingsSection title="APPEARANCE">
        <SettingsItemCard
          icon="moon-outline"
          title="Dark Mode"
          description="Use dark theme"
          showSwitch={true}
          switchValue={settings.darkMode}
          onSwitchChange={(value) => setSettings({ ...settings, darkMode: value })}
        />
        <SettingsItemCard
          icon="color-palette-outline"
          title="Theme Color"
          description="Blue"
          onPress={() => navigation.navigate('ThemeColor')}
        />
      </SettingsSection>

      <SettingsSection title="SYNC">
        <SettingsItemCard
          icon="cloud-outline"
          title="Auto Sync"
          description="Sync data automatically"
          showSwitch={true}
          switchValue={settings.autoSync}
          onSwitchChange={(value) => setSettings({ ...settings, autoSync: value })}
        />
        <SettingsItemCard
          icon="refresh-outline"
          title="Sync Now"
          description="Last synced: 5 minutes ago"
          onPress={handleManualSync}
        />
      </SettingsSection>

      <SettingsFooter versionText={`Version ${Constants.expoConfig.version}`} />
    </ScreenLayout>
  );
}
```

### With Error Boundary

```tsx
function SettingsScreenWithErrorBoundary() {
  return (
    <SettingsErrorBoundary
      fallbackTitle="settings.error.title"
      fallbackMessage="settings.error.message"
    >
      <SettingsContent />
    </SettingsErrorBoundary>
  );
}
```

## Styling

All components use the design system tokens for consistent styling:

- **Colors**: Automatically adapts to light/dark theme
- **Spacing**: Consistent spacing using design tokens
- **Typography**: Design system typography scale
- **Icons**: AtomicIcon component from design system
- **Border Radius**: Consistent corner radius

## Best Practices

1. **Group Related Items**: Use `SettingsSection` to group related settings
2. **Clear Descriptions**: Provide helpful descriptions for settings
3. **Consistent Icons**: Use consistent icon styles across items
4. **Switch Usage**: Use switches for binary settings (on/off)
5. **Navigation**: Use chevron for navigation actions, switches for settings
6. **Accessibility**: Provide clear labels and descriptions
7. **Error Handling**: Always wrap screens in `SettingsErrorBoundary`
8. **Version Info**: Include footer with app version

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsItemCard, SettingsSection } from '@umituz/react-native-settings';

describe('SettingsItemCard', () => {
  it('renders title and icon', () => {
    const { getByText } = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
      />
    );

    expect(getByText('Settings')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={mockPress}
      />
    );

    fireEvent.press(getByTestId('settings-item-card'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('handles switch changes', () => {
    const mockChange = jest.fn();
    const { getByTestId } = render(
      <SettingsItemCard
        icon="notifications-outline"
        title="Notifications"
        showSwitch={true}
        switchValue={false}
        onSwitchChange={mockChange}
      />
    );

    const switch = getByTestId('switch');
    fireEvent(switch, 'onValueChange', true);
    expect(mockChange).toHaveBeenCalledWith(true);
  });
});
```

## Related

- **SettingsScreen**: Main settings screen component
- **Settings Sections**: Feature-specific section components
- **Design System**: Styling and theming foundation

## License

MIT
