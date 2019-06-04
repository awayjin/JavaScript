import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store.js'
// import Authorized from './components/authorized' // 组件方式控制权限
// import Auth from './directives/auth' // 指令方式控制权限

// Vue.component('Authorized', Authorized)
// Vue.use(Auth)

// my-vuex 核心实现
import DemoVuex from './views/vuex/min-vuex'
Vue.use(DemoVuex)
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
new Vue({
  router,
  // 从根组件“注入”到每一个子组件中
  store,
  render: h => h(App)
}).$mount('#app')
