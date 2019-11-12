
## Vue2.x 源码学习

## 构建脚本
从构建开始
```json
{
  "script": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex"
  }
}
```
打开`scripts/build.js`,



## Vue-next 相关
API: https://composition-api.vuejs.org/

vue-next: https://github.com/vuejs/vue-next

API RFC: https://zhuanlan.zhihu.com/p/68477600