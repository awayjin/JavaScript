基于 CLI 实现: https://juejin.im/post/5b98e5875188255c8320f88a

官网例子实现: https://juejin.im/post/5ba35be16fb9a05d3b336936

## 1. SSR 介绍

### 什么是服务器端渲染 (SSR) Server-Side Rendering

Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。也可以将同一个组件渲染为服务器端的 HTML 字符串

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。


### Why SSR?

与传统 SPA 相比，服务器端渲染 (SSR) 的优势主要在于：

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面

- 更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。

使用服务器端渲染 (SSR) 时还需要有一些权衡之处：

- 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理

- 涉及构建设置和部署的更多要求。服务器渲染应用程序，需要处于 Node.js server 运行环境。

- 更多的服务器端负载。


### 服务器端渲染 vs 预渲染 (SSR vs Prerendering)

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。


## 2. 基本用法

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

- 1. 基于最新的`vue-cli`搭建SSR, 可以无缝对接
- 2. 所有平台构建、开发命令一样
- 3. 更易维护，每行注释