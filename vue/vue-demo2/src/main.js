import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/axios' // 请求资源配置

import store from './store/store.js'
// import Authorized from './components/authorized' // 组件方式控制权限
// import Auth from './directives/auth' // 指令方式控制权限

// Vue.component('Authorized', Authorized)
// Vue.use(Auth)

import { InfiniteScroll, Spinner } from 'mint-ui'
import VueGlobalVariable from './utils' // 全局变量设置

import ClickOutside from './directives/click-outside'
Vue.use(ClickOutside)

Vue.use(VueGlobalVariable)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)

// my-vuex 核心实现
// eslint-disable-next-line
import DemoVuex from './views/vuex/min-vuex.js'
// Vue.use(DemoVuex)
const demoStore = new DemoVuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.prototype.$demoVuex = demoStore

// Vue.store = store
Vue.config.productionTip = false
// demo
window.Vue = new Vue({
  router,
  // 从根组件“注入”到每一个子组件中
  store,
  render: h => h(App),
  mounted () {
    // for 预渲染
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
