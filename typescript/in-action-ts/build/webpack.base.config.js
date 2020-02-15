const HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log('process.env', process.env)
// console.log('process.NODE_ENV', process.NODE_ENV)
// console.log('process.mode', process.mode)
// console.log('<---- process.argv', process.argv)
// console.log('<---- process.env.npm_lifecycle_event', process.env.npm_lifecycle_event)

let isProduction = false
if (process.argv.toString().indexOf('production') !== -1) {
  isProduction = true
}
// console.log('isProduction:', isProduction)
// console.log('process.argv:', process.argv)

module.exports = (env, argv) => {
  console.log('env:', env)
  console.log('argv:', argv)
  return {
    // entry: './src/index.ts',
    // entry: './src/index.tsx',
    entry: {
      app: './src/index.tsx'
    },
    output: {
      // filename: 'app.js'
      // filename: '[name].[hash:8].js' // 开发环境使用
      // filename: '[name].[chunkhash:8].js' // 只能用在生产环境下
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].[hash:8].js'
      // filename: env.NODE_ENV ? '[name].[chunkhash:8].js' : '[name].[hash:8].js'
    },
    devServer: {
      port: 3000,
      hot: true
    },
    // 3个扩展名
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: [{
            loader: 'ts-loader'
          }],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/tpl/index.html'
      })
    ],
    // 拆包
    optimization: {
      splitChunks: {
        // 把 node_modules 下的包抽离出来，单独打包一个 vendor 文件
        chunks: 'all'
      }
    }
  }
}