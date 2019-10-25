const net = require('net')

const server = net.createServer(function (socket) {
  socket.on('data', buffer => {
    console.log(buffer, ', toString:', buffer.toString())
  })
})

server.listen(3000)