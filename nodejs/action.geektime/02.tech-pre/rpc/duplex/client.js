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



// 粘包
// let k = 0
// while (k  < 100)  {
//   writeLessonId()
//   console.log(`${k} ${id}`)
//   k++
// }


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
  if (buffer.length  < 6) {
    return 0
  }
  const bodyLength = buffer.readInt32BE(2)
  return 6 + bodyLength
}




let seq = 0
function encode (data) {
  // 正常情况下，这里应该是使用 protobuf 来encode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接把课程id转buffer发送
  let body = Buffer.alloc(4)
  body.writeInt32BE(LESSON_IDS[data.id])

  // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length, 2)

  // 包头和包体拼起来发送
  const buffer = Buffer.concat([
    header,
    body
  ])

  console.log(`包seq: ${seq} 传输的课程 id 为:${LESSON_IDS[data.id]}`)
  seq++
  return buffer
}

let id
for (let i = 0; i < 100; i++) {
  id = Math.floor(Math.random() * LESSON_IDS.length)
  client.write(encode({ id }))
}