const net = require('net')

const server = net.createServer(function (socket) {
  // 每次客户端连接都会新建一个 socket
  socket.on('data', buffer => {
    console.log('服务端接收到数据, toString:', buffer.toString(), ', buffer:', buffer)
  })

  socket.on('data', () => {
    socket.end('服务端发送的数据.')
  })
})

server.listen(4001)