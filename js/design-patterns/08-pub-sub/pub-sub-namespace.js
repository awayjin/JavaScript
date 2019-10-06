// 全局的发布-订阅对象
// 发布-订阅模式通用实现
const Event = function () {
  console.log(33)
  let global = this
  let Event
  let _default = 'default'

  Event = function () {
    let _listen
    let _create
    let namespaceCache = {}

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
          if (offlineStack === null) {
            return false
          }

          if (last === 'last') {

          } else {
            each(offlineStack, function () {
              this()
            })
          }

          offlineStack = null
        }
      }

      return namespace ?
        ( namespaceCache[ namespace ] ? namespaceCache[ namespace ] :
          namespaceCache[ namespace ] = ret )
        : ret;
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

// 先发布再订阅
Event.trigger('click', 33, 44, 55)
Event.listen('click', (a, ...b) => {
  console.log('先发布再订阅, a:', a)
  console.log('先发布再订阅, 剩余参数: ...b:', b)
})

export default Event
