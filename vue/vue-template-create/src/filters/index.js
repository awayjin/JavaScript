import Vue from 'vue'

const filters = {
  // 全局过滤器
  install (Vue) {
    Vue.filter('demoFilter', function (val) {
      let isType = type => value => {
        return Object.prototype.toString.call(value) === '[object ' + type + ']'
      }
      // Number 类型判断
      if (isType('Number')(val) && typeof val === 'number') {
        return '-Number.'
      } else {
        return val + '-Not a Number'
      }
    })
  } // close install
}

Vue.use(filters)

export default filters
