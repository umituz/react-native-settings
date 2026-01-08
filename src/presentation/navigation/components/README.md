# Navigation Components

Screen wrapper components for integrating settings screens into React Navigation with proper props passing and configuration.

## Components

### SettingsScreenWrapper

Wrapper component for the main Settings screen that injects configuration, navigation, and user profile props.

```tsx
import { SettingsScreenWrapper } from '@umituz/react-native-settings';

<Stack.Screen
  name="Settings"
  component={SettingsScreenWrapper}
  options={{ headerShown: false }}
/>
```

#### Props

Automatically receives and injects:
- `config`: Settings configuration from navigation params
- `appInfo`: Application information object
- `userProfile`: User profile data
- `customSections`: Custom settings sections
- `devSettings`: Development settings configuration

### LegalScreenWrapper

Wrapper component for legal screens (Privacy Policy, Terms of Service, etc.) with content and styling configuration.

```tsx
import { LegalScreenWrapper } from '@umituz/react-native-settings';

<Stack.Screen
  name="PrivacyPolicy"
  component={LegalScreenWrapper}
/>
```

#### Features

- Dynamic document type from route params
- Content injection from navigation
- Custom styling support
- Title and header configuration

### AboutScreenWrapper

Wrapper component for the About screen with app information and developer details.

```tsx
import { AboutScreenWrapper } from '@umituz/react-native-settings';

<Stack.Screen
  name="About"
  component={AboutScreenWrapper}
/>
```

#### Features

- App information injection
- Developer details display
- Contact information handling
- Version and build number display

## Screen Registration

### Complete Navigation Setup

```tsx
import { SettingsStackNavigator } from '@umituz/react-native-settings';

function App() {
  const appInfo = {
    name: 'My App',
    version: '1.0.0',
    buildNumber: '100',
    developer: 'My Company',
    websiteUrl: 'https://example.com',
  };

  return (
    <NavigationContainer>
      <SettingsStackNavigator appInfo={appInfo} />
    </NavigationContainer>
  );
}
```

### Manual Screen Registration

```tsx
import { SettingsScreenWrapper, LegalScreenWrapper, AboutScreenWrapper } from '@umituz/react-native-settings';

<Stack.Navigator>
  <Stack.Screen
    name="Settings"
    component={SettingsScreenWrapper}
    options={{
      headerShown: false,
      presentation: 'card',
    }}
  />
  <Stack.Screen
    name="Appearance"
    component={AppearanceScreen}
    options={{ title: 'Appearance' }}
  />
  <Stack.Screen
    name="PrivacyPolicy"
    component={LegalScreenWrapper}
    options={{ title: 'Privacy Policy' }}
  />
  <Stack.Screen
    name="TermsOfService"
    component={LegalScreenWrapper}
    options={{ title: 'Terms of Service' }}
  />
  <Stack.Screen
    name="About"
    component={AboutScreenWrapper}
    options={{ title: 'About' }}
  />
</Stack.Navigator>
```

## Props Injection

### SettingsScreenWrapper

```typescript
interface SettingsScreenWrapperProps {
  route: {
    params: {
      config?: SettingsConfig;
      appInfo?: AppInfo;
      userProfile?: UserProfile;
      customSections?: CustomSettingsSection[];
      devSettings?: DevSettingsProps;
      showCloseButton?: boolean;
    };
  };
  navigation: any;
}
```

### LegalScreenWrapper

```typescript
interface LegalScreenWrapperProps {
  route: {
    params: {
      documentType: 'privacy-policy' | 'terms-of-service' | 'eula';
      content?: string;
      title?: string;
      styles?: LegalContentStyles;
    };
  };
}
```

### AboutScreenWrapper

```typescript
interface AboutScreenWrapperProps {
  route: {
    params: {
      appInfo?: AppInfo;
      config?: AboutConfig;
    };
  };
}
```

## Usage Examples

### With Custom Config

```tsx
function SettingsStack() {
  const config = {
    appearance: true,
    language: true,
    notifications: 'auto',
  };

  const userProfile = {
    displayName: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return (
    <Stack.Screen
      name="Settings"
      component={SettingsScreenWrapper}
      initialParams={{ config, userProfile }}
    />
  );
}
```

### With Custom Styling

```tsx
function PrivacyStack() {
  const customStyles = {
    container: { backgroundColor: '#f5f5f5' },
    content: { fontSize: 16, lineHeight: 24 },
    header: { color: '#333' },
  };

  return (
    <Stack.Screen
      name="PrivacyPolicy"
      component={LegalScreenWrapper}
      initialParams={{
        documentType: 'privacy-policy',
        styles: customStyles,
      }}
    />
  );
}
```

### With App Information

```tsx
function AboutStack() {
  const appInfo = {
    name: 'My Application',
    version: '2.0.0',
    buildNumber: '200',
    developer: 'My Company LLC',
    contactEmail: 'support@example.com',
    websiteUrl: 'https://example.com',
    websiteDisplay: 'example.com',
    moreAppsUrl: 'https://example.com/apps',
  };

  return (
    <Stack.Screen
      name="About"
      component={AboutScreenWrapper}
      initialParams={{ appInfo }}
    />
  );
}
```

## Navigation Patterns

### Modal Presentation

```tsx
<Stack.Screen
  name="Settings"
  component={SettingsScreenWrapper}
  options={{
    presentation: 'modal',
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },
  }}
  initialParams={{ showCloseButton: true }}
/>
```

### Custom Header

```tsx
<Stack.Screen
  name="Appearance"
  component={AppearanceScreen}
  options={{
    headerTitle: 'Appearance',
    headerStyle: { backgroundColor: '#fff' },
    headerTintColor: '#000',
    headerTitleStyle: { fontWeight: 'bold' },
  }}
/>
```

### Nested Navigation

```tsx
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen
    name="Settings"
    options={{ headerShown: false }}
  >
    {() => (
      <SettingsStack>
        <Stack.Screen
          name="Settings"
          component={SettingsScreenWrapper}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Appearance"
          component={AppearanceScreen}
        />
      </SettingsStack>
    )}
  </Tab.Screen>
</Tab.Navigator>
```

## Best Practices

1. **Use Wrappers**: Always use screen wrappers for proper props injection
2. **Type Safety**: Use TypeScript for navigation params
3. **Initial Params**: Pass configuration via initialParams
4. **Header Options**: Configure headers appropriately per screen
5. **Presentation**: Use modal presentation for settings on iOS
6. **Consistency**: Maintain consistent navigation patterns

## Related

- **SettingsStackNavigator**: Main navigator component
- **Navigation Hooks**: Navigation utility hooks
- **Screen Components**: Individual screen implementations

## License

MIT
