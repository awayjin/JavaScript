// const Vue = require('vue')
// const App = require('./App.vue')

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

// module.exports = function createApp (context) {
export function createApp (context) {

  // 创建 router 实例
  const router = createRouter()

  const app = new Vue({
    // data: {
    //   msg: 'demo' ,
    //   url: context.url
    // },
    router,
    render: h => h(App)
    // template: `
    //   <div>
    //     this is a {{ msg }}. <br>
    //     url: {{ url }}
    //   </div>
    // `
  })


  return { app, router }
}