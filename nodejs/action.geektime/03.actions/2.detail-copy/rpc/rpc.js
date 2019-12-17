// easy_sock帮你快速开发基于tcp协议的接口，
// 快速打通nodejs跟其他私有协议server的交互。
const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')
const messages = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))

// const buf = messages.ColumnRequest.encode({
//   columnid: 12
// })
// console.log(buf)
// console.log(messages.ColumnRequest.decode(buf))

const easySock = new EasySock()
easySock.setConfig({
  ip: "127.0.0.1",
  port: 4002,
  keepAlive: true,
  timeout: 500	// 0 by default
})

// let easySock = new EasySock({
//   ip: '127.0.0.1',
//   port: 4002,
//   timeout: 500,
//   // 是否全双工通信的
//   keepAlive: true
// })

// 发送的数据协议进行二进制编码
easySock.encode = function (data, seq) {
  // 请求包的编码
  const body = messages.ColumnRequest.encode(data)
  console.log('data:', data)
  console.log('seq:', seq)
  // 请求体的编码
  const header = Buffer.alloc(8)
  header.writeInt32BE(seq)
  header.writeInt32BE(body.length, 4)

  return Buffer.concat([header, body])
}

// 将接收到的包进行解码，转换成js可操作的格式
easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE()
  const body = messages.ColumnResponse.decode(buffer.slice(8))

  return {
    seq,
    result: body
  }
}

// 判断当前数据包是否完整
easySock.isReceiveComplete = function(buffer) {
  if (buffer.length  < 8) {
    return 0
  }
  console.log('buffer::::', buffer)
  let bodyLength = buffer.readInt32BE(4)
  console.log('bodyLength::, ', bodyLength)
  return 8 + bodyLength
}


easySock.write({
  columnid: 33
}, (err, data) => {
  console.log('err:', err)
  console.log('data:', data)
})
