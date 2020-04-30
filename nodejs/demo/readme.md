## inquirer.js —— 一个用户与命令行交互的工具
https://blog.csdn.net/qq_26733915/article/details/80461257

# 祝英台移动端 Web 项目，统一脚手架模板

基于 Vue 相关技术栈

## 目录

安装，开发，构建
- [ 1.1 安装依赖 ](#setup)
- [ 1.2 开发, 环境变量和模式 ](#development)
- [ 1.3 构建 ](#build)
- [ 1.4 修复格式问题 ](#lint)
- [ 1.5 代码提交规范 ](#commit)

确定技术项: 
- [ 2.1 vue-router 路由 ](#vueRouter)
- [ 2.2 keep-alive 组件 ](#keepAlive)
- [ 2.3 axios 相关](#axios)
- [ 2.4 localStorage 使用 ](#localStorage)
- [ 2.5 设计稿转换(px2rem)](#px2rem)
- [ 2.6 工程目录结构 ](#projectStructure)

可选技术项： 
- [ 2.7 vuex 状态管理](#vuex)
- [ 2.8 vConsole 日志查看](#vConsole)

补充:
- [ 2.9 TypeScript 声明文件](#ts)

### 1.1 安装依赖 Project setup <a name="setup"></a>
```
git clone https://git.vankeservice.com/CS/front/cs-template-vue.git

yarn install
```

注意， 若一直出现如下，请切换源：
> info There appears to be trouble with your network connection. Retrying...

切换源：yarn config set registry https://registry.npm.taobao.org

查看源: yarn config get registry

### 1.2 环境变量和模式 <a name="development"></a>

开发本地代理， 配置了三个环境， 分别是: sit, uat, pro. 
```
yarn serve or yarn sit or yarn dev
yarn uat
yarn pro
```

根目录下的 `.env.[mode]` 文件 `VUE_APP_URL` 来设置 URL。

环境变量和模式相应文件
```
// .env.development  开发环境， sit
// .env.staging  用户验收测试, uat
// .env.production  生产环境, pro
NODE_ENV=production
VUE_APP_SECRET=pro
VUE_APP_URL=https://fancy.4009515151.com/
```


### 1.3 构建 <a name="build"></a>
```
yarn build
```

### 1.4 修复格式问题，以免 Eslint 报错 <a name="lint"></a>
```
yarn lint
```

### 1.5 代码提交规范  <a name="commit"></a>
Commit message 和 Change log 编写指南

采用 `@commitlint/{cli,config-conventional}`和 `husky@next`; 

- build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
- docs：文档更新
- feat：新增功能
- merge：分支合并 Merge branch ? of ?
- fix：bug 修复
- perf：性能, 体验优化
- refactor：重构代码(既没有新增功能，也没有修复 bug)
- style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
- test：新增测试用例或是更新现有测试
- revert：回滚某个更早之前的提交
- chore：不属于以上类型的其他类型

提交的日志格式请严格按照 `[日志类型]: [日志内容]` 的形式进行提交, 否则 `git-hooks` 将会阻止你的本次提交.

`git -m commit` 规则设置在 `commitlint.config.js` 文件.
 
示例：
```
// 新增一个功能
git commit -m 'feat: add a button.'
```

### 2.0 各技术配置文档和使用
基础: Vue + Vue-Router + TypeScript

### 2.1 vue-router 路由 <a name="vueRouter"></a>

用路由的 history 模式。这种模式 `yarn build` 后刷新页面问题，需要[配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#nginx)。

nginx 配置:
```
location / {
  try_files $uri $uri/ /index.html;
}
```

路由懒加载: 用 Vue 异步组件和 Webpack 代码分割实现。
```javascript
const routes = { 
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}
```
`/* webpackChunkName: "about" */`，可以把其他组件打包进一个路由，编译后就在同一个异步块， webpackChunkName 名称一样就行


### 2.2 keep-alive 组件  <a name="keepAlive"></a>

路由用全局 keep-alive 组件缓存。设置 meta.keepAlive = true
```javascript
const routes = {
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  meta: {
    // 路由用 keep-alive 组件缓存
    keepAlive: true
  }
}
```

### 2.3 axios 使用 <a name="axios"></a>

位置： `src/plugins/axios.ts`, 已经配置全局变量。

`POST` 请求内容类型默认 `application/json`.

```javascript
this.$axios.get(url)
this.$axios.post(url)
```

```
async fetchDemo () {
  const url = this.$appConfig.api.apiDemo('demo')
  const result = await this.$axios
    .get(url)
    .then(data => data, err => err)
  console.log(result)
},
```

### 2.4 localStorage 使用 <a name="localStorage"></a>

设置值：`this.$appConfig.ls.set('name', value)`

获取值：`this.$appConfig.ls.get('name')`

清空所有：`this.$appConfig.ls.clear()`

更多 API，查看 [官方文档](https://github.com/bevacqua/local-storage)

### 2.5 设计稿转换(pxtorem) <a name="px2rem"></a>

采用 `lib-flexible 和 pxtorem`, 把 px 自动转换成 rem.

示例:
```
// `px` is converted to `rem`
.convert {
    font-size: 16px;
}

// `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers
.ignore {
    border: 1Px solid; // ignored
    border-width: 2PX; // ignored
}
```

默认设计稿宽度是 375px, 配置文件： `postcss.config.js`。
[官方文档](https://github.com/cuth/postcss-pxtorem)，
```
// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // 换算基数
      propList: ['*']
    }
  }
}
```

### 2.6 工程目录 <a name="projectStructure"></a>
```
.
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── vConsole.js
├── src
│   ├── assets
│   │   ├── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── plugins
│   │   ├── local-storage
│   │   └── axios.ts
│   ├── router
│   │   ├── index.ts
│   │   └── user-routes.ts
│   ├── store
│   │   ├── modules
│   │   ├── index.ts
│   │   └── mutations-types.ts
│   ├── styles
│   │   ├── _vars.less
│   │   └── _layout.less
│   └── utils
│       ├── index.ts
│       ├── api-common.ts
│       └── preset.js
│   ├── App.vue
│   ├── main.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
└── vue.config.js
```

### 2.7 vuex 状态管理 <a name="vuex"></a>

位置:  `src/store/index.ts`, store 已经分割成模块，每个模块都有自己的 state、mutation、action、getter.

示例：
```javascript
// store 分割成模块
import initiator from './modules/initiator'
export default new Vuex.Store({
  modules: {
    initiator
  }
})
```

用常量替代 mutation 事件类型， 建议把所有的常量放到 `src/store/mutations-type.ts` 里统一管理.
```javascript
export const INITIATOR = {
  SET_PRODUCTS: 'setProducts',
  SET_PROJECTS: 'setProjects'
}
```

### 2.8 vConsole 日志查看 <a name="vConsole"></a>

位置: `public/index.html`， 默认已经注释，取消注释即可。

```html
<script src="<%= BASE_URL %>vConsole.js"></script>
<script>
  // 初始化
  var vConsole = new VConsole();
  if (window.console) {
    console.log('Hello vConsole');
  }
</script>
```

### 2.9 TypeScript 声明文件 <a name="ts"></a>

位置： `src/plugins/index.d.ts`, 挂载 Vue 上的全局方法或属性，访问 `this.$aixos`, `this.$appConfig`。

> 注意： 可能在 VSCode 等编辑上 .vue 文件出现 Cannot find module 的警告，而编译没报错，是因为自定义的声明文件放到官方的 shims-vue.d.ts 

示例：
```
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $appConfig: any;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
  }
}
```
