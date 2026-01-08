# Custom Settings List

Component for rendering custom, user-defined settings sections with automatic ordering and sorting.

## Features

- **Custom Sections**: Add app-specific settings sections
- **Automatic Sorting**: Sorts sections by order property
- **Flexible Content**: Support for items or custom content
- **Full Customization**: Complete control over styling and behavior

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { CustomSettingsList } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const customSections = [
    {
      id: 'integrations',
      title: 'INTEGRATIONS',
      order: 1,
      items: [
        {
          id: 'google',
          title: 'Google',
          subtitle: 'Connected',
          icon: 'logo-google',
          onPress: () => console.log('Google settings'),
        },
      ],
    },
  ];

  return <CustomSettingsList customSections={customSections} />;
}
```

## Props

### CustomSettingsListProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customSections` | `CustomSettingsSection[]` | `[]` | Array of custom sections |

### CustomSettingsSection

```typescript
interface CustomSettingsSection {
  id?: string;                    // Unique identifier
  title: string;                  // Section title
  order?: number;                 // Display order (lower = first)
  content?: ReactNode;            // Custom content (instead of items)
  items?: CustomSettingsItem[];   // Array of items
}
```

### CustomSettingsItem

```typescript
interface CustomSettingsItem {
  id?: string;              // Unique identifier
  title: string;            // Item title
  subtitle?: string;        // Item description
  icon: IconName;           // Icon name
  onPress?: () => void;     // Press handler
  rightIcon?: IconName;     // Custom right icon
  iconBgColor?: string;     // Icon background color
  iconColor?: string;       // Icon color
}
```

## Examples

### Simple Section

```tsx
const sections = [
  {
    title: 'PREFERENCES',
    items: [
      {
        id: 'theme',
        title: 'Theme',
        subtitle: 'Dark',
        icon: 'moon-outline',
        onPress: () => navigation.navigate('Theme'),
      },
    ],
  },
];

return <CustomSettingsList customSections={sections} />;
```

### Multiple Sections

```tsx
const sections = [
  {
    id: 'account',
    title: 'ACCOUNT',
    order: 1,
    items: [
      {
        id: 'profile',
        title: 'Profile',
        icon: 'person-outline',
        onPress: () => navigation.navigate('Profile'),
      },
      {
        id: 'security',
        title: 'Security',
        icon: 'shield-checkmark-outline',
        onPress: () => navigation.navigate('Security'),
      },
    ],
  },
  {
    id: 'integrations',
    title: 'INTEGRATIONS',
    order: 2,
    items: [
      {
        id: 'slack',
        title: 'Slack',
        subtitle: 'Connected',
        icon: 'logo-slack',
        onPress: () => manageSlack(),
      },
      {
        id: 'google',
        title: 'Google',
        subtitle: 'Not connected',
        icon: 'logo-google',
        onPress: () => connectGoogle(),
      },
    ],
  },
];

return <CustomSettingsList customSections={sections} />;
```

### With Custom Content

```tsx
const sections = [
  {
    id: 'custom',
    title: 'CUSTOM SECTION',
    content: (
      <View style={{ padding: 16 }}>
        <Text>Custom content here</Text>
        <Button title="Action" onPress={handleAction} />
      </View>
    ),
  },
];

return <CustomSettingsList customSections={sections} />;
```

### With Ordering

```tsx
const sections = [
  { title: 'SECOND', order: 2, items: [...] },
  { title: 'FIRST', order: 1, items: [...] },
  { title: 'THIRD', order: 3, items: [...] },
];

// Will render in order: FIRST, SECOND, THIRD
return <CustomSettingsList customSections={sections} />;
```

### Mixed Items and Content

```tsx
const sections = [
  {
    id: 'mixed',
    title: 'MIXED SECTION',
    order: 1,
    items: [
      {
        id: 'item1',
        title: 'Regular Item',
        icon: 'settings-outline',
        onPress: () => {},
      },
    ],
  },
  {
    id: 'custom-content',
    title: 'CUSTOM CONTENT',
    order: 2,
    content: (
      <View style={{ padding: 16 }}>
        <Text>This is custom content</Text>
      </View>
    ),
  },
];

return <CustomSettingsList customSections={sections} />;
```

## Advanced Examples

### With Toggle Switches

```tsx
const [integrations, setIntegrations] = useState({
  slack: false,
  google: true,
  dropbox: false,
});

const sections = [
  {
    title: 'INTEGRATIONS',
    items: [
      {
        id: 'slack',
        title: 'Slack Integration',
        subtitle: integrations.slack ? 'Enabled' : 'Disabled',
        icon: 'logo-slack',
        showSwitch: true,
        switchValue: integrations.slack,
        onSwitchChange: (value) => setIntegrations({ ...integrations, slack: value }),
      },
    ],
  },
];

return <CustomSettingsList customSections={sections} />;
```

### With Custom Styling

```tsx
const sections = [
  {
    title: 'PRO FEATURES',
    items: [
      {
        id: 'upgrade',
        title: 'Upgrade to Pro',
        subtitle: 'Unlock all features',
        icon: 'star',
        iconColor: '#FFD700',
        iconBgColor: 'rgba(255, 215, 0, 0.1)',
        onPress: () => navigation.navigate('Upgrade'),
      },
      {
        id: 'restore',
        title: 'Restore Purchase',
        subtitle: 'Already purchased?',
        icon: 'refresh',
        onPress: () => restorePurchase(),
      },
    ],
  },
];

return <CustomSettingsList customSections={sections} />;
```

### Dynamic Sections

```tsx
function DynamicSettingsList() {
  const [userIntegrations, setUserIntegrations] = useState([]);

  useEffect(() => {
    loadUserIntegrations();
  }, []);

  const sections = userIntegrations.map(integration => ({
    id: integration.id,
    title: integration.name.toUpperCase(),
    items: [
      {
        id: integration.id,
        title: integration.displayName,
        subtitle: integration.status,
        icon: integration.icon,
        onPress: () => manageIntegration(integration),
      },
    ],
  }));

  return <CustomSettingsList customSections={sections} />;
}
```

### Conditional Rendering

```tsx
function ConditionalCustomList() {
  const { user } = useAuth();

  const sections = [];

  if (user.isAdmin) {
    sections.push({
      title: 'ADMIN',
      items: [
        {
          id: 'users',
          title: 'Manage Users',
          icon: 'people-outline',
          onPress: () => navigation.navigate('AdminUsers'),
        },
      ],
    });
  }

  if (user.isPremium) {
    sections.push({
      title: 'PREMIUM',
      items: [
        {
          id: 'premium-support',
          title: 'Premium Support',
          icon: 'headset-outline',
          onPress: () => contactSupport(),
        },
      ],
    });
  }

  return <CustomSettingsList customSections={sections} />;
}
```

## Sorting Algorithm

Sections are sorted by the `order` property:

```typescript
const sortedSections = useMemo(() => {
  return Array.from(customSections)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}, [customSections]);
```

- Default order is `999` (appears last)
- Lower numbers appear first
- Equal order maintains array order

## Empty State

Returns `null` if no sections provided:

```tsx
// Renders nothing
<CustomSettingsList customSections={[]} />
```

## Best Practices

1. **Order Property**: Always set order for predictable rendering
2. **Unique IDs**: Provide unique IDs for all sections and items
3. **Consistent Icons**: Use appropriate icons for each item
4. **Clear Titles**: Use clear, concise titles
5. **Subtitles**: Provide helpful subtitles for additional context
6. **Navigation**: Always provide navigation handlers
7. **Conditional Items**: Use conditional rendering for feature-gated content
8. **Custom Content**: Use custom content for complex UI

## Related

- **SettingsSection**: Section wrapper component
- **SettingsItemCard**: Individual item component
- **SettingsContent**: Main content composer

## License

MIT
