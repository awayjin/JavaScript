// 生成 clientManifest

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin.js')

module.exports = {
  // entry: './src/entry-client.js'
  entry: {
    app: './src/entry-client.js'
  },
  target: 'web',
  // lintOnSave: true,
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // optimization.splitChunks 代替 webpack.optimize.CommonsChunkPlugin 已经删除
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    new VueSSRClientPlugin()
  ]
  // optimization: {
  //   splitChunks: {
  //     minSize: 0,
  //     cacheGroups: {
  //       commons: {
  //         name: 'commons',
  //         // - async 异步引⼊的库进⾏分离(默认)
  //         // - initial 同步引⼊的库进⾏分离
  //         // - all 所有引⼊的库进⾏分离(推荐)
  //         chunks: 'all',
  //         // 设置最⼩引⽤次数为2次
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
}


