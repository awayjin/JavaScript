const fs = require('fs')
const net = require('net')
const protobuf = require('protocol-buffers')
const schemas = protobuf(
  fs.readFileSync(__dirname + '/../node/list.proto')
)
const columnData = require('./mockdata/list.js')


class RPC {
  constructor ({ encodeResponse, decodeRequest, isCompleteRequest } = {}) {
    this.encodeResponse = encodeResponse
    this.decodeRequest = decodeRequest
    this.isCompleteRequest = isCompleteRequest
  }

  createServer (callback) {
    console.log(333)
    let buffer = null
    const tcpServer = net.createServer(socket => {
      socket.on('data', data => {
        buffer = (buffer && buffer.length > 0)
          // 有遗留数据才做拼接操作
          ? Buffer.concat([buffer, data])
          : data

        console.log(444)

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

          const request = this.decodeRequest(requestBuffer)

          callback(
            // request
            {
              body: request.result,
              socket
            },
            {
              end: (data) => {
              // end (data) {
                const buffer = this.encodeResponse(data, request.seq)
                return socket.write(buffer)
              }
            }
          )

        }
      })
    })

    // return rpcServer
    return {
      listen() {
        tcpServer.listen.apply(tcpServer, arguments)
      }
    }
  }
}

function instanceRPC (protobufRequestSchema, protobufResponseSchema) {
  console.log(221)

  return new RPC({
    isCompleteRequest (buffer) {
      const bodyLength = buffer.readInt32BE(4)

      return bodyLength + 8
    },

    decodeRequest (buffer) {
      const seq = buffer.readInt32BE()

      return {
        seq,
        result: protobufRequestSchema.decode(buffer.slice(8))
      }
    },

    encodeResponse (data, seq) {
      const body = protobufResponseSchema.encode(data)

      const head = Buffer.alloc(8);
      head.writeUInt32BE(seq);
      head.writeUInt32BE(body.length, 4);

      return Buffer.concat([head, body])
    }
  })
}

const server = instanceRPC(schemas.ListRequest, schemas.ListResponse)

const port = 4003
server.createServer((request, response) => {

  console.log(111111111)
  const { filtType, sortType } = request.body

  console.log(request.body)

  response.end({
    columns: columnData
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
  })
}).listen(4003, () => {
  console.log('Server Listening at port:' + port)
})

