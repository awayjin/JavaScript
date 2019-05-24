module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 5000
  },
  // lintOnSave: 'error'  配置: https://cli.vuejs.org/zh/config/#lintonsave
  lintOnSave: process.env.NODE_ENV !== 'production'
}
