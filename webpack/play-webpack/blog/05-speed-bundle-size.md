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
```