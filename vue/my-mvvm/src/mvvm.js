/**
 * Created by jinwei on 2018/6/3.
 */

function MVVM (options) {
  this.$options = options || {}

  // this.$data = options.data
  // this.$methods = options.methods

  var data = this._data = this.$options.data
  var me = this

  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key)
  })

  // observe(data, this)

}

MVVM.prototype = {
  _proxyData: function (key, setter, getter) {
    var me = this
    setter = setter ||
        Object.defineProperty(me, key, {
          enumerable: true,
          configurable: false,
          get: function proxyGetter () {
            return me._data[key]
          },
          set: function proxySetter (newVal) {
            me._data[key] = newVal
          }
        })
  }
}