# Testing Guide

Comprehensive testing strategy and guidelines for the `@umituz/react-native-settings` package covering unit tests, integration tests, and end-to-end testing approaches.

## Purpose

This document defines the testing philosophy, strategies, and best practices for ensuring code quality, reliability, and maintainability of the `@umituz/react-native-settings` package. It provides guidelines for testing at each architectural layer and establishes standards for test coverage, performance, and reliability.

## File Paths

**Base Directory**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/`

**Test Locations**:
- `/src/**/__tests__/` - Test files co-located with source code
- `/src/**/*.test.ts` - Unit test files
- `/src/**/*.test.tsx` - Component test files
- `/src/**/*.integration.test.ts` - Integration test files
- `/__tests__/` - Shared test utilities and fixtures

## Testing Philosophy

The settings package follows a comprehensive testing approach:

- **Unit Tests**: Test individual functions, hooks, and components in isolation
- **Integration Tests**: Test how multiple components work together
- **E2E Tests**: Test complete user flows across the application
- **Snapshot Tests**: Ensure UI consistency and prevent unintended changes
- **Performance Tests**: Monitor rendering performance and identify bottlenecks

### Testing Pyramid

```
        /\
       /  \
      / E2E \
     /------\
    /Integration\
   /------------\
  /   Unit Tests  \
 /----------------\
```

**Foundation**: Unit tests provide the base, being fast and numerous
**Middle**: Integration tests verify component interactions
**Top**: E2E tests validate critical user journeys (minimal in number)

## Test Configuration

### Jest Configuration

The project uses Jest as the testing framework with React Native preset. Configuration includes:

- **Preset**: React Native environment setup
- **Setup Files**: Custom test environment initialization
- **Transform Ignore Patterns**: Handle dependencies correctly
- **Test Match Patterns**: Locate test files automatically
- **Path Mapping**: Resolve module aliases correctly
- **Coverage Collection**: Track code coverage metrics

### Test Setup

Test setup includes:

- **Testing Library Extensions**: Custom matchers for React Native
- **Async Configuration**: Timeout settings for async operations
- **Mock Configuration**: Global mocks for external dependencies
- **Navigation Mocks**: React Navigation mock implementations
- **Storage Mocks**: AsyncStorage mock for data persistence

## Component Testing

### Testing Approach

Components are tested using React Native Testing Library with focus on:

- **User Interactions**: Test from user's perspective, not implementation details
- **Accessibility**: Verify accessibility attributes and labels
- **Props Validation**: Ensure correct prop handling and validation
- **Event Handling**: Verify callbacks and event handlers work correctly
- **Conditional Rendering**: Test different states and configurations

### Component Test Categories

**SettingsItemCard**: Reusable card component for settings items
- Rendering with various prop combinations
- Press interactions and callback execution
- Switch functionality and state changes
- Disabled state behavior
- Icon and subtitle display
- Snapshot verification

**SettingsSection**: Section wrapper component
- Title display and visibility
- Children rendering
- Conditional title display
- Styling and layout

**SettingsScreen**: Main settings screen
- Navigation integration
- Settings content composition
- Feature detection integration
- Loading and error states

## Hook Testing

### Testing Approach

Custom hooks are tested using `renderHook` from React Testing Library:

- **State Management**: Verify state changes and updates
- **Side Effects**: Test useEffect and other effect hooks
- **Return Values**: Validate hook return structure and values
- **Error Handling**: Test error states and error recovery
- **Performance**: Ensure hooks don't cause unnecessary re-renders

### Hook Test Categories

**useSettings**: Main settings management hook
- Loading initial settings
- Updating settings values
- Resetting to defaults
- Error handling
- Query invalidation
- Mutation behavior

**useFeatureDetection**: Feature availability detection
- Screen availability detection
- Configuration validation
- Navigation state checking
- Feature flag integration

## Service Testing

### Testing Approach

Services are tested in isolation with mocked dependencies:

- **Business Logic**: Verify core business rules and validations
- **Data Transformation**: Test data mapping and transformation
- **Error Handling**: Validate error scenarios and messages
- **Repository Integration**: Test interaction with repositories
- **Validation Logic**: Verify input validation and sanitization

### Service Test Categories

**SettingsService**: Core settings business logic
- Settings retrieval with defaults
- Settings updates and validation
- Settings reset functionality
- Invalid input handling
- Error propagation
- Business rule enforcement

## Integration Testing

### Testing Approach

Integration tests verify multiple components working together:

- **User Flows**: Test complete user interactions
- **Navigation**: Verify screen transitions and navigation
- **Data Flow**: Test data flow across components
- **State Management**: Verify global state updates
- **Error Recovery**: Test error handling across components

### Integration Test Categories

**Settings Screen Integration**
- Navigation to detail screens
- Settings updates and persistence
- Theme switching functionality
- Language selection and application
- Multi-step workflows

**Feature Integration**
- Feature detection with navigation
- Configuration-driven UI rendering
- Cross-feature interactions

## Performance Testing

### Testing Approach

Performance tests ensure components render efficiently:

- **Render Time**: Measure initial render performance
- **Re-render Behavior**: Verify memoization and optimization
- **Memory Usage**: Monitor memory consumption
- **Update Performance**: Test state update performance

### Performance Test Categories

**Component Performance**
- Initial render time measurements
- Unnecessary re-render detection
- Memo effectiveness verification
- Large list rendering performance

**Hook Performance**
- Hook execution time
- Dependency array optimization
- Effect cleanup verification
- Stale closure prevention

## Snapshot Testing

### Testing Approach

Snapshot tests track UI changes and prevent unintended modifications:

- **Component Snapshots**: Capture component render output
- **Configuration Variants**: Snapshot different prop combinations
- **Update Verification**: Review snapshot changes carefully
- **Selective Updates**: Update snapshots only for intended changes

### Snapshot Guidelines

- Review snapshot changes during code review
- Update snapshots only when changes are intentional
- Keep snapshots focused on meaningful UI structure
- Avoid snapshotting dynamic content (dates, IDs, etc.)

## Strategy

1. **Test-Driven Development**: Write tests before or alongside implementation, ensuring requirements are understood and code is testable from the start

2. **Pyramid Distribution**: Maintain a healthy testing pyramid with many unit tests, fewer integration tests, and minimal E2E tests for optimal feedback speed and maintenance cost

3. **User-Centric Testing**: Focus on testing user behavior and outcomes rather than implementation details, ensuring tests remain valid even when implementation changes

4. **Isolation and Independence**: Ensure tests are independent and can run in any order, using proper setup/teardown and avoiding shared state between tests

5. **Continuous Improvement**: Regularly review and update tests, refactor test code, and maintain high coverage while keeping tests fast and reliable

## Restrictions

### ❌ DO NOT

- Test implementation details instead of user behavior (e.g., checking internal state, method calls)
- Write fragile tests that break with minor refactoring
- Create tests that depend on execution order
- Use shared mutable state between tests
- Write tests that are slow or flaky
- Test third-party libraries or external services directly

### ❌ NEVER

- Commit commented-out test code or failing tests
- Mock or test the framework (React, Jest, React Native)
- Write tests without assertions or expectations
- Use arbitrary timeouts or waits instead of proper async handling
- Test multiple concerns in a single test case
- Skip testing error states and edge cases

### ❌ AVOID

- Over-mocking components, making tests brittle
- Testing trivial code (getters, simple pass-through functions)
- Creating complex test setups that are hard to understand
- Writing tests that are as complex as the code they test
- Relying on implementation-specific selectors or test IDs
- Testing absolute values that vary across environments

## Rules

### ✅ ALWAYS

- Write descriptive test names that explain what is being tested and why
- Use test helpers and custom matchers to reduce duplication
- Test both happy paths and error scenarios
- Follow the Arrange-Act-Assert pattern for clear test structure
- Clean up resources in afterEach or cleanup functions
- Use TypeScript for type-safe test code

### ✅ MUST

- Achieve and maintain minimum 80% code coverage
- Mock all external dependencies (APIs, storage, navigation)
- Test async operations properly with waitFor or act
- Verify accessibility attributes and labels
- Test error boundaries and error states
- Ensure tests run consistently across different environments

### ✅ SHOULD

- Group related tests with describe blocks
- Use beforeEach for common test setup
- Keep tests fast and focused
- Prioritize testing behavior over implementation
- Review and update tests when modifying code
- Use meaningful assertions with clear failure messages

## AI Agent Guidelines

### Writing New Tests

When creating new tests:

1. **Understand Requirements**: Clearly understand what functionality needs to be tested and why before writing tests
2. **Choose Right Level**: Decide whether to write unit, integration, or E2E tests based on what needs verification
3. **Follow Patterns**: Use existing test patterns and helpers in the codebase for consistency
4. **Test Behavior**: Focus on testing user-facing behavior and outcomes, not implementation details

### Modifying Existing Tests

When updating tests:

1. **Maintain Coverage**: Ensure test coverage doesn't decrease when modifying code
2. **Update Snapshots**: Review snapshot changes carefully and update only when intentional
3. **Add Missing Cases**: Look for uncovered edge cases and error scenarios
4. **Refactor Test Code**: Improve test code quality and maintainability alongside production code

### Debugging Test Failures

When tests fail:

1. **Understand Failure**: Read the error message and understand why the test failed
2. **Isolate Issue**: Run the failing test in isolation to confirm the failure
3. **Check Environment**: Verify test environment and mocks are properly configured
4. **Fix Root Cause**: Address the root cause, not just the test symptom

### Test Review Checklist

Review should verify:

- Tests cover both happy paths and error cases
- Test names clearly describe what is being tested
- Tests are independent and can run in any order
- No implementation details are being tested
- Async operations are handled properly
- Edge cases and boundaries are covered
- Tests are readable and maintainable
- Coverage metrics meet minimum requirements

## Running Tests

### Test Execution

- Run all tests: Execute complete test suite
- Watch mode: Run tests in watch mode for development
- Coverage: Generate coverage reports
- Specific tests: Run individual test files or patterns
- Filter tests: Run tests matching specific patterns

### Test Commands

All test commands should be executed from the project root directory with proper npm/yarn scripts.

## Related Documentation

- **ARCHITECTURE.md**: Understanding the architecture helps write better tests
- **Jest Documentation**: Testing framework reference
- **React Native Testing Library**: Component testing utilities
- **TanStack Query Documentation**: Testing hooks and queries

## License

MIT
