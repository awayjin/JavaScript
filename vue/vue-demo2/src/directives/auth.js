import { check } from '../utils/auth'

function install (Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted (el, bindding) {
      if (!check(bindding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}

export default { install }
