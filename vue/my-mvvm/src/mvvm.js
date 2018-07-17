/**
 * Created by jinwei on 2018/6/3.
 */

function MVVM (options) {
  this.$options = options || {}

  var data = this._data = this.$options.data
  var me = this

  // 1.0 数据代理
  // 实现 vm._data.xxx -> vm.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key)
  })

  // 2.0 初始化计算属性
  // me._initComputed()

  // 3.0 实现数据监听器Observer,监听所有属性，如变动拿到最新值通知订阅者
  // observe(data, this)

  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  // 1.1 数据代理。下划线一种常见的记号，表示只能通过对象方法访问的属性
  _proxyData: function (key, setter, getter) {
    var me = this
    setter = setter ||
        Object.defineProperty(me, key, {
          enumerable: true, // 可枚举
          configurable: false, // 不能再define
          get: function proxyGetter () {
            return me._data[key]
          },
          set: function proxySetter (newVal) {
            console.log('1.1 set:' + newVal)
            me._data[key] = newVal
          }
        })
  },
  // 2.1 计算属性
  _initComputed: function () {
    // console.log(this)
    var me = this
    var computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.keys(computed).forEach(function (key) {
        // console.log(computed[key])
        // console.log(computed[key].get)
        Object.defineProperty(me, key, {
          get: typeof computed[key] === 'function'
            ? computed[key]
            : computed[key].get,
          set: function () {

          }
        })
      })
    }
  }
}