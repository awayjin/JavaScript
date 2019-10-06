// 全局的发布-订阅对象
// 发布-订阅模式通用实现
const event = function () {
  let clientList = {} // 缓存列表
  let listen
  let trigger
  let remove

  // 添加订阅者
  listen = (key, fn) => {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    if (!clientList[key]) {
      clientList[key] = []
    }

    // 订阅的消息添加进缓存列表
    clientList[key].push(fn)
  }

  // 发布
  // trigger = () => { // arguments 指向上级函数的 arguments
  trigger = function () {
    // 取出消息类型
    let key = Array.prototype.shift.call(arguments)
    // 取出消息对应的回调函数
    let fns = clientList[key]

    // 如果没有订阅消息则返回
    if (!fns || fns.length === 0) {
      return false
    }


    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
    // for (let i = 0; i < fns.length; i++) {
    //   fns[i].apply(this, arguments)
    // }
  }

  // 取消订阅事件
  remove = (key, fn) => {
    let fns = clientList[key]

    if (!fns) {
      return false
    }

    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
      fns && (fns.length = 0)
    } else {
      // 反向遍历订阅的回调函数列表
      for (let len = fns.length; len >= 0; len--) {
        let _fn = fns[len]
        if (_fn === fn) {
          // 删除订阅者的回调
          fns.splice(len, 1)
        }
      }
    }
  }

  return {
    clientList,
    listen,
    trigger,
    remove
  }
}()

export default event


// // 发布-订阅模式通用实现
// const event = {
//   // 缓存列表
//   clientList: [],
//
//   // 添加订阅者
//   listen (key, fn) {
//     // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
//     if (!this.clientList[key]) {
//       this.clientList[key] = []
//     }
//
//     // 订阅的消息添加进缓存列表
//     this.clientList[key].push(fn)
//   },
//
//   // 发布消息
//   trigger () {
//     // 取出消息类型
//     let key = Array.prototype.shift.call(arguments)
//     // 取出消息对应的回调函数
//     let fns = this.clientList[key]
//
//     // 如果没有订阅消息则返回
//     if (!fns || fns.length === 0) {
//       return false
//     }
//
//     for (let i = 0, fn; fn = fns[i++];) {
//       fn.apply(this, arguments)
//     }
//   },
//
//   // 取消订阅事件
//   remove (key, fn) {
//     let fns = this.clientList[key]
//
//     if (!fns) {
//       return false
//     }
//
//
//     if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
//       fns && (fns.length = 0)
//     } else {
//       for (let len = fns.length; len >= 0; len--) { // 反向遍历订阅的回调函数列表
//         let _fn = fns[len]
//         if (_fn === fn) {
//           fns.splice(len, 1) // 删除订阅者的回调
//         }
//       }
//       // for (let i = 0; i < fns.length; i++) {
//       //   let _fn = fns[i]
//       //   if (_fn === fn) {
//       //     fns.splice(i, 1)
//       //   }
//       // }
//     }
//
//   }
// }
//
// export default event