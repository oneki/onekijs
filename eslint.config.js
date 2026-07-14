const prettierConfig = require('eslint-config-prettier');
const jestDom = require('eslint-plugin-jest-dom');
const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'jest-dom': jestDom,
      prettier,
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          printWidth: 120,
        },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
