const net = require('net')

// const client = net.connect({ port: 4001}, () => {
//   client.write('net 模块客户端')
// })
// 建立连接
const client = net.connect({ port: 4001})

// 单工通信
// client.write('net 模块客户端')
// client.on('data', socket => {
//   console.log('客户端接收数据: toString:', socket.toString(), ', socket:', socket)
// })

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

// 半双工通信
let index
function writeLessonId () {
  index = Math.floor(Math.random() * lessonIds.length)
  let id = lessonIds[index]
  client.write(lessonIds[index])
  console.log('1. 发送的 id:', id)
}
writeLessonId()

// 同时发送会导致粘包
// for (let i = 0; i < 100; i++) {
//   writeLessonId()
// }

client.on('data', (buffer) => {
  console.log('2. 接收服务端数据. toString', buffer.toString(), ', buffer:', buffer)
  writeLessonId()
})
