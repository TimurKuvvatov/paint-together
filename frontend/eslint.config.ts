import js from '@eslint/js';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import fsd from '@feature-sliced/steiger-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['**/*.gen.ts', '**/vite-env.d.ts']
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      '@feature-sliced': fsd,
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      ...fsd.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always'
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'] :matches(ImportDefaultSpecifier, ImportNamespaceSpecifier)",
          message: 'Default React import is not allowed'
        },
        {
          selector: 'Identifier[name="React"]',
          message: 'Prefix React is not allowed'
        },
        {
          selector:
            'MemberExpression[object.property.name="meta"][property.name="env"]',
          message:
            'Direct access to `import.meta.env` is forbidden. Use `@/shared/config` instead.'
        }
      ],

      'newline-before-return': 'error',
      'arrow-body-style': ['warn', 'as-needed'],

      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/boolean-prop-naming': [
        'error',
        {
          rule: '^(is|as|has|should|can|enable)[A-Z]',
          validateNested: true
        }
      ],
      'react/destructuring-assignment': [
        'warn',
        'always',
        { destructureInSignature: 'always' }
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }
      ],
      'react/self-closing-comp': ['warn', { component: true, html: true }],

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] }
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            FC: 'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177'
          }
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
