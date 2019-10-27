const net = require('net')
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

// socket 一般代表网络通路的写入与取出的代理对象
const socket = new net.Socket({})

socket.connect({
  port: 4000
})

// 单工通信
// socket.write('Hello Buffer. 单工通信')

// 半双工通信
let buffer = Buffer.alloc(4) // 返回一个指定大小的实例
let index = Math.floor(lessonIds.length * Math.random())
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