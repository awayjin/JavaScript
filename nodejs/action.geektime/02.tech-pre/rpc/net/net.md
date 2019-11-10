## Node.js 数据通信, Net 模块
关于 NodeJS 的数据通信，最基础的两个模块是 NET 和 HTTP，前者是基于 TCP 的封装，后者本质还是 TCP 层，只不过做了比较多的数据封装，我们视之为更高层。

管道（pipe）.

## Net
net 模块用于创建基于流的 TCP 服务器与客户端（net.createConnection()）。

http.Server继承了net.Server，此外，http客户端与http服务端的通信均依赖于socket（net.Socket）

net模块主要包含两部分:
- net.Server：TCP server，内部通过socket来实现与客户端的通信。
- net.Socket：tcp/本地 socket的node版实现，它实现了全双工的stream接口。

## 基于事件
NodeJS 的 EventEmitter 模块。这个模块就是一个事件中心.NET 模块是继承 EventEmitter 的.

```javascript
class EventEmitter {
  constructor () {
    this._events = {}
  }
  // on 监听事件
  on (event, cb) {
    const arr = this._events[event] || []
    arr.push(cb)
    this._events[event] = arr
  }
  // emit 触发事件
  emit (event, ...args) {
    const callbacks = this._events[event]
    if (callbacks) {
      callbacks.map(event => event.call(this, ...args))
    }
  }
}
```

### 文章参考
-  [net 模块,数据通信](https://www.cnblogs.com/hustskyking/archive/2014/04/22/nodejs-net-module.html)
- [Node.js 学习](https://github.com/chyingp/nodejs-learning-guide)