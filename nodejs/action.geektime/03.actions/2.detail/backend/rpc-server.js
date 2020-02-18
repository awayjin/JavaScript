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

const server = net.createServer((socket) => {
  // console.log('buffer:', socket)

  socket.on('data', (buffer) => {
    console.log('\n ------- rpc-server.js buffer:', buffer)
    console.log('buffer.readInt32BE:', buffer.readInt32BE())
    console.log('buffer.readInt32BE(4):', buffer.readInt32BE(4))
    console.log('buffer.slice(8):', buffer.slice(8))
    // 这应从数据库获取真实数据
    const columnId = messages.ColumnRequest.decode(buffer.slice(8))
    console.log('messages.ColumnRequest.decode(buffer.slice(8)):', columnId)

    // 假数据
    // const body = messages.ColumnResponse.encode({
    //   column: columnData[0],
    //   recommendColumns: [columnData[1], columnData[2]]
    // })
    const body = messages.ColumnResponse.encode({
      column: columnData[0],
      recommendColumns: [columnData[1], columnData[2]]
    })

    // console.log('body:', messages.ColumnResponse.decode(body))
    const header = Buffer.alloc(8)
    header.writeInt32BE(buffer.readInt32BE())
    header.writeInt32BE(body.length, 4)
    // seq++

    const result = Buffer.concat([
      header,
      body
    ])
    socket.write(result)
  })

})

server.listen(4001)
