# Settings Header

Header component for the settings screen with optional close button functionality.

## Features

- **Screen Title**: Displays localized "Settings" title
- **Close Button**: Optional close button for modal/presentation
- **Auto Navigation**: Automatically goes back if no custom handler
- **Design System**: Uses design system tokens for styling
- **Internationalization**: Supports i18n

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Header

```tsx
import { SettingsHeader } from '@umituz/react-native-settings';

function MySettingsScreen() {
  return (
    <>
      <SettingsHeader />
      {/* Rest of screen content */}
    </>
  );
}
```

### With Close Button

```tsx
function ModalSettingsScreen() {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <>
      <SettingsHeader
        showCloseButton={true}
        onClose={handleClose}
      />
      {/* Settings content */}
    </>
  );
}
```

## Props

### SettingsHeaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCloseButton` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | `undefined` | Custom close handler |

## Behavior

### Close Button

When `showCloseButton` is `true`:

- If `onClose` provided: Calls `onClose()`
- If no `onClose`: Calls `navigation.goBack()`

### Close Handler

```typescript
const handleClose = () => {
  if (onClose) {
    onClose();  // Use custom handler
  } else {
    navigation.goBack();  // Default navigation
  }
};
```

## Examples

### Modal Settings

```tsx
import { SettingsHeader } from '@umituz/react-native-settings';
import { Modal } from 'react-native';

function SettingsModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SettingsHeader
        showCloseButton={true}
        onClose={onClose}
      />
      <SettingsContent />
    </Modal>
  );
}
```

### Presentation Style

```tsx
import { SettingsHeader } from '@umituz/react-native-settings';

function PresentationSettings() {
  const navigation = useNavigation();

  return (
    <Stack.Screen
      name="Settings"
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    >
      {() => (
        <View>
          <SettingsHeader
            showCloseButton={true}
            onClose={() => navigation.goBack()}
          />
          <SettingsContent />
        </View>
      )}
    </Stack.Screen>
  );
}
```

### Custom Close Action

```tsx
function SettingsWithCustomClose() {
  const handleClose = () => {
    // Custom logic before closing
    saveDraftChanges();
    navigation.goBack();
  };

  return (
    <SettingsHeader
      showCloseButton={true}
      onClose={handleClose}
    />
  );
}
```

### Close with Confirmation

```tsx
function SettingsWithConfirmation() {
  const handleClose = () => {
    Alert.alert(
      'Discard Changes?',
      'You have unsaved changes',
      [
        { text: 'Keep Editing', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SettingsHeader
      showCloseButton={true}
      onClose={handleClose}
    />
  );
}
```

## Styling

### Layout

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: tokens.spacing.lg,  // 16px
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Pressable Style

The close button uses Pressable with pressed state:

```typescript
style={({ pressed }) => [
  styles.closeButton,
  {
    backgroundColor: pressed
      ? tokens.colors.surfaceVariant
      : tokens.colors.surface,
    borderRadius: tokens.borderRadius.full,
  },
]
```

## Internationalization

Uses translation key for title:

```typescript
t('settings.title')
```

## Design System Integration

- **Typography**: `tokens.typography.headingLarge` for title
- **Colors**: `tokens.colors.textPrimary` for close icon
- **Spacing**: `tokens.spacing.lg` for padding
- **Border Radius**: `tokens.borderRadius.full` for button
- **Icons**: `AtomicIcon` from design system

## Accessibility

### Hit Slop

Close button has increased hit area:

```typescript
hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
```

### Icon

Uses `close-outline` icon from Ionicons:

```typescript
<AtomicIcon name="close-outline" size="lg" color="textPrimary" />
```

## Best Practices

1. **Modal Screens**: Always use close button in modal presentation
2. **Custom Handler**: Provide custom close handler when needed
3. **Confirmation**: Ask for confirmation if there are unsaved changes
4. **Consistent Position**: Keep header at top of screen
5. **Padding**: Use design system spacing for consistency
6. **Accessibility**: Ensure close button is easily tappable

## Use Cases

### Modal Presentation

```tsx
<Stack.Screen
  name="Settings"
  options={{
    presentation: 'modal',
    headerShown: false,
  }}
>
  {() => (
    <View>
      <SettingsHeader showCloseButton={true} />
      <SettingsContent />
    </View>
  )}
</Stack.Screen>
```

### Full Screen with Close

```tsx
function FullScreenSettings() {
  return (
    <ScreenLayout
      header={<SettingsHeader showCloseButton={true} />}
    >
      <SettingsContent />
    </ScreenLayout>
  );
}
```

### No Close Button (Default)

```tsx
function RegularSettingsScreen() {
  return (
    <Stack.Screen name="Settings">
      {() => (
        <View>
          <SettingsHeader />
          <SettingsContent />
        </View>
      )}
    </Stack.Screen>
  );
}
```

## Related

- **SettingsScreen**: Main screen component
- **SettingsContent**: Content component
- **Design System**: Styling and theming

## License

MIT
