const net = require('net');

// 创建socket
const socket = new net.Socket({});

// 连接服务器
socket.connect({
  host: '127.0.0.1',
  port: 4000
});


let lessonIds = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

// 单工通信通路
// socket.write('Good morning net.Socket....')

// 半双工通信
let buffer = Buffer.alloc(4)
let index = Math.floor(Math.random() * lessonIds.length)
buffer.writeInt32BE(
  lessonIds[index]
)
socket.write(buffer)


socket.on('data', (buffer) => {
  console.log('buffer id:', lessonIds[index], buffer.toString())

  // 不停的修改
  buffer = Buffer.alloc(4)
  index = Math.floor(Math.random() * lessonIds.length)
  buffer.writeInt32BE(
    lessonIds[index]
  )
  socket.write(buffer)
})