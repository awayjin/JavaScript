import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js'
// import store from './store'
import { createStore } from './store/store.js'
// import './registerServiceWorker'
// import './plugins/axios' // 请求资源配置
import './plugins/global-config.js' // 全局插件
import DemoVuex from './plugins/min-vuex' // vuex 核心实现
// import Toast from './plugins/toast/toast.js' // toast
import './plugins/toast/toast.js' // toast

if (typeof document === 'object') {
  // Toast.info()
}

const demoVuex = new DemoVuex.Store({
  state: {
    number: 100
  },
  mutations: {
    addNumber (state) {
      state.number++
    }
  }
})
Vue.prototype.$demoVuex = demoVuex

// ssr 时 window 为 undefined
if (typeof window === 'undefined') {
  global.window = {}
}

export function createApp () {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { router, app }
}

// const { app } = createApp()
// app.$mount('#app')
