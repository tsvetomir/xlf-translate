import globals from 'globals';
import pluginJs from '@eslint/js';
import vitest from "@vitest/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js', 'bin/xlf-translate'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'indent': ['error', 4],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-console': 'off'
    }
  },
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.js'],
    languageOptions: { sourceType: 'module' },
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
