# Navigation Utilities

## Purpose

Utility functions and helpers for managing navigation in the settings system, including screen options, params handling, and navigation helpers.

## File Paths

- **Navigation Utils**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/utils/navigationHelpers.ts`
- **Screen Options**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/utils/screenOptions.ts`

## Strategy

1. **Screen Detection**: Checks if screens exist in navigation state
2. **Route Mapping**: Maps features to default route names
3. **Safe Navigation**: Provides safe navigation with error handling
4. **Param Validation**: Validates and sanitizes navigation params
5. **State Helpers**: Utilities for navigation state inspection

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use hardcoded route names (use getDefaultRoute)
- ❌ DO NOT bypass screen availability checks
- ❌ DO NOT navigate without validating params

### NEVER
- ❌ NEVER use navigation.navigate() without checking screen availability
- ❌ NEVER pass invalid or unsafe params to navigation
- ❌ NEVER assume navigation state is valid

### AVOID
- ❌ AVOID complex navigation state parsing (use provided helpers)
- ❌ AVOID navigation without error handling
- ❌ AVOID manual route name construction

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use safeNavigate for error-prone navigation
- ✅ ALWAYS check screen availability before navigation
- ✅ MUST validate params before navigation
- ✅ MUST handle navigation errors gracefully

### MUST
- ✅ MUST use getDefaultRoute for default route names
- ✅ MUST use hasNavigationScreen for availability checks
- ✅ MUST provide fallback routes for custom navigation

### SHOULD
- ✅ SHOULD use navigateWithFallback for custom routes
- ✅ SHOULD track navigation events for analytics
- ✅ SHOULD validate all navigation params

## AI Agent Guidelines

1. **File Reference**: When modifying navigation utilities, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/utils/`
2. **Screen Detection**: Always use hasNavigationScreen before navigating to dynamic screens
3. **Route Mapping**: Use getDefaultRoute for default route names, don't hardcode
4. **Safe Navigation**: Use safeNavigate for all navigation with error handling
5. **Param Validation**: Always validate params before navigation

## Utility Reference

### getDefaultRoute

**Purpose**: Gets default route name for a feature

**Parameters**:
- `feature`: Feature name (keyof DefaultRoutes)

**Returns**: Default route name string

**Example**: `getDefaultRoute('appearance')` returns `'Appearance'`

**Usage**: Use when you need default route for a feature

### hasNavigationScreen

**Purpose**: Checks if screen exists in navigation state

**Parameters**:
- `navigation`: React Navigation object
- `screenName`: Screen name to check

**Returns**: Boolean indicating screen availability

**Example**: `hasNavigationScreen(navigation, 'Appearance')`

**Usage**: Always check before navigating to dynamic screens

### safeNavigate

**Purpose**: Safely navigates with error handling

**Parameters**:
- `navigation`: React Navigation object
- `routeName`: Target route name
- `params?`: Navigation parameters

**Returns**: Boolean success indicator

**Example**: `safeNavigate(navigation, 'Appearance', config)`

**Usage**: Use for all navigation that might fail

### navigateWithFallback

**Purpose**: Navigates with fallback route if primary doesn't exist

**Parameters**:
- `navigation`: React Navigation object
- `primaryRoute`: Try this route first
- `fallbackRoute`: Use this if primary doesn't exist
- `params?`: Navigation parameters

**Returns**: void

**Example**: `navigateWithFallback(navigation, 'CustomAppearance', 'Appearance', config)`

**Usage**: Use when supporting custom routes with defaults

### getActiveRouteName

**Purpose**: Gets currently active route name

**Parameters**:
- `navigation`: React Navigation object

**Returns**: Current route name string

**Usage**: Use for analytics or tracking

### validateParams

**Purpose**: Validates navigation params for a screen

**Parameters**:
- `screen`: Screen name
- `params`: Params object to validate

**Returns**: Boolean validity indicator

**Usage**: Always validate before navigation

### sanitizeParams

**Purpose**: Removes invalid params from navigation params

**Parameters**:
- `screen`: Screen name
- `params`: Params object to sanitize

**Returns**: Sanitized params object

**Usage**: Use to clean params before navigation

## Related Components

- **Navigation Hooks**: Custom navigation hooks
- **Navigation Components**: Screen wrappers
- **React Navigation**: Official navigation library
