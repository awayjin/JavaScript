// 避免状态单例
// 为每个请求创建一个新的根 Vue 实例
// 同样的规则也适用于 router、store 和 event bus 实例。
// const Vue = require('vue')
//
// module.exports = function createApp (context) {
//   return new Vue({
//     data: {
//       url: context.url
//     },
//     template: `<div>访问的 URL 是: {{ url }}</div>`
//   })
// }

const Vue = require('vue')
// const App = require('./App.vue')

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div class="dd">--访问的 URL 是: ${context.url} {{ url }}</div>`
  })
}
