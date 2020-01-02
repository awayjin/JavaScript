const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/'
  },
  output: {
    // path: path.resolve('dist'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  mode: 'production',
  // webpack 可以使用 loader 来预处理文件。
  // 这允许你打包除 JavaScript 之外的任何静态资源。
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: [
            //   '@babel/preset-env'
            // ],
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    edge: '17',
                    chrome: '66',
                    safari: '11.1',
                    firefox: '60',
                    // android: '4'
                  },
                  useBuiltIns: 'usage'
                }
              ]
            ]
            // plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
    // new webpack.HotModuleReplacementPlugin() // webpack4.x 后自动引入
  ]
}
