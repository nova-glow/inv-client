const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/',
      'vite.config.ts',
      'jest.setup.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser, // ✅ use the imported parser object
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error', 'no-console': 'warn' },
  },
  {
    files: ['**/*.graphql'],
    rules: { 'prettier/prettier': 'error' },
  },
];
