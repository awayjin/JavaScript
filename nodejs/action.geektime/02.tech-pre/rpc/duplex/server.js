let net = require('net')

let server = net.createServer(socket => {
  console.log('1. server: 与客户端已连接')
  socket.on('data', buffer => {
    console.log('2. Server接收数据。buffer str:', buffer.toString(), ', buffer:', buffer)
    socket.write('你好，client, 我来自 server')
  })
})

const port = 4001
server.listen(port, () => {
  console.log(`Server bound, port:${port}`)
})