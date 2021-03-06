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

 compile 主要做的事情是解析DOM节点树，将节点中的变量替换成数据，然后初始化渲染页面视图，
 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

 > Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，
 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

 > Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），
 数据变动触发 notify 函数，再调用订阅者的 update 方法。
 *
 */


/**
 * Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，
 内部采用Object.defineProperty的getter和setter来实现。
 * 1. typeof value
 * 2. walk-Object.keys-key, value
 * 3. convert-defineReactive-data, key, value
 * 4. defineReactive-
 */


function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  // 3.2 walk遍历所有数据
  walk: function (data) {
    var me = this;
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key])
    })
  },
  // 3.3 convert转换所有数据
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  // 3.4
  defineReactive: function (data, key, val) {
    // 监听到变化之后就是怎么通知订阅者了，我们需要实现一个消息订阅器，
    // Dep维护一个数组，用来收集订阅者(Watcher)，数据变动触发notify，再调用订阅者的update方法
    var dep = new Dep() // 消息订阅器
    var childObj = observe(val) // 监听子属性

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        // console.log(Dep.target)
        // 由于需要在闭包内添加Watcher,所以通过Dep定义一个全局target,暂存Watcher,添加完删除
        // Dep.target && dep.addDep(Dep.target)
        // 通过dep添加订阅者，就必须要在闭包内操作，所以我们可以在	getter里面动手脚：
        Dep.target && dep.depend()
        return val
        // return data[key] //  Maximum call stack size exceeded
      },
      set: function (newVal) {
        if (val === newVal) return
        console.log('监听到值变化了, val:' + val + ', newVal:' + newVal)
        val = newVal
        // --新的值是object的话，进行监听
        childObj = observe(newVal)
        dep.notify() // 通知所有订阅者
      }
    })
  }

}

// 3.1 创建一个Observer实例
function observe (value, vm) {
  /**
   * 数据监听器 Observer, 对数据对象的所有属性进行监听,
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

// 3.5 消息订阅器，收集订阅者。订阅者应该是 Watcher
function Dep () {
  this.id = uid++
  // 内部维护了一个数组，用来收集订阅者（Watcher）
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

  // 数据变动触发 notify 函数，再调用订阅者的 update 方法
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  },

}

Dep.target = null