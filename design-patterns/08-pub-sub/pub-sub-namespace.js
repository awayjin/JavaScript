// 全局的发布-订阅对象
// 发布-订阅模式通用实现
const event = function () {
  console.log(33)
  let global = this
  let Event
  let _default = 'default'

  Event = function () {
    let _listen
    let _create

    let each = (ary, fn) => {
      let ret
      for (let i = 0, len = ary.length; i < len; i++) {
        let n = ary[i]
        ret = fn.call(n, i, n)
      }
      return ret
    }

    // _listen
    _listen = (key, fn, cache) => {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }

    // _create 命名空间
    _create = (arg) => {
      let namespace = arg || _default
      let cache = {}
      let offlineStack = [] // 离线事件

      let ret = {
        listen (key, fn, last) {
          _listen(key, fn, cache)
        }
      }
    }

    return {
      create: _create,
      trigger () {
        let event = this.create()
        event.trigger.apply(this, arguments)
      }
    }
  }()

  return Event
}()

export default event
