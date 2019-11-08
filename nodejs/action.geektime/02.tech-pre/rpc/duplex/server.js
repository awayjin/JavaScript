let net = require('net')

net.createServer(function (socket) {
  socket.on('data', (buffer) => {
    console.log('buffer:', buffer, ', buffer.toString():', buffer.toString())
  })
}).listen(4001)
