const fs = require('fs')
const net = require('net')
const protocolBuffers = require('protocol-buffers')
const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/detail.proto`))
const mockData = require('./mockdata/column')

let rpcServer = function () {
  class RPC {
    constructor () {

    }

    createServer () {

    }
  }

  return new RPC()
}

const server = rpcServer()

net.createServer(function (socket) {
  socket.on('data', buffer => {
    const seq = buffer.readInt32BE()
    const body = schemas.ColumnResponse.encode({
      column: mockData[0],
      recommendColumns: [mockData[0]]
    })
    // console.log('body:', schemas.ColumnResponse.decode(body))
    const header = Buffer.alloc(8)
    header.writeInt32BE(buffer.readInt32BE())
    header.writeInt32BE(body.length, 4)

    const result = Buffer.concat([header, body])
    socket.write(result)
  })

}).listen(4001)
