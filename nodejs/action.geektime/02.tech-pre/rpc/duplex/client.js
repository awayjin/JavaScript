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

let k = 0
while (k  < 100)  {
  writeLessonId()
  console.log(`${k} ${id}`)
  k++
}

client.on('data', (buffer) => {
  console.log('\n2. Client 接收数据 str: ', buffer.toString(), ', buffer:', buffer)
  writeLessonId()
})


