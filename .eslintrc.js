module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react-svg/recommended'
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'react-svg'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-undef': 2,
    'no-unsafe-optional-chaining': 1,
    'no-console': 'warn',
    'no-eval': 'error',
    'no-unused-vars': 'warn',
    'import/first': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 1
  }
}
