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
let id = Math.floor(Math.random() * lessonIds.length)
let seq = 0;
function encode(id) {
  // 不停的修改
  let buffer = Buffer.alloc(6) // 扩大 buffer 长度, 把 seq 编进去
  buffer.writeInt16BE(seq++)
  buffer.writeInt32BE(
    lessonIds[id], 2
  )
  return buffer
}



socket.on('data', (buffer) => {
  const seqBuffer = buffer.slice(0, 2)
  const titleBuffer = buffer.slice(2)

  // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
  id = Math.floor(Math.random() * lessonIds.length);

  console.log('seq:', seq, lessonIds[id])
  console.log(seqBuffer.readInt16BE, titleBuffer.toString())


  // 不停的修改
  socket.write(encode(id))
})

// setInterval(() => {
//   socket.write(encode(id))
// }, 50)

// 同时发 100 个包
for(let k = 0 ; k < 100; k++) {
  id = Math.floor(Math.random() * lessonIds.length)
  socket.write(encode(id))
}