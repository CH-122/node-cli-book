module.exports = {
  env: { node: true },
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'], // might not be needed
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-dupe-keys': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
  },
};
