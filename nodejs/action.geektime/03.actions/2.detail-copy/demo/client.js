
// easy_sock - 快速开发基于tcp连接的二进制网络协议接口的nodejs模块
const EasySock = require('easy_sock')

// protocol-buffers - Protocol Buffers for Node.js
const protobuf = require('protocol-buffers')
const fs = require('fs')

let messages = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))


let easySock = new EasySock({
  ip: '127.0.0.1',
  port: 3000,
  timeout: 500,
  // 是否全双工通信的
  keepAlive: true
})

// 将需要发送的数据按协议进行二进制编码
easySock.encode = function (data, seq) {
  // 请求包的编码
  const body = messages.ColumnRequest.encode(data)

  const head = Buffer.alloc(8)
  head.writeInt32BE(seq)
  head.writeInt32BE(body, 4)

  return Buffer.concat([head, body])
}

// :将接收到的包进行解码，转换成js可操作的格式
easySock.decode = function (buffer) {
  let seq = buffer.readInt32BE()
  let body = messages.ColumnResponse.decode(buffer.slice(8))

  return {
    result: body,
    seq
  }
}

// 判断当前数据包是否完整\是否粘包
easySock.decode = function (buffer) {
  if (buffer.length < 8) {
    return 0
  }
  const bodyLength = buffer.readInt32BE(4);

  if (buffer.length >= bodyLength + 8) {
    return bodyLength + 8

  } else {
    return 0
  }
}

module.exports = easySock