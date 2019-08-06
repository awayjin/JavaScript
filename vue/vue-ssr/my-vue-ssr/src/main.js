import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
// import store from './store'
// import './registerServiceWorker'

// Vue.config.productionTip = false
//
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { router, app }
}

// const { app } = createApp()
// app.$mount('#app')
