import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
// import Authorized from './components/authorized' // 组件方式控制权限
// import Auth from './directives/auth' // 指令方式控制权限

// Vue.component('Authorized', Authorized)
// Vue.use(Auth)

Vue.config.productionTip = false
// demo
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
