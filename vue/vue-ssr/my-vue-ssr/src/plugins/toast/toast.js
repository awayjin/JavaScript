import Vue from 'vue'

import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast)

const info = () => {
  const instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

// 以插件形式安装
const config = {}
config.install = () => {
  Vue.prototype.$toast = {
    info
  }
}

Vue.use(config)

export default {
  info
}
