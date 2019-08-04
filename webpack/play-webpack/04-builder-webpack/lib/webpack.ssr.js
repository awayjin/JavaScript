const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 公共的资源包


const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader'
      },
      {
        test: /\.less$/,
        use: '.ignore-loader'
      },
    ]
  },
  plugins: [
    // 代码压缩
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 公共的资源包
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ]
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/, // 把 react react-dom 提取出 vendors-xx.js
  //         name: 'vendors', // 把 vendors 添加到 htmlWebpackPlugins chunks: ['vendors', pageName],
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  // 公共的资源 commons.js
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          // all 所有引⼊的库进⾏分离(推荐)
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
