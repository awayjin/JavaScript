module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
    // "eslint:recommended"
  ],
  // add your custom rules here
  // 关闭 singleline 警告
  rules: {
    // 'nuxt/no-cjs-in-config': 'off',
    "no-console": "off",
    "space-before-function-paren": ["error", "always"], // 函数名后空格
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
