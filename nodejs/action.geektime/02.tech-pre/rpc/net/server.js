const net = require('net')

// socket 一般代表网络通路的写入与取出的代理对象
const server = net.createServer((socket) => {
  // socket.write
  socket.on('data', (buffer) => {
    console.log(buffer, buffer.toString())
  })
})

server.listen(4000)



