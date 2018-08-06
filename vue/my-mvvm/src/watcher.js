/**
 * Created by jinwei on 2018/07/18.
 */
/**
 * 1. \w匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。
 * /[^\w$]/.test(exp) 匹配。 在[]之间表示非，在开头表示开始
 *
 * 2. call, apply, bind的区别
 *
 * 3. hasOwnProperty, 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
 * var obj = { a: 22}; obj.hasOwnProperty('a')
 */
function Watcher(vm, expOrFn, cb) {
  this.vm = vm
  this.expOrFn = expOrFn
  this.cb = cb
  this.depIds = {}

  this.getter = this.parseGetter(expOrFn)

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
    // var value = this.vm[exp]
    var value = this.getter.call(this.vm, this.vm) // 触发getter，添加自己到属性订阅器中
    // console.log('exp:' + exp)
    // console.log(this.vm[exp])
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
    var value = this.get() // 取到最新值
    var oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue) // 执行Compile中绑定的回调，更新视图
    }
  }
}
