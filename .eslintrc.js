module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest',
    '@typescript-eslint'
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/prop-types': [
      2, { ignore: ['children'] }],
    // api responses are in camel case, if this was real code
    // then just turning it off I would have found a better solution
    camelcase: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  },
  ignorePatterns: [
    'node_modules/**'
  ],
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx'
      ],
      env: {
        jest: true
      }
    }
  ]
}
