const net = require('net')
const fs = require('fs')
const protoBuffers = require('protocol-buffers')
const messages = protoBuffers(fs.readFileSync('../rpc/detail.proto'))

// 假数据
const columnData = require('./mockdata/column')


class RPC {
  constructor ({ encodeResponse, decodeRequest, isCompleteRequest }) {

  }

  createServer  () {

  }
}

let seq = 0
const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    console.log('buffer:', buffer)
    console.log('buffer.readInt32BE:', buffer.readInt32BE())
    console.log('buffer.readInt32BE(4):', buffer.readInt32BE(4))
    console.log('buffer.slice(8):', buffer.slice(8))
    const columnId = messages.ColumnRequest.decode(buffer.slice(8))
    console.log('messages.ColumnRequest.decode(buffer.slice(8)):', columnId)

    const body = messages.Column.encode(columnData[0])
    const header = Buffer.alloc(8)

    header.writeInt32BE(seq)
    header.writeInt32BE(body.length, 4)
    seq++

    const result = Buffer.concat([
      header,
      body
    ])
    socket.write(result)
  })

})

function encodeResponse () {

}

server.listen(4000)