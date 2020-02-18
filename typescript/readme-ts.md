# typescript

## *.d.ts和@types关系理解

@types：是npm的一个分支

*.d.ts：ts为了代码的可复用性，要声明一些静态类型文件，那些文件就是*.d.ts，这些静态类型文件类似 jQ 这种第三方库，就为了一次申明、多次复用。

push 代码两种方式:
- 把 *.d.ts 文件 push 到 npm 上，这种我们只要直接下载即可。

- 另外是没有 push 到 npm 上，为了保证能使用从npm下载的ts，我们就必须往@types这个分支上push对应的*.d.ts文件，然后按照npm install -s @types/*** 下载。

本地自己写ts文件申明，自己使用，不需要上传上去。比如我们在使用 ts 和 react 进行开发的时候，安装了路由 react-dom-router，同时还需要安装 @types/react-dom-router

参考: (https://blog.csdn.net/zjscy666/article/details/81810551)

## webpack 配置

创建 tsconfig.json, `tsc --init `. 帮助 `tsc -h`

```
npm i -D webpack webpack-cli webpack-dev-server

#
yarn add --dev webpack webpack-cli webpack-dev-server


yarn add --dev ts-loader typescript

yarn add --dev html-webpack-plugin 

yarn add --dev clean-webpack-plugin 

yarn add --dev webpack-merge 

```

## react 环境配置

yarn add react react-dom

声明文件：
yarn add @types/react @types/react-dom


"jsx": "preserve",            
/* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */

preserve 生成的代码会保留 jsx 的格式.

React + TS：
https://segmentfault.com/a/1190000019962867?utm_source=tag-newest

## 项目配置优化

为入口文件单独提供一个名称.

webpack 4 拆包分包, 用来被浏览器缓存。

优化(optimization):
从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化

```js
  filename: '[name].[hash:8].js' // 开发环境使用
  filename: '[name].[chunkhash:8].js' // 只能用在生产环境下
      
  // 拆包分包
  optimization: {
    splitChunks: {
      // 把 node_modules 下的包抽离出来，单独打包一个 vendor 文件
      chunks: 'all'
    }
  }
```

## 按需加载 babel-plugin-import
.babelrc 文件中
```
{
  "plugins": [
    ["import", {
      "libraryName": "antd-mobile",
      "style": "css"
    }]
  ]
}
```

### 参考
React + TS：
https://segmentfault.com/a/1190000019962867?utm_source=tag-newest

react-keep-alive:
https://github.com/StructureBuilder/react-keep-alive/blob/master/README.zh-CN.md