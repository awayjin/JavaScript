/**
 * Created by jinwei on 2018/6/3.
 */

function Observer (data) {
  this.data = data
  this.walk = data
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key])
    })
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive: function (data, key, val) {
    var dep = new Dep()
    var childObj = observe(val) // 监听子属性

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        // 由于需要在闭包内添加Watcher,所以通过Dep定义一个全局target,暂存Watcher,添加完删除
        // Dep.target && dep.addDep(Dep.target)
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set: function (newVal) {
        if (val === newVal) return
        console.log('监听到值变化了, val:' + val + ', newVal:' + newVal)
        val = newVal
        childObj = observe(newVal)
        dep.notify() // 通知所有订阅者
      }
    })
  }

}

function observe (value, vm) {
  /**
   * 数据监听器Observer, 对数据对象的所有属性进行监听,
   * 如有变动拿到最新值并通知订阅者
   */
  // 1.0 需要observe的数据对象进行递归遍历
  if (!value || typeof value !== 'object') {
    return
  }

  // 取出所有属性进行遍历
  // Object.keys(data).forEach(function (key) {
  //   defineReactive(data, key, data[key])
  // })
  return new Observer(value)
}

var uid = 0

function Dep () {
  this.id = uid++
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },

  depend: function () {
    Dep.target.addDep(this)
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub)
    if (index !== -1) {
      this.subs.splice(index, 1)
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  },

}

Dep.target = null