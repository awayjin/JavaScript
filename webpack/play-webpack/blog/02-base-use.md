# Webpack 概念
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

# webpack 基础用法

### 1. 核心概念之 entry
单入口是一个字符串，多入口是一个对象
```
// 单入口是一个字符串
entry: './src/index.js'
// 多入口-多页面配置
entry: {
 index: './src/index.js',
 search: './src/search.js',
}
```

### 2. 核心概念之 output
通过占位符确保文件名称的唯一。`filename: '[name].js'`
```javascript
module.exports = {
  // 多入口-多页面配置
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js', // 多页面配置
    path: path.resolve(__dirname, 'dist')
  }
}
```

### 3. 核心概念之 Loaders
webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。

常见的 Loaders 有哪些?
![imgage](./loader.png)

### 4. 核心概念之 Plugins

插件用于 bundle 文件的优化，资源管理理和环境变量量注⼊入 

作⽤用于整个构建过程

常⻅见的 Plugins 有哪些?
![image](./plugins.png)
```
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
```

### 5. 核心概念之 Mode
Mode ⽤来指定当前的构建环境是:production、development 还是 none 

设置 mode 可以使⽤用 webpack 内置的函数，默认值为 production
