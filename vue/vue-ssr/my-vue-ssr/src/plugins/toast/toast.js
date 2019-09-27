import Vue from 'vue'
import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast)
ToastConstructor.prototype.remove = function () {
  // console.log('this.$el:', this.$el)
  let el = this.$el
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const info = (props) => {
  // SSR https://zhuanlan.zhihu.com/p/36233639
  // 是客户端才执行
  console.log('ToastConstructor:', ToastConstructor)
  if (typeof document === 'object') {
    const instance = new ToastConstructor({
      el: document.createElement('div'),
      data: {
        test: 'test-d'
      }
    })

    console.log('instance:', instance)
    console.log('instance.message:', instance.message)
    console.log('instance.el:', instance.el)
    let obj = {}
    if (typeof props === 'string') {
      obj = {
        message: props
      }
    }

    instance.message = obj.message
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
