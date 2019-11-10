
// easy_sock - 快速开发基于tcp连接的二进制网络协议接口的nodejs模块
const EasySock = require('easy_sock')

// protocol-buffers - Protocol Buffers for Node.js
const protobuf = require('protocol-buffers')
const fs = require('fs')

let messages = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))


// let demo = protobuf(fs.readFileSync(`${__dirname}/detail.proto`, 'utf-8'))
// let buf = demo.ColumnRequest.encode({
//     columnid: 24
// })
// console.log('messages:', demo.ColumnRequest.decode(buf))

let easySock = new EasySock({
    ip: '127.0.0.1',
    port: 4000,
    timeout: 500,
    // 是否全双工通信的
    keepAlive: true
})

// 将需要发送的数据按协议进行二进制编码
easySock.encode = function (data, seq) {
    // 请求包的编码
    const body = messages.ColumnRequest.encode(data)
    console.log('data :', data) //  { columnid: 24 }
    console.log('data 编码:', body) // <Buffer 08 18>
    console.log('data 编码 length:', body.length) // <Buffer 08 18>
    console.log('seq:', seq) // 1
    console.log('body 解码:', messages.ColumnRequest.decode(body)) // { columnid: 24 }

    const head = Buffer.alloc(8)
    head.writeInt32BE(seq)
    head.writeInt32BE(body.length, 4) // ?

    return Buffer.concat([head, body])
}

// :将接收到的包进行解码，转换成js可操作的格式
easySock.decode = function(buffer) {
    const seq = buffer.readInt32BE();
    const body = messages.ColumnResponse.decode(buffer.slice(8));

    console.log('decode seq:', seq)
    // console.log('decode body:', body)
    console.log('decode buffer:', buffer)

    return {
        result: body,
        seq
    }
}

// 判断当前数据包是否完整
easySock.isReceiveComplete = function(buffer) {
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


module.exports = easySock;