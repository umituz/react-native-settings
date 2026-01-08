# SettingsSection

Container component for grouping related settings items with section headers and consistent styling.

## Features

- **Grouping**: Groups related settings together
- **Headers**: Optional section titles with styling
- **Spacing**: Consistent spacing between sections
- **Customizable**: Custom styles and headers
- **Flexible**: Supports any content as children

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Section

```tsx
import { SettingsSection } from '@umituz/react-native-settings';

function GeneralSettings() {
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
        switchValue={enabled}
        onSwitchChange={setEnabled}
      />
    </SettingsSection>
  );
}
```

### Without Title

```tsx
function UntitledSection() {
  return (
    <SettingsSection>
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={() => {}}
      />
    </SettingsSection>
  );
}
```

### With Custom Style

```tsx
function StyledSection() {
  return (
    <SettingsSection
      title="APPEARANCE"
      style={{ backgroundColor: '#f5f5f5' }}
      titleStyle={{ color: '#2196F3' }}
    >
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

## Props

### SettingsSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Section title |
| `children` | `ReactNode` | **Required** | Section content |
| `style` | `ViewStyle` | `undefined` | Custom container style |
| `titleStyle` | `TextStyle` | `undefined` | Custom title style |
| `showTitle` | `boolean` | `true` | Show/hide title |
| `containerStyle` | `ViewStyle` | `undefined` | Content container style |
| `testID` | `string` | `undefined` | Test identifier |

## Component Structure

```
SettingsSection
├── Section Header (if title provided)
│   └── Title Text
└── Content Container
    └── Children (SettingsItemCard components)
```

## Examples

### Multiple Sections

```tsx
function SettingsScreen() {
  return (
    <ScrollView>
      <SettingsSection title="GENERAL">
        <SettingsItemCard icon="person-outline" title="Profile" onPress={() => {}} />
        <SettingsItemCard icon="notifications-outline" title="Notifications" onPress={() => {}} />
      </SettingsSection>

      <SettingsSection title="APPEARANCE">
        <SettingsItemCard icon="moon-outline" title="Dark Mode" onPress={() => {}} />
        <SettingsItemCard icon="color-palette-outline" title="Theme" onPress={() => {}} />
      </SettingsSection>

      <SettingsSection title="PRIVACY">
        <SettingsItemCard icon="shield-outline" title="Privacy" onPress={() => {}} />
        <SettingsItemCard icon="lock-closed-outline" title="Security" onPress={() => {}} />
      </SettingsSection>
    </ScrollView>
  );
}
```

### With Header Customization

```tsx
function CustomHeaderSection() {
  return (
    <SettingsSection
      title="PREFERENCES"
      titleStyle={{
        fontSize: 12,
        fontWeight: '700',
        color: '#2196F3',
        letterSpacing: 1,
      }}
    >
      <SettingsItemCard
        icon="globe-outline"
        title="Language"
        subtitle="English"
        onPress={() => {}}
      />
    </SettingsSection>
  );
}
```

### With Custom Spacing

```tsx
function SpacedSection() {
  return (
    <SettingsSection
      title="SETTINGS"
      style={{ marginBottom: 20 }}
      containerStyle={{ gap: 10 }}
    >
      <SettingsItemCard icon="cog-outline" title="Settings" onPress={() => {}} />
      <SettingsItemCard icon="apps-outline" title="Apps" onPress={() => {}} />
    </SettingsSection>
  );
}
```

### Nested Content

```tsx
function NestedContentSection() {
  return (
    <SettingsSection title="ADVANCED">
      <View>
        <Text style={styles.heading}>Display Options</Text>
        <SettingsItemCard
          icon="eye-outline"
          title="Show Preview"
          showSwitch={true}
          switchValue={showPreview}
          onSwitchChange={setShowPreview}
        />
      </View>

      <View>
        <Text style={styles.heading}>Storage</Text>
        <SettingsItemCard
          icon="trash-outline"
          title="Clear Cache"
          onPress={() => {}}
        />
      </View>
    </SettingsSection>
  );
}
```

### Conditional Items

```tsx
function ConditionalSection() {
  const isPro = useIsProUser();

  return (
    <SettingsSection title="PREMIUM">
      <SettingsItemCard
        icon="star-outline"
        title="Upgrade to Pro"
        subtitle="Get all premium features"
        onPress={() => {}}
      />

      {isPro && (
        <SettingsItemCard
          icon="diamond-outline"
          title="Pro Features"
          subtitle="Manage your subscription"
          onPress={() => {}}
        />
      )}

      {isPro && (
        <SettingsItemCard
          icon="card-outline"
          title="Billing"
          onPress={() => {}}
        />
      )}
    </SettingsSection>
  );
}
```

## Styling

### Default Styles

```typescript
const styles = StyleSheet.create({
  container: {
    marginTop: tokens.spacing.lg,
  },
  title: {
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: '700',
    color: tokens.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: tokens.spacing.xl,
    marginBottom: tokens.spacing.sm,
  },
  content: {
    // No additional styling by default
  },
});
```

### Custom Section Styles

```tsx
<SettingsSection
  title="CUSTOM"
  style={{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 15,
  }}
  titleStyle={{
    color: '#FF5722',
    fontSize: 14,
    fontWeight: 'bold',
  }}
>
  {/* Content */}
</SettingsSection>
```

### Section Variants

#### Compact Section

```tsx
<SettingsSection
  title="QUICK SETTINGS"
  style={{ marginTop: tokens.spacing.sm }}
>
  {/* Items */}
</SettingsSection>
```

#### Spaced Section

```tsx
<SettingsSection
  title="SETTINGS"
  style={{ marginTop: tokens.spacing.xl }}
>
  {/* Items */}
</SettingsSection>
```

#### Full Width Section

```tsx
<SettingsSection
  title="FULL WIDTH"
  style={{ marginHorizontal: 0 }}
  titleStyle={{ marginLeft: tokens.spacing.lg }}
>
  {/* Items */}
</SettingsSection>
```

## Layout Integration

### In ScrollView

```tsx
function SettingsScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <SettingsSection title="GENERAL">
        <SettingsItemCard icon="person-outline" title="Profile" onPress={() => {}} />
        <SettingsItemCard icon="notifications-outline" title="Notifications" onPress={() => {}} />
      </SettingsSection>

      <SettingsSection title="APPEARANCE">
        <SettingsItemCard icon="moon-outline" title="Dark Mode" onPress={() => {}} />
      </SettingsSection>
    </ScrollView>
  );
}
```

### In FlatList

```tsx
function SettingsScreen() {
  const sections = [
    {
      title: 'GENERAL',
      data: [
        { id: '1', title: 'Profile', icon: 'person-outline' },
        { id: '2', title: 'Notifications', icon: 'notifications-outline' },
      ],
    },
    {
      title: 'APPEARANCE',
      data: [
        { id: '3', title: 'Dark Mode', icon: 'moon-outline' },
      ],
    },
  ];

  const renderSectionHeader = ({ section }) => (
    <SettingsSection title={section.title}>
      {section.data.map((item) => (
        <SettingsItemCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          onPress={() => {}}
        />
      ))}
    </SettingsSection>
  );

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
    />
  );
}
```

## Best Practices

1. **Logical Grouping**: Group related settings together
2. **Clear Titles**: Use descriptive, concise section titles
3. **Consistent Spacing**: Maintain consistent spacing between sections
4. **Order**: Order sections by importance or frequency of use
5. **Limit Items**: Keep sections focused (3-6 items max)
6. **Accessibility**: Ensure sections are accessible
7. **Styling**: Use design system tokens for consistency

## Section Title Guidelines

### Good Titles

- ✅ "GENERAL" - Clear and concise
- ✅ "APPEARANCE" - Descriptive
- ✅ "NOTIFICATIONS" - Specific
- ✅ "PRIVACY & SECURITY" - Combined topics

### Avoid

- ❌ "Settings" - Too generic
- ❌ "Stuff" - Not descriptive
- ❌ "Misc" - Vague
- ❌ "Other" - Unclear

## Related

- **SettingsItemCard**: Individual item component
- **SettingsContent**: Content composer
- **SettingsScreen**: Main screen component

## License

MIT
