# webpack构建速度和体积优化策略 (12讲)
  


## 5.1 多进程/多实例： 并行压缩

terser-webpack-plugin
```
 optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4
      })
    ]
  },

```

## 5.2 速度分析： 使用 speed-measure-webpack-plugin

```
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 速度分析
const smp = new SpeedMeasureWebpackPlugin() // 速度分析
module.exports = smp.wrap({
   // ...
})
```

## 5.3 分析体积: webpack-bundle-analyzer

```
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 体积分析

```

## 5.4 多进程/多实例构建： 资源并行解析可选方案

开启 gzip
```
// 构建速度优化
const HappyPack = require('happypack')
plugins: [
    new HappyPack({
      loaders: ['babel-loader']
    }),
],
module: {
   rules: [
    {
        test: /\.js$/,
        // loader: 'babel-loader',
        use: [
          'happypack/loader', // 构建速度优化
          // 'babel-loader',
          // 'eslint-loader'
        ],
    }
   ]
}
```

## 5.5 分包： 设置 Externals
思路： 将 react、 react-dom 基础包通过
cdn 引入， 不打入 bundle 中

方法： 使用 html-webpack-externalsplugin
````
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
      })
````

## 进一步分包： 预编译资源模块

思路： 将 react、 react-dom、 redux、 react-redux
基础包和业务基础包打包成一个文件

方法： 使用 DLLPlugin 进行分包， DllReferencePlugin
对 manifest.json 引用

使用 DLLPlugin 进行分包
```javascript
// webpack.dll.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, 'build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'build/library/[name].json')
    })
  ]
};

// webpack.prod.js
plugins: [
  new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
  })
]
```

## 5.6 缓存

目的： 提升二次构建速度. node_modules 下有 .cache

缓存思路：
- babel-loader 开启缓存
- terser-webpack-plugin 开启缓存
- 使用 cache-loader 或者 hard-source-webpack-plugin

```
// babel-loader 的缓存开启
new HappyPack({
    loaders: [ 'babel-loader?cacheDirectory=true' ]
}),

const TerserPlugin = require('terser-webpack-plugin')
// terser-webpack-plugin 开启缓存
optimization: {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            cache: true
        })
    ]
},

// hard-source-webpack-plugin
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

plugins: [
    new HardSourceWebpackPlugin()
]
```

## 5.7 缩小构建目标. 减少文件搜索范围

目的： 尽可能的少构建模块

比如 babel-loader 不解析 node_modules

减少文件搜索范围
- 优化 resolve.modules 配置（ 减少模块搜索层级）
- 优化 resolve.mainFields 配置
- 优化 resolve.extensions 配置
- 合理使用 alias

```javascript
module.exports = {
  module: {
    rules: [
      {
      test: /.js$/,
      //include: path.resolve('src'),
      
      }]
  },
  resolve: {
      alias: {
          'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
      },
      extensions: ['.js'],
      mainFields: ['main']
  }
}
```