const glob = require('glob') // mul pages
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 动态设置多页入口
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
        new HTMLWebpackPlugin({
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

module.exports = {
  // entry: './src/index.js',
  // 多入口-多页面配置
  // entry: {
  //   index: './src/index.js',
  //   search: './src/search.js',
  // },
  entry: entry,
  output: {
    // path: path.resolve(__dirname, 'dist'),
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js',
    filename: '[name]_[hash:8].js', // 多页面配置
  },
  // 文件监听. 放到硬盘中
  // watch: true,
  // // 只有开启监听模式时，watchOptions才有意义
  // watchOptions: {
  //   // 默认为空，不监听的文件或者文件夹，支持正则匹配
  //   ignored: /node_modules/,
  //   // 监听到变化发生后会等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  //   poll: 1000
  // },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader'},
      { test: /.js$/, use: 'babel-loader'},
      // { test: /.(jpeg|png|gif|jpg)$/, use: 'file-loader' },
      {
        test: /.(jpeg|png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8]',
              limit: 10240
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          // 'style-loader',
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
      }
    ]
  },
  mode: 'production',
  // mode: 'development'
  plugins: [
    // css file
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // new HTMLWebpackPlugin({
    //   template: path.join(__dirname, 'src/index.html'),
    //   filename: 'index.html',
    //   chunks: ['index'],
    //   inject: true,
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: false
    //   }
    // }),
    // new HTMLWebpackPlugin({
    //   template: path.join(__dirname, 'src/search.html'),
    //   filename: 'search.html',
    //   chunks: ['search'],
    //   inject: true,
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: false
    //   }
    // }),
    // optimize css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // ⾃动清理构建⽬录
    new CleanWebpackPlugin()
  ].concat(htmlWebpackPlugins)
}

// 通过占位符确保文件名称的唯一。 filename: '[name].js', // 多页面配置
// ./node_modules/webpack/bin/webpack.js
// sudo yarn add --dev react react-dom @babel/preset-react -D

// 总结区别
//
// 1 .文档定义loader为在模块加载时的预处理文件，故loader运行在打包文件之前。
// 2 . plugins的定义为处理loader无法处理的事物，例如loader只能在打包之前运行，
// 但是plugins在整个编译周期都起作用。