module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    // Global
    semi: ['error', 'never'],
    quotes: ['warn', 'single'],
    'quote-props': ['error', 'as-needed'],
    'no-empty': 'warn',
    'no-constant-condition': 'warn',

    // typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    // Vue
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-unused-vars': 'warn',
  },
}
