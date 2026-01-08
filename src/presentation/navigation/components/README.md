# Navigation Components

## Purpose

Screen wrapper components for integrating settings screens into React Navigation with proper props passing and configuration.

## File Paths

- **Settings Wrapper**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/components/SettingsScreenWrapper.tsx`
- **Legal Wrapper**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/components/LegalScreenWrapper.tsx`
- **About Wrapper**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/components/AboutScreenWrapper.tsx`

## Strategy

1. **Props Injection**: Automatically injects configuration and navigation props into screens
2. **Configuration Management**: Handles all screen configuration centrally
3. **Type Safety**: Provides TypeScript types for all wrapper props
4. **Consistency**: Ensures consistent props passing across all screens
5. **Flexibility**: Supports custom configuration via route params

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use screen components directly without wrappers
- ❌ DO NOT manually pass props to screen components
- ❌ DO NOT create custom screen wrappers without understanding the pattern

### NEVER
- ❌ NEVER bypass wrappers for "simple" screens
- ❌ NEVER hardcode configuration in screen components
- ❌ NEVER use wrappers outside of NavigationContext

### AVOID
- ❌ AVOID creating wrapper chains (keep it flat)
- ❌ AVOID mixing wrapper patterns
- ❌ AVOID complex prop drilling (wrappers handle this)

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use screen wrappers for all settings screens
- ✅ ALWAYS pass configuration via initialParams or navigator props
- ✅ MUST use TypeScript types for wrapper props
- ✅ MUST keep wrappers focused on props injection only

### MUST
- ✅ MUST extract configuration from route.params or navigator props
- ✅ MUST pass all required props to wrapped screen
- ✅ MUST handle missing configuration gracefully

### SHOULD
- ✅ SHOULD keep wrapper logic minimal (props injection only)
- ✅ SHOULD use consistent naming pattern for wrappers
- ✅ SHOULD test wrappers with various configurations

## AI Agent Guidelines

1. **File Reference**: When modifying wrappers, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/components/`
2. **Wrapper Purpose**: Wrappers exist solely to inject props, not to add functionality
3. **Config Flow**: Configuration flows from navigator props → route.params → screen props
4. **Type Safety**: Always use proper TypeScript types for route params
5. **Minimal Logic**: Keep wrappers simple, avoid complex business logic

## Component Reference

### SettingsScreenWrapper

**Purpose**: Wraps main settings screen with configuration and props

**Injected Props**:
- `config`: Settings configuration
- `appInfo`: Application information
- `userProfile`: User profile data
- `customSections`: Custom settings sections
- `devSettings`: Development settings configuration

**Usage**: Use in Stack.Screen component

### LegalScreenWrapper

**Purpose**: Wraps legal screens with content and styling configuration

**Injected Props**:
- `documentType`: Type of legal document
- `content`: Document content
- `title`: Document title
- `styles`: Custom styling

**Usage**: Use for Privacy Policy, Terms of Service, EULA screens

### AboutScreenWrapper

**Purpose**: Wraps about screen with app information

**Injected Props**:
- `appInfo`: Application information object
- `config`: About screen configuration

**Usage**: Use for About screen

## Related Components

- **SettingsStackNavigator**: Main navigator that uses these wrappers
- **Navigation Hooks**: Navigation utility hooks
- **Screen Components**: Individual screen implementations
