/**
 * Created by jinwei on 2018/07/18.
 */
/**
 *
 *  > Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，
 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

 * 1. \w匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。
 * /[^\w$]/.test(exp) 匹配。 在[]之间表示非，在开头表示开始
 *
 * 2. call, apply, bind的区别
 *
 * 3. hasOwnProperty, 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
 * var obj = { a: 22}; obj.hasOwnProperty('a')
 */



/**
 *
 *
 > Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，
 内部采用Object.defineProperty的getter和setter来实现。

 > Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，
 根据指令模板替换数据，以及绑定相应的更新函数。

 > Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，
 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

 > Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），
 数据变动触发 notify 函数，再调用订阅者的 update 方法。
 *
 */

function Watcher(vm, expOrFn, cb) {
  this.vm = vm
  this.expOrFn = expOrFn
  this.cb = cb
  this.depIds = {}

  // this.getter = this.parseGetter(expOrFn)

  // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
  this.value = this.get(expOrFn)
}

Watcher.prototype = {
  parseGetter: function (exp) {
    // if (/[^\w$]/.test(exp)) return
    // var exps = exp.split('.')
    return function (obj) {
      // for (var i = 0, len = exps.length; i < len; i++) {
      //   if (!obj) return
      //   obj = obj[exps[i]]
      // }
      // return obj
      return obj[exp]
    }
  },
  get: function (exp) {
    Dep.target = this // 将当前订阅者指向自己
    var value = this.vm[exp]
    // var value = this.getter.call(this.vm, this.vm) // 触发getter，添加自己到属性订阅器中
    // console.log('exp:' + exp)
    Dep.target = null // 添加完毕，重置
    return value
  },
  addDep: function (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },
  update: function () {
    this.run()
  },
  run: function () {
    var value = this.get(this.expOrFn) // 取到最新值
    var oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue) // 执行Compile中绑定的回调，更新视图
    }
  }
}
