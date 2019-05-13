import Vue from 'vue'
import App from './App.vue'
// 路由配置
import router from './router/index'
// 过滤器配置
import VueFilters from './filters/index'
// 请求资源配置
import './plugins/axios'
import VueGlobalVariable from './setting/index'

// 添加全局变量
Vue.use(VueGlobalVariable)

// 安装过滤器
Vue.use(VueFilters)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
