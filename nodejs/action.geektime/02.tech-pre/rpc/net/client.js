const net = require('net')

// const client = net.connect({ port: 4001}, () => {
//   client.write('net 模块客户端')
// })
const client = net.connect({ port: 4001})
client.write('net 模块客户端')

client.on('data', socket => {
  console.log('客户端接收数据: toString:', socket.toString(), ', socket:', socket)
})