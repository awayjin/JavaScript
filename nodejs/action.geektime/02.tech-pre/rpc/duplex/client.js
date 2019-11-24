let net = require('net')

let client = net.createConnection(
  {
    port: 4001
  },
  () => {
    console.log('1. 已连接到服务器')
    client.write('发送数据， 我来自 Client')
  }
)

client.on('data', (buffer) => {
  console.log('2. Client 接收数据 str: ', buffer.toString(), ', buffer:', buffer)
})