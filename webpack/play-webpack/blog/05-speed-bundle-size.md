# webpack构建速度和体积优化策略 (12讲)
  


## 多进程/多实例： 并行压缩

terser-webpack-plugin
```
 optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4
      })
    ]
  },

## 速度分析： 使用 speed-measure-webpack-plugin
```
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 速度分析
const smp = new SpeedMeasureWebpackPlugin() // 速度分析
module.exports = smp.wrap({
   // ...
})
```

## 分析体积: webpack-bundle-analyzer 
```
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 体积分析

```

## 多进程/多实例构建： 资源并行解析可选方案

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