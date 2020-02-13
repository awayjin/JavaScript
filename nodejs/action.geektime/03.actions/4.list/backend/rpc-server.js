const net = require('net')
const fs = require('fs')
const protocolBuf = require('protocol-buffers')
const schemas = protocolBuf(fs.readFileSync(__dirname + '/../node/list.proto'))
const mockData = require('./mockdata/list.js')

class RPC {
  constructor ({ d, b = 22 } = {}) {
    this.d = d
    this.b = b
  }

  encodeResponse (data, seq) {
    const body = schemas.ListResponse.encode(data)

    const head = Buffer.alloc(8);
    head.writeUInt32BE(seq);
    head.writeUInt32BE(body.length, 4);

    return Buffer.concat([head, body])
  }


  decodeRequest (buffer) {
    const seq = buffer.readInt32BE()

    return {
      seq,
      // result: protobufRequestSchema.decode(buffer.slice(8))
      result: schemas.ListRequest.decode(buffer.slice(8))
    }
  }

  createServer (callback) {
    let buffer = null

    const rpcServer = net.createServer(socket => {

      socket.on('data', data => {
        console.log('data.length:', data.length)

        const listRequest = schemas.ListRequest.decode(data.slice(8))
        console.log('listRequest:', listRequest)
        const filtType = listRequest.filtType
        const sortType = listRequest.sortType
        let resData = mockData
          .sort((a, b) => {
            if (sortType === 0) { // 上新
              return b.id - a.id
            } else if (sortType === 1) { // 订阅数
              return b.sub_count - a.sub_count
            } else if (sortType === 2) { // 价格
              return b.column_price - a.column_price
            }
          })
          .filter(item => {
            if (filtType === 0) {
              return item
            } else {
              return item.type === filtType
            }
          })


        buffer = (buffer && buffer.length > 0)
          // 有遗留数据才做拼接操作
          ? Buffer.concat([buffer, data])
          : data

        let checkLength
        while (buffer && (checkLength = this.isCompleteRequest(buffer))) {

          let requestBuffer = null
          if (checkLength === buffer.length) {
            requestBuffer = buffer
            buffer = null
          } else {
            // 还有剩余包
            requestBuffer = buffer.slice(0, checkLength)
            buffer = buffer.slice(checkLength)
          }

          //           // const request = this.decodeRequest(requestBuffer)
          // const result = Buffer.concat([head, body])
          const result = this.encodeResponse({ columns: mockData }, requestBuffer.readInt32BE())
          // console.log('buffer3:', buffer3)
          socket.write(result)
        }

        // while (buffer && (checkLength = this.isCompletedRequest(buffer))) {
        //
        //   let requestBuffer = null
        //   if (checkLength === buffer.length) {
        //     console.log(111)
        //     requestBuffer = buffer
        //     buffer = null
        //   } else {
        //     console.log(2222)
        //     requestBuffer = buffer.slice(0, checkLength)
        //     buffer = buffer.slice(0, checkLength)
        //   }
        //
        //   const body = schemas.ListResponse.encode({ columns: resData })
        //
        //   // const body = protobufResponseSchema.encode(data);
        //   const seq = requestBuffer.readInt32BE()
        //   const head = Buffer.alloc(8);
        //   head.writeUInt32BE(seq);
        //   head.writeUInt32BE(body.length, 4);
        //
        //   socket.write(Buffer.concat([head, body]))
        //
        //   // const header = Buffer.alloc(8)
        //   // const seq = data.readInt32BE()
        //   // header.writeInt32BE(seq)
        //   // header.writeInt32BE(body.length, 4)
        //   // socket.write(Buffer.concat([header, body]))
        // }


      })
    })

    return rpcServer
  }

  // 判断请求包是否完成
  isCompleteRequest (data) {
    const bodyLength = data.readInt32BE(4)

    return 8 + bodyLength
  }
}



const rpc = new RPC()
rpc.createServer().listen(4003)



module.exports = RPC
