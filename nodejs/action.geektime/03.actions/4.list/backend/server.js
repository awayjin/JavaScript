const fs = require('fs')
const net = require('net')
const protocolBuffers = require('protocol-buffers')
const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../node/rpc/list.proto`))
// const schemas = protocolBuffers(fs.readFileSync(`${__dirname}/../rpc/detail.proto`))
// 后端模拟数据
const mockData = require('./mockdata/list.js')

const app = net.createServer(function (socket) {
  socket.on('data', buffer => {
    const seq = buffer.readInt32BE()
    // console.log('seq:', seq)
    // console.log('buffer.readInt32BE():', schemas.ListResponse.decode(buffer.slice(8)))
    // console.log('mockData:', mockData[0])
    // console.log('buffer.slice(8):', buffer.slice(8).toString())

    // console.log('\n ------- server.js buffer:', buffer.length)
    // console.log('buffer.readInt32BE:', buffer.readInt32BE())
    // console.log('buffer.readInt32BE(4):', buffer.readInt32BE(4))
    // console.log('buffer.slice(8):', buffer.slice(8))
    // 这应从数据库获取真实数据
    const listRequest = schemas.ListRequest.decode(buffer.slice(8))
    // console.log('listRequest:', listRequest)

    const filtType = listRequest.filtType
    const sortType = listRequest.sortType
    console.log('filtType:', filtType, ', sortType:', sortType)

    const resData = mockData
      .sort((a, b) => {
        if (sortType === 0) { // 上新
          return a.id - b.id
        } else if (sortType === 1) { // 订阅数
          return a.sub_count - b.sub_count
        } else if (sortType === 2) { // 价格
          return a.column_price - b.column_price
        }
      })
      .filter((item) => {
        // return item.type === 3
        if (filtType === 0) {
          return item
        } else {
          return item.type == filtType
        }
      });
    const body = schemas.ListResponse.encode({
      columns: resData
    })
    // console.log('body:', resData)
    const header = Buffer.alloc(8)
    header.writeInt32BE(buffer.readInt32BE())
    header.writeInt32BE(body.length, 4)

    const result = Buffer.concat([header, body])
    socket.write(result)
  })

})

const port = 4003
app.listen(port, () => {
  console.log('Backend list server started at port:', port)
})
