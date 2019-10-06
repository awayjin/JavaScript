## loader

> 定义: 只是一个导出为函数的 JavaScript 模块。
多个 loader 串行执行，顺序从后到前。
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。

## 一个最简单的 loader 代码结构
定义： loader 只是一个导出为函数的 JavaScript 模块

```javascript
const path = require('path')
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          path.resolve('./loaders/a-loader.js'),
          path.resolve('./loaders/b-loader.js')
        ]
      }
    ]
  }
}
// ./loaders/a-loader.js
module.exports = function (source) {
  console.log('loader a is executed.')
  return source
}
```

## loader-runner 介绍

定义： loader-runner 允许你在不安装 webpack 的情
况下运行 loaders

作用：
- 作为 webpack 的依赖， webpack 中使用它执行 loader
- 进行 loader 的开发和调试

[loade-runner](https://github.com/webpack/loader-runner)

```javascript
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [
    {
      loader: path.join(__dirname, './src/raw-loader.js')
    }
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  err ? console.log(err) : console.log(result);
});
```

[path-resolve-join](https://www.cnblogs.com/moqiutao/p/8523955.html)
- path.resolve() 方法将路径或路径片段的序列解析为绝对路径。

1.连接路径：path.join([path1][, path2][, ...])
2.路径解析：path.resolve([from ...], to)

- pwd 命令用于显示工作目录

## 核心概念之 Loaders
> 定义: 只是一个导出为函数的 JavaScript 模块。
多个 loader 串行执行，顺序从后到前。


```javascript
module.exports = function(source) {
  return source
}

{
  test: /\.js/,
  use: [
    'bar-loader',
    'foo-loader'
  ]
}
```

webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

本身是一个函数，接受源文件作为参数，返回转换的结果。

## 插件 
复制目录: cp -r loader-order my-plugin