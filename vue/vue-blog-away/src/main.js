import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  store,
  // 父组件提供
  provide: {
    // [sym]: 'foo'
    foo: 'bar'
  },
  render: h => h(App)
})
  .$mount('#app')
