# Security Policy

## Supported Versions

Currently supported versions of `@umituz/react-native-settings`:

| Version | Supported          |
| ------- | ------------------- |
| 4.20.x  | :white_check_mark:  |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to umit@umituz.com.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

## Vulnerability Handling Process

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Investigation**: We will investigate the vulnerability and determine severity
3. **Fix Development**: We will develop a fix
4. **Release**: We will release a new version with the fix
5. **Disclosure**: We will publicly disclose the vulnerability after fix is released

## Security Best Practices

### For Users

- Keep dependencies updated
- Review changes in version updates
- Report security concerns promptly
- Use secure authentication methods
- Validate user inputs
- Implement proper error handling

### For Developers

- Follow secure coding practices
- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication
- Validate all inputs
- Handle errors safely
- Keep dependencies updated

## Common Security Considerations

### Data Storage

- User settings are stored locally on device
- No sensitive data is transmitted without encryption
- AsyncStorage should be encrypted for sensitive data

### Authentication

- This package does not handle authentication
- Use companion packages like `@umituz/react-native-auth`
- Implement proper session management

### Network Communication

- All network operations should use HTTPS
- Validate server certificates
- Implement proper error handling
- Handle network failures gracefully

## Dependency Security

We regularly update dependencies to address security vulnerabilities. Please:

- Keep your package.json updated
- Run `npm audit` regularly
- Review security advisories
- Update to latest versions

## Security Audits

Periodic security audits may be conducted. If you're interested in sponsoring a security audit, please contact us.

## Policy

This security policy outlines how we handle security vulnerabilities:
- We take all reports seriously
- We work to resolve issues quickly
- We maintain confidentiality during investigation
- We disclose vulnerabilities after fixes are released

## Contact

For security-related questions or concerns:
- Email: umit@umituz.com
- GitHub: Create a draft security advisory

Thank you for helping keep this project secure!
