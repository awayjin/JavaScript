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
  port: 4001
})

// 单工通信
// socket.write('Hello Buffer. 单工通信')

// 半双工通信
let index
let seq = 0 // 包序号编入进来
function writeLessonId () {
  console.log(Array(30).join('--'))
  index = Math.floor(Math.random() * lessonIds.length)
  let buffer = Buffer.alloc(6)
  buffer.writeInt16BE(seq)
  buffer.writeInt32BE(lessonIds[index], 2)
  console.log('1. seq:', seq, lessonIds[index])
  seq++
  socket.write(buffer)
  // console.log(buffer.readInt32BE())
}

// 全双工通信
setInterval(writeLessonId, 50)

socket.on('data', (buffer) => {
  console.log('2. id', lessonIds[index], ' ts:', buffer.toString())
  const seqBuffer = buffer.slice(0, 2)
  const titleBuffer = buffer.slice(2)

  console.log('3. seqBuffer:', seqBuffer, 'titleBuffer:', titleBuffer.toString())
  writeLessonId()
})