const TARGET = process.env.WEBPACK_TARGET
console.log('TARGET:', TARGET)
console.log('node_env:', process.env.NODE_ENV)

module.exports = {
  devServer: {
    port: 5001
  },
  configureWebpack: {
    // 客户端渲染入口
    entry: './src/entry-client.js'
  }
}
