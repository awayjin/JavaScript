// 配置: https://cli.vuejs.org/zh/config/
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    // 端口号
    port: 5000
  },
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/main.js',
  //     // 模板来源
  //     template: 'static/index.html'
  //   }
  // },
  // lintOnSave: 'error'  配置: https://cli.vuejs.org/zh/config/#lintonsave
  // 错误显示出来，生产时关闭
  lintOnSave: process.env.NODE_ENV !== 'production'
}
