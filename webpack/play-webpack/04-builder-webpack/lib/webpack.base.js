const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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

// 基础配置
module.exports = {
  entry: entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
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
    // CSS 单独提取出一个文件出来
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(), // 命令行
    // 错误捕获
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
  stats: 'errors-only'
}