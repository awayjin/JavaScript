export default {
  install (Vue) {
    // 指令: 点击包含元素外关闭
    Vue.directive('clickOutSide', {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    })

    // v-demo
    Vue.directive('demo', {
      bind () {
        console.log('this is a v-demo. only once')
      },
      inserted (el) {
        console.log('el;', el)
        el.focus()
      }
    })
  }
}
