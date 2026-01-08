# Architecture Overview

Comprehensive architecture documentation for the `@umituz/react-native-settings` package following Domain-Driven Design (DDD) principles.

## Purpose

This document defines the architectural principles, structural organization, and design patterns governing the `@umituz/react-native-settings` package. It serves as the authoritative reference for understanding the system's layered architecture, domain organization, and interaction patterns between components.

## File Paths

**Base Directory**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/`

**Key Structure**:
- `/src/domains/` - Domain-specific modules
- `/src/application/` - Application layer interfaces
- `/src/infrastructure/` - Infrastructure implementations
- `/src/presentation/` - UI components and screens

## Architecture Layers

```
┌─────────────────────────────────────────┐
│      Presentation Layer                 │
│  (UI Components, Screens, Hooks)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Application Layer                 │
│   (Business Logic, Interfaces)          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Infrastructure Layer               │
│  (Data Persistence, Services)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Domain Layer                    │
│   (Business Entities, Rules)            │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

**Presentation Layer**: UI rendering and user interaction handling
**Application Layer**: Business logic orchestration and interface definitions
**Infrastructure Layer**: Data persistence and external service implementations
**Domain Layer**: Business entities, rules, and domain-specific logic

## Directory Structure

```
src/
├── domains/                    # Business domains
│   ├── about/
│   ├── appearance/
│   ├── legal/
│   ├── disclaimer/
│   ├── feedback/
│   ├── faqs/
│   ├── rating/
│   ├── video-tutorials/
│   ├── cloud-sync/
│   └── dev/
├── application/                # Application layer
│   └── ports/                  # Layer interfaces
├── infrastructure/             # Infrastructure layer
│   ├── repositories/           # Data repositories
│   └── services/               # Business services
└── presentation/              # Presentation layer
    ├── components/             # Shared components
    ├── screens/                # Screens
    ├── hooks/                  # Presentation hooks
    └── navigation/             # Navigation
```

## Domain Organization

Each domain follows a consistent self-contained structure:

```
domain/
├── domain/            # Business entities
├── application/       # Domain-specific application logic
├── infrastructure/    # Domain-specific infrastructure
├── presentation/      # Domain-specific UI
├── types/            # Domain types
└── utils/            # Domain utilities
```

### Domain Examples

**About Domain**: Application information, version details, developer contact
**Appearance Domain**: Theme settings, language preferences, display options
**Legal Domain**: Terms of service, privacy policy, legal notices
**Disclaimer Domain**: Usage disclaimers, liability statements
**Feedback Domain**: User feedback collection, issue reporting
**FAQs Domain**: Frequently asked questions and answers
**Rating Domain**: App store ratings, review prompts
**Video Tutorials Domain**: Tutorial videos, help content
**Cloud Sync Domain**: Data synchronization, backup/restore
**Dev Domain**: Development tools, debugging features

## Data Flow Patterns

### Reading Settings

```
User → UI Component → Hook → Query → Service → Repository → Storage
```

### Updating Settings

```
User → UI → Mutation Hook → Service → Repository → Storage
```

## Design Patterns

### Repository Pattern
Separates data access logic from business logic through interface-based abstractions

### Dependency Injection
Inject dependencies through constructors for testability and flexibility

### Factory Pattern
Create objects with factory functions for consistent object creation

### Observer Pattern
React hooks and TanStack Query use observer pattern for reactive state management

## Strategy

1. **Domain-Driven Organization**: Structure the codebase around business domains rather than technical layers, ensuring each domain is self-contained with its own entities, logic, and presentation

2. **Layered Architecture**: Maintain clear separation between presentation, application, infrastructure, and domain layers with unidirectional dependencies flowing from outer to inner layers

3. **Interface-Based Design**: Define clear interfaces between layers and components to enable loose coupling, testability, and independent evolution of components

4. **Dependency Inversion**: Depend on abstractions rather than concrete implementations, allowing for easy substitution of implementations (e.g., different storage backends)

5. **Single Responsibility Principle**: Each component, service, and module should have one reason to change, ensuring focused, maintainable code

## Restrictions

### ❌ DO NOT

- Skip architectural layers when communicating between components (e.g., Presentation must not directly access Storage)
- Create circular dependencies between layers or domains
- Mix concerns within a single layer (e.g., business logic in presentation components)
- Access external services directly from domain or presentation layers
- Duplicate business logic across multiple domains or components

### ❌ NEVER

- Allow presentation components to directly access infrastructure implementations
- Create dependencies from inner layers (domain/infrastructure) to outer layers (presentation)
- Implement business rules in UI components or hooks
- Share mutable state between different domains without proper encapsulation
- Bypass repository interfaces when accessing data

### ❌ AVOID

- Creating tightly coupled dependencies between different domains
- Implementing complex business logic in presentation layer hooks
- Using global state or singletons for sharing data between layers
- Making infrastructure details (e.g., storage implementation) visible to other layers
- Creating overly complex abstractions that don't serve a clear purpose

## Rules

### ✅ ALWAYS

- Use interfaces to define contracts between layers and components
- Follow dependency injection patterns for passing dependencies
- Implement proper error handling at each layer with consistent error types
- Maintain type safety with TypeScript throughout the architecture
- Write tests that verify behavior at each architectural layer

### ✅ MUST

- Ensure all data access goes through repository interfaces
- Keep domain entities and business rules independent of infrastructure
- Implement proper separation of concerns in all components
- Use async/await for all asynchronous operations
- Handle edge cases and errors gracefully at each layer

### ✅ SHOULD

- Prefer composition over inheritance when sharing behavior
- Keep interfaces focused and cohesive (small, related sets of methods)
- Use factory functions for creating complex objects with dependencies
- Implement proper logging at each layer for debugging and monitoring
- Maintain consistency in naming conventions across all layers

## AI Agent Guidelines

### Architecture Modifications

When modifying the architecture:

1. **Layer Adherence**: Always respect the layered architecture and maintain unidirectional dependencies from outer to inner layers
2. **Domain Boundaries**: Keep domains self-contained and minimize inter-domain dependencies
3. **Interface Stability**: When changing interfaces, maintain backward compatibility or provide migration paths
4. **Incremental Changes**: Make architectural changes incrementally, ensuring tests pass at each step

### Adding New Features

When adding new features:

1. **Domain Identification**: Determine which domain the feature belongs to, or create a new domain if appropriate
2. **Layer Placement**: Place each piece of functionality in the appropriate layer following the architecture patterns
3. **Interface Design**: Design clear interfaces before implementing functionality
4. **Dependency Management**: Use dependency injection to pass dependencies and enable testing

### Refactoring Guidelines

When refactoring existing code:

1. **Maintain Contracts**: Keep existing interfaces stable; internal refactoring should not break external contracts
2. **Test Coverage**: Ensure comprehensive test coverage before and after refactoring
3. **Gradual Migration**: Refactor incrementally, maintaining functionality at each step
4. **Documentation Updates**: Update architecture documentation to reflect significant structural changes

### Code Review Checklist

Review should verify:

- Layer separation is maintained
- Dependencies flow in correct direction (outer → inner)
- Interfaces are well-defined and cohesive
- Domain logic is properly encapsulated
- Error handling is consistent across layers
- Tests cover all architectural layers
- No circular dependencies exist
- Type safety is maintained throughout

## Related Documentation

- **TESTING.md**: Comprehensive testing strategies for each architectural layer
- **Domain READMEs**: Individual domain-specific documentation
- **Component Documentation**: UI component usage and patterns

## License

MIT
