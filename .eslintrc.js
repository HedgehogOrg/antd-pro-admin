module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "sourceType": "module",
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  rules: {
    "max-len": 0,
    "no-console": 0,
    "func-names": 0,
    "no-plusplus": 0,
    "no-await-in-loop": 0,
    "semi": ["error", "always"],
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "consistent-return":"warn",
    "no-nested-ternary":"warn",
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": 0,
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-unstable-nested-components": 0,
  }
};