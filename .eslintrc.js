module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    '@vue/airbnb',
    'airbnb-typescript/base',
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  rules: {
    indent: 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-case-declarations': 'off',
    'no-buffer-constructor': 'off',
    'import/no-cycle': 'off',
    'no-nested-ternary': 'off',
    'max-len': 'off',
    'no-mixed-operators': 'off',
    '@typescript-eslint/no-implied-eval': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    extraFileExtensions: ['.vue']
  },
};
