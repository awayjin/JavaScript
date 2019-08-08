const isNode = process.env.WEBPACK_TARGET === 'node'
const TARGET = isNode ? 'server' : 'client'
// node server 端打包
const serverConfig = require('./server/webpack.server.config.js')
// 客户端打包
const clientConfig = require('./server/webpack.client.config.js')
const merge = require('lodash.merge')

console.log('process.env.WEBPACK_TARGET:', process.env.WEBPACK_TARGET)
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

module.exports = {
  devServer: {
    port: 5001
  },
  css: {
    extract: process.env.NODE_ENV === 'production'
  },
  configureWebpack: {
    // 客户端渲染入口
    // entry: `./src/entry-${TARGET}.js`
    ...(isNode ? serverConfig : clientConfig)
    // ...webpackConfig
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          optimizeSSR: false
        })
      )
  }
}
