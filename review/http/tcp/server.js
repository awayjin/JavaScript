const net = require('net')
const PORT = 3001
const HOST = '127.0.0.1'

// 创建 TCP 服务端
let server = net.createServer(function (socket) {
  console.log('服务端1：收到来自客户端的请求')

  // data - 当接收到数据时触发
  socket.on('data', (data) => {
    console.log(`服务端2：收到客户端数据，内容为:${data}`)

    // 给客户端返回数据
    socket.write('你好，我是服务端')
  })

  // close
  socket.on('close', () => {
    console.log('服务端3：客户端连接断开')
  })

  // socket.on('data', buffer => {
  //   console.log(buffer, ', toString:', buffer.toString())
  // })
})


server.listen(PORT, HOST, () => {
  console.log('服务端4：开始监听来自客户端的请求')
})