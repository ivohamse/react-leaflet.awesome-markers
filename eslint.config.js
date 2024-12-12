export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import', 'react-compiler'],
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-compiler/react-compiler': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};