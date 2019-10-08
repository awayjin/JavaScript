/**
 * Created by jinwei on 2018/6/3.
 */

/**
 *
 *
 > Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，
 内部采用Object.defineProperty的getter和setter来实现。

 > Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，
 根据指令模板替换数据，以及绑定相应的更新函数。

 compile 主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，
 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

 > Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，
 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

 > Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），
 数据变动触发 notify 函数，再调用订阅者的 update 方法。
 *
 */

function MVVM (options) {
  this.$options = options || {}

  var data = this.$options.data
  this._data = data
  this.$data = data

  var me = this

  // 1.0 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key)
  })

  // 2.0 初始化计算属性
  me._initComputed()

  // 3.0 实现数据监听器Observer,监听所有属性，如变动拿到最新值通知订阅者
  observe(data, this)

  // 4
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  // 1.1 数据代理。下划线一种常见的记号，表示只能通过对象方法访问的属性
  _proxyData: function (key, setter, getter) {
    var me = this
    setter = setter ||
        Object.defineProperty(me, key, {
          enumerable: true, // 可枚举
          configurable: false, // 表示能否通过 delete 删除属性从而重新定义属性
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
          set: function (value) {

          }
        })
      })
    }
  }
}