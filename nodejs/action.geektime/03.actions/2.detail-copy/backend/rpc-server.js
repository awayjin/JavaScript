const net = require('net')
const fs = require('fs')
const protoBuffers = require('protocol-buffers')
const messages = protoBuffers(fs.readFileSync('../rpc/detail.proto'))

class RPC {
  constructor ({ encodeResponse, decodeRequest, isCompleteRequest }) {

  }

  createServer  () {

  }
}

const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    console.log('buffer:', buffer)
    console.log('buffer.readInt32BE:', buffer.readInt32BE())
    console.log('buffer.readInt32BE(4):', buffer.readInt32BE(4))
    console.log('buffer.slice(8):', buffer.slice(8))
    const columnId = messages.ColumnRequest.decode(buffer.slice(8))
    console.log('messages.ColumnRequest.decode(buffer.slice(8)):', columnId)

  })


})

server.listen(4000)