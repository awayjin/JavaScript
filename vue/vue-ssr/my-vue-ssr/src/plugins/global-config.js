import Vue from 'vue'
import axios from 'axios'
import TestToast from '../components/test-toast.vue'

let config = { }
config.install = function (Vue) {
  Vue.prototype.$axios = axios
  Vue.prototype.$msg = 'hello msg' // 全局属性
  // 全局方法
  Vue.prototype.$myMethod = function (msg) {
    console.log('$myMethod:', msg)
  }

  Vue.component(TestToast.name, TestToast)
}

Vue.use(config)

export default config
