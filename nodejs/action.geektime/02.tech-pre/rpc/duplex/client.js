let net = require('net')

let client = net.createConnection(
  {
    port: 4001
  },
  () => {
    console.log('1. 已连接到服务器')
    // client.write('发送数据， 我来自 Client')
  }
)

const LESSON_IDS = [
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


let id = ''
let seq = 0
function writeLessonId () {
  let index = Math.floor(Math.random() * LESSON_IDS.length)
  id = LESSON_IDS[index]

  let buffer = Buffer.alloc(6)
  buffer.writeInt16BE(seq)
  buffer.writeInt32BE(id, 2)
  // let title = Buffer.from(id)

  client.write(buffer)
  // client.write(id)
  seq++
}

// 粘包
let k = 0
while (k  < 100)  {
  writeLessonId()
  console.log(`${k} ${id}`)
  k++
}


let oldBuffer = null
client.on('data', (buffer) => {
  console.log('\n2. Client 接收数据 str: ', buffer.slice(0, 2), ', buffer:', buffer.slice(2).toString())
  // 把上一次data事件使用残余的buffer接上来
  if (oldBuffer) {
    Buffer.concat([
      oldBuffer,
      buffer
    ])
  }

  let completeLength = 0
  // 只要还存在可以解成完整包的包长
  while (completeLength = checkComplete(buffer)) {

  }

  oldBuffer = buffer
  // writeLessonId()
})


/**
 * 检查一段buffer是不是一个完整的数据包。
 * 具体逻辑是：判断header的bodyLength字段，看看这段buffer是不是长于header和body的总长
 * 如果是，则返回这个包长，意味着这个请求包是完整的。
 * 如果不是，则返回0，意味着包还没接收完
 * @param {} buffer
 */
function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(2);
  return 6 + bodyLength
}