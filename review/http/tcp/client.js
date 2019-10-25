const net = require('net')

const socket = new net.Socket({})

socket.connect({
  port: 3000
})

socket.write('Hello World!')