'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 速度分析
const smp = new SpeedMeasureWebpackPlugin() // 速度分析

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// 构建速度优化
const HappyPack = require('happypack')

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      // '/Users/cpselvis/my-project/src/index/index.js'

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

// 速度分析
module.exports = smp.wrap({
// module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'happypack/loader', // 构建速度优化
          {
            loader: 'thread-loader', // webpack 4.x 构建速度优化
            options: {
              workers: 6
            }
          }
          // 'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
    }),
    new HappyPack({
      loaders: ['babel-loader']
    }),
    new BundleAnalyzerPlugin(), // 体积分析
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // }),
    new FriendlyErrorsWebpackPlugin(),
    function() {
      this.hooks.done.tap('done', (stats) => {
        console.log('每次构建完都会触发')
        if (stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') == -1) {
          console.log('build error');
          process.exit(133);
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4
      })
    ]
  },
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
  // // 分离公共文件
  // optimization: {
  //     splitChunks: {
  //         minSize: 0,
  //         cacheGroups: {
  //             commons: {
  //                 name: 'commons',
  //                 chunks: 'all',
  //                 minChunks: 2 // 最少两次
  //             }
  //         }
  //     }
  // }

  stats: 'normal'
  // stats: 'errors-only'
// }
});