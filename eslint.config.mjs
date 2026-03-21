// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error',

      // TypeScript
      '@typescript-eslint/no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      // Vue
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',

      // Code quality
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
      'no-empty-function': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'curly': ['error', 'multi-line', 'consistent'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'no-shadow': 'off',
      'yoda': 'error',
      'max-nested-callbacks': ['error', { max: 4 }],
      'max-statements-per-line': ['error', { max: 1 }]
    }
  },
  {
    ignores: ['node_modules/', '.nuxt/', '.output/', 'dist/', 'coverage/']
  }
)
