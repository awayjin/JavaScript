
## 12. RPC 调用

Remote Procedure Call（远程过程调用）

和 Ajax 有什么相同点?
- 都是两个计算机之间的网络通信
- 需要双方约定一个数据格式

和 Ajax 有什么不同点?
- 不一定使用 DNS 作为寻址服务
- 应用层协议一般不使用 HTTP
- 基于 TCP 或 UDP 协议

区别1：Ajax 寻址/负载均衡
- Ajax：使用 DNS 进行寻址, 计算机通讯是用 IP 地址的

RPC 寻址/负载均衡
- RPC：使用特有服务进行寻址。

区别2：TCP 通信方式
- 单工通信，只能单向的发包。
- 半双工通信，同一时间内只能单向的发包，要等到完全后，再向另一方发包。也可以理解为轮番单工通信。
- 全双工通信，比较自由的通信方式。实现难度和实现成本。

区别3：二进制协议
- 更小的数据包体积
- 更快的编解码速率。 因为二进制协议更加接近计算机协议的形式，而文本协议是更适合人的理解。

RPC 二进制流[0001 0000 1111 1100], 不同的字段代表不同的位数，RPC 通信一般是服务端到服务端

Http 协议很简单，是一个文本协议。一般就是 html 或 json(key: value)

寻址/负载均衡一般是运维来消化，多路复用和二进制协议一般需要 BFF 层消化。


## 13. Node.js Buffer 编解码二进制数据包

Buffer是node的核心模块，开发者可以利用它来处理二进制数据，比如文件流的读写、网络请求数据的处理等。

Buffer 类，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。
 
 常用方法:
 - Buffer.from 从现有的数据结构创建 字符串、数字数组
 - Buffer.alloc

LE-BE, 大小端问题 - 几个 Byte 里，高位与低位的编排顺序不同。

处理方法与 string 接近。


### protocol-buffers
protocol-buffers 是Google研发的与语言无关，与平台无关的可扩展机制，用于对结构化数据进行序列化（例如XML），但更小，更快，更简单。


Protocol Buffer
- Google 研发的二进制协议编解码库
- 通过协议文件控制 Buffer 的格式。 更直观，更好维护，更便于合作

```javascript
const fs = require('fs')
const protobuf = require('protocol-buffers')

const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))

console.log(schema)

const buf = schema.Column.encode({
  id: 1,
  name: 'Node.js',
  price: 98.4
})
console.log('解码：', schema.Column.decode(buf))

```

## 14. Node.js net 搭建多路复用的 RPC 通道
多路复用就是在一个通信通路（tcp连接）上多次进行通信，减少建立连接的消耗。所以最好要求通信通路支持全双工通信

- 单工/半双工的通信通道搭建
时序问题。同一时间内只有一个方向通信。不能交叉。

rpc和ajax就是差不多的东西，ajax的底层、http1.1的底层也就是半双工通信。

Node.js net 模块
- 全双工的通信通道搭建
  - 关键在于应用层协议需要有标记包号的字段
  - 处理以下情况，需要有标记包长的字段。粘包、不完整包
  - 错误处理
  
seq 包序号

Socket 代表网络通路的写入与取出的代理对象

一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
, 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信

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