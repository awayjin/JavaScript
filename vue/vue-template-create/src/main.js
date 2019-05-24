import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/axios' // 请求资源配置
import './utils/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
