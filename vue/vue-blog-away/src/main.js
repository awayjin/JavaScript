import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false

// eventHub 将在各处使用该事件中心
// 组件通过它来通信
Vue.prototype.$eventHub = new Vue({
  router,
  store,
  // 父组件提供
  provide: {
    // [sym]: 'foo'
    foo: 'bar'
  },
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
