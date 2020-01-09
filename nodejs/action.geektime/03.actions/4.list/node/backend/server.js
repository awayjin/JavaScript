const fs = require('fs')
const net = require('net')
const protocolBuffers = require('protocol-buffers')
const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/list.proto`))
// const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/detail.proto`))
const mockData = require('./mockdata/list.js')

const body = schemas.ListResponse.encode({
  columns: mockData
})
console.log('body3:', schemas.ListResponse.decode(body))

const app = net.createServer(function (socket) {
  socket.on('data', buffer => {
    const seq = buffer.readInt32BE()
    console.log('seq:', seq)
    // console.log('buffer.readInt32BE():', schemas.ListResponse.decode(buffer.slice(8)))
    // console.log('mockData:', mockData[0])
    // console.log('buffer.slice(8):', buffer.slice(8).toString())

    console.log('\n ------- server.js buffer:', buffer)
    console.log('buffer.readInt32BE:', buffer.readInt32BE())
    console.log('buffer.readInt32BE(4):', buffer.readInt32BE(4))
    console.log('buffer.slice(8):', buffer.slice(8))
    // 这应从数据库获取真实数据
    const listRequest = schemas.ListRequest.decode(buffer.slice(8))
    console.log('listRequest:', listRequest)

    const body = schemas.ListResponse.encode({
      columns: mockData
    })
    // console.log('body:', schemas.ListResponse.decode(body))
    const header = Buffer.alloc(8)
    header.writeInt32BE(buffer.readInt32BE())
    header.writeInt32BE(body.length, 4)

    const result = Buffer.concat([header, body])
    socket.write(result)
  })

})

const port = 4002
app.listen(port, () => {
  console.log('Backend server started at port:' + port)
})
