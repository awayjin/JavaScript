import Vue from 'vue'

import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast)

const info = () => {
  // SSR https://zhuanlan.zhihu.com/p/36233639
  if (typeof document === 'object') { // 是客户端才执行
    const instance = new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }
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
