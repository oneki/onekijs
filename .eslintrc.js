module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'react-app',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        trailingComma: 'es5',
        singleQuote: true,
        semi: true,
        tabWidth: 2,
      },
    ],
  },
};
