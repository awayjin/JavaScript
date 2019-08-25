const isNode = process.env.WEBPACK_TARGET === 'node'

// node server 端打包
const serverConfig = require('./server/webpack.server.config.js')
// 客户端打包
const clientConfig = require('./server/webpack.client.config.js')

const PORT = process.env.PORT || 5001
console.log('PORT:', PORT)

module.exports = {
  // 添加一个字段，如果是开发环境，就指定到webpack dev server中
  publicPath: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5001' : '',
  // assetsDir: 'dist/',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: PORT,
    // 错误和警告显示在浏览器上
    overlay: {
      warnings: true,
      errors: true
    }
  },
  css: {
    // 将组件中的 CSS 提取至一个独立的 CSS 文件中, 以便缓存
    extract: process.env.NODE_ENV === 'production',
    // extract: false,
    // vue ssr Cannot read property 'replace' of undefined
    sourceMap: true
  },
  configureWebpack: {
    // 渲染入口
    ...(isNode ? serverConfig : clientConfig)
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .tap(options =>
  //       merge(options, {
  //         optimizeSSR: false
  //       })
  //     )
  // }
}
