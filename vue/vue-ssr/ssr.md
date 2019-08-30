
基于 vue-cli3.x 实现: https://juejin.im/post/5b98e5875188255c8320f88a

官网例子实现: https://juejin.im/post/5ba35be16fb9a05d3b336936


# 基于 Vue-cli3.x 服务端渲染(SSR)实现

本文关键知识点

1. 什么是 SSR ? SSR 优缺点 

2. 基于 vue-cli3.x 创建工程模板

3. 改造 SSR 工程模板
 - 3.1 vue.config.js
 
 - 3.2 服务端渲染需要生成两个 JSON 文件
     - 3.2.1 生成服务端 server-bundle 文件
     - 3.3.2 生成客户端 client-manifest 文件
     
 - 3.3 代码改造
    - 3.3.1 新建所有页面模板 index-template.html
    - 3.3.2 修改源码结构。状态单例，客户端和服客端不同的入口
    
4. 基于 vue-cli3.x 实现热更新

## 1. SSR 介绍

### 什么是服务器端渲染 (SSR) Server-Side Rendering

- 服务端渲染：渲染过程在服务器端完成，最终的渲染结果 HTML 页面通过 HTTP 协议发送给客户端。对于客户端而言，只是看到了最终的 HTML 页面，看不到数据，也看不到模板。

- 客户端渲染：服务器端把模板和数据发送给客户端，渲染过程在客户端完成。

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。


### Why SSR?

与传统 SPA 相比，服务器端渲染 (SSR) 的优势主要在于：

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面

- 更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。

使用服务器端渲染 (SSR) 缺点：

- 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理

- 涉及构建设置和部署的更多要求。服务器渲染应用程序，需要处于 Node.js server 运行环境。

- 更多的服务器端负载。


### 服务器端渲染 vs 预渲染 (SSR vs Prerendering)

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。


## 2. 基本用法

#### 创建工程

手动选择 `Babel Router Vuex Linter / Formatter`
```
vue create vue-ssr-example
```

## 3. 改造 SSR 工程模板

## 3.1  根目录下新建 vue.config.js 

关键点: 添加 source-map。如果不加会SSR会报错， vue ssr Cannot read property 'replace' of undefined
```javascript
css: {
  sourceMap: true
}
```


```javascript
// vue.config.js
// 核心代码
const serverConfig = require('./server/webpack.server.config.js')
const clientConfig = require('./server/webpack.client.config.js')
module.exports = {
  css: {
    extract: process.env.NODE_ENV === 'production',
    // vue ssr Cannot read property 'replace' of undefined
    sourceMap: true
  },
  configureWebpack: {
    ...(isNode ? serverConfig : clientConfig)
  }
}
```

## 3.2 服务端渲染需要生成两个 JSON 文件

#### 3.2.1 生成服务端 server-bundle 文件 `vue-ssr-server-bundle.json`

```javascript
// ./server/webpack.server.config.js
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin.js')
module.exports = {
  // 为什么加了 .js 后就不能 build ?
  entry: `./src/entry-server`,
  target: 'node',
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
}

```

#### 3.2.2 生成客户端 client-manifest 文件 `vue-ssr-client-manifest.json`
```javascript

// ./server/webpack.client.config.js
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin.js')
module.exports = {
  entry: {
    app: './src/entry-client.js'
  },
  target: 'web',
  plugins: [
    new VueSSRClientPlugin()
  ]
}

```

## 3.3 代码改造

#### 3.3.1 新建入口静态文件 index-template.html
此模板应该包含 `<!--vue-ssr-outlet-->`

#### 3.3.2 修改源码结构。
避免状态单例
```javascript
// app.js
const Vue = require('vue')
module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
}
```

客户端和服客端不同的入口
entry-client.js 和 entry-server.js

## 3. 编写通用代码
编写"通用"代码时的约束条件 - 即运行在服务器和客户端的代码。


#### 服务器上的数据响应
每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染 (cross-request state pollution)

实际的渲染过程需要确定性，所以我们也将在服务器上“预取”数据 ("pre-fetching" data) - 这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。也就是说，将数据进行响应式的过程在服务器上是多余的，所以默认情况下禁用。


#### 组件生命周期钩子函数
由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。  

#### 访问特定平台(Platform-Specific) API
对于仅浏览器可用的 API，通常方式是，在「纯客户端 (client-only)」的生命周期钩子函数中惰性访问 (lazily access) 它们

#### 自定义指令
两种方法
- 推荐使用组件作为抽象机制，并运行在「虚拟 DOM 层级(Virtual-DOM level)」（例如，使用渲染函数(render function)）。
- 如果你有一个自定义指令，但是不是很容易替换为组件，则可以在创建服务器 renderer 时，使用 directives 选项所提供"服务器端版本(server-side version)"

## 4. 源码结构

#### 避免状态单例
我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例

#### 介绍构建步骤

#### 介绍构建步骤


## concurrently 并行地运行多个命令
concurrently 并行地运行多个命令（同时跑前端和后端的服务）
```html
 "scripts": {
    "dev": "concurrently \"npm run serve\" \"npm run dev:serve\"",
    "serve": "vue-cli-service serve",
    "dev:serve": "cross-env WEBPACK_TARGET=node node ./server/ssr.js",
  }
```

## 此工程模板的亮点

1. 基于最新的 `vue-cli 3.x` 搭建SSR, 可以无缝对接

2. 所有平台构建、开发命令一样

3. 更易维护，每行注释

## node
````html
// process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// console.log('process.cwd():', process.cwd())
// console.log('__dirname :', __dirname )
````