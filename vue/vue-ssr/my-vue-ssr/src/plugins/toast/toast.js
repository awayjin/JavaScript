import Vue from 'vue'
import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast)
ToastConstructor.prototype.remove = function () {
  console.log('this.$el:', this.$el)
  let el = this.$el
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const info = () => {
  // SSR https://zhuanlan.zhihu.com/p/36233639
  if (typeof document === 'object') { // 是客户端才执行
    const instance = new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.timer = setTimeout(() => {
        instance.remove()
      }, 2000)
    })
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
