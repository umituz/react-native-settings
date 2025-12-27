const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-native': reactNative,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/prop-types': 'off',
      'react-native/no-inline-styles': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
