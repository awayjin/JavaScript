// https://cli.vuejs.org/zh/config/#lintonsave
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 4001
  },
  // lintOnSave: 'error'
  lintOnSave: process.env.NODE_ENV !== 'production' // 错误显示出来，生产时关闭
}
