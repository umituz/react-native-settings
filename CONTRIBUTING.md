# Contributing to @umituz/react-native-settings

Thank you for your interest in contributing to this package! This document provides guidelines for contributing.

## Purpose

This document guides contributors on how to effectively participate in the development of `@umituz/react-native-settings`, ensuring code quality, consistency, and maintainability.

## How to Contribute

### Reporting Issues

Before creating issues:
- Check existing issues for duplicates
- Use clear, descriptive titles
- Provide reproduction steps
- Include environment details (React Native version, platform, etc.)
- Add screenshots for UI issues

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our guidelines
4. Write tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Workflow

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run type checking: `npm run typecheck`
4. Run linting: `npm run lint`

### Code Style

Follow the existing code style:
- Use TypeScript strict mode
- Follow naming conventions
- Add JSDoc comments for public APIs
- Use meaningful variable names
- Keep functions focused and small

### Testing

- Write unit tests for new features
- Maintain test coverage above 80%
- Test error conditions
- Include accessibility tests
- Update documentation for changes

## Project Structure

```
src/
├── domains/              # Feature domains
├── presentation/         # UI layer
├── application/          # Interfaces
└── infrastructure/       # Data layer
```

Follow Domain-Driven Design principles when adding features.

## Documentation

All documentation must follow the new format:
- No code examples
- Use file paths instead
- Include Purpose, File Paths, Strategy sections
- Add Restrictions with ❌ markers
- Add Rules with ✅ markers
- Include AI Agent Guidelines

See `DOCUMENTATION_TEMPLATE.md` for the template.

## Commit Messages

Use clear, descriptive commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

Example: `feat(appearance): add custom color palette support`

## Code Review Process

1. All PRs require review
2. Address review feedback
3. Ensure CI checks pass
4. Update documentation as needed
5. Squash commits if necessary

## Questions?

Feel free to open an issue for questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
