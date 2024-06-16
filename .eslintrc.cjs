module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'no-undef': 'error',
    'max-len': ['error', { 'code': 160 }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-named-as-default': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'padding-line-between-statements': [
      'error',
      { "blankLine": 'always', prev: '*', next: 'return' },
      { "blankLine": 'always', prev: 'block-like', next: '*' },
      { "blankLine": 'always', prev: '*', next: 'block-like' },
      { "blankLine": 'always', prev: '*', next: 'directive' },
      { "blankLine": 'any', prev: 'directive', next: 'directive' }
    ],
  },
  "globals": {
    "NodeListOf": true,
  },
}
