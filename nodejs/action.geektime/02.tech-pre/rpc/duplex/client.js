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

  console.log(`1. 包seq: ${seq} 传输的课程 id 为:${LESSON_IDS[data.id]}`)
  seq++
  return buffer
}

let id
// 发送
for (let i = 0; i < 3; i++) {
  id = Math.floor(Math.random() * LESSON_IDS.length)
  client.write(encode({ id }))
}

// 接收
client.on('data', buffer => {
  // let seq = buffer.slice(0, 2)
  // let title = buffer.slice(6).readInt32BE()
  // console.log('\n 2.seq:', seq, ', title:', title)

  let header = buffer.slice(0, 6)
  seq = header.readInt16BE()
  let body = buffer.slice(6)
  console.log('\n 2.seq:', seq, 'buffer.length', buffer.length, ', body:', body.toString())

  // console.log('\n 2.buffer:', buffer.length, ', toString:', buffer.toString())
})