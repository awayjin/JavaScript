const fs = require('fs')
const net = require('net')
const protocolBuffers = require('protocol-buffers')
const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/list.proto`))
// const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/detail.proto`))
const mockData = require('./mockdata/list.js')

const body = schemas.ListResponse.encode({
  columns: [mockData[0]]
})
console.log('body3:', schemas.ListResponse.decode(body))

net.createServer(function (socket) {
  socket.on('data', buffer => {
    const seq = buffer.readInt32BE()
    console.log('seq:', seq)
    // console.log('mockData:', mockData[0])
    const body = schemas.ListResponse.encode({
      columns: [mockData[0]]
    })
    // console.log('body:', schemas.ListResponse.decode(body))
    const header = Buffer.alloc(8)
    header.writeInt32BE(buffer.readInt32BE())
    header.writeInt32BE(body.length, 4)

    const result = Buffer.concat([header, body])
    socket.write(result)
  })

}).listen(4002)
