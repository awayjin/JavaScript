const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); // mul pages

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
            removeComments: false,
          },
        }),
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  // entry: './src/index.js',
  // 多入口-多页面配置
  entry,
  output: {
    // filename: 'bundle.js',
    // filename: '[name].js', // 多页面配置
    filename: '[name][hash:8].js', // chunkhash
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /.js$/, use: 'babel-loader' },
      // { test: /.(jpeg|png|gif|jpg)$/, use: 'file-loader' },
      {
        test: /.(jpeg|png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin() // 可以不加
  ].concat(htmlWebpackPlugins),
  // mode: 'production'
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // 热更新， hot: true 自动引入 HotModuleReplacementPlugin
    hot: true,
  },
  devtool: 'source-map',
};
