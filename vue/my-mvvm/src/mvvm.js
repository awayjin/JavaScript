/**
 * Created by jinwei on 2018/6/3.
 */

function MVVM (options) {
  this.$options = options || {}

  this.$data = options.data
  this.$methods = options.methods

  var data = this._data = this.$options.data
  observe(data, this)

}