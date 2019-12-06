// const EasySock = require('easy_sock')
// const easySock = new EasySock()
const protobuf = require('protocol-buffers')
const fs = require('fs')
const messages = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))

const buf = messages.ColumnRequest.encode({
  columnid: 2
})
console.log(buf)
console.log(messages.ColumnRequest.decode(buf))

// easySock.setConfig({
//   ip : "127.0.0.1",
//   port : 4001,
//   keepAlive : false,
//   timeout : 50	// 0 by default
// })
//
// // 发送的数据协议进行二进制编码
// easySock.encode = function (data, seq) {
//
// }
