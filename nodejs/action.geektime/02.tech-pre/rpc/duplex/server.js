let net = require('net')

// 假数据
let LESSON_DATA = {
    136797: "01 | 课程介绍",
    136798: "02 | 内容综述",
    136799: "03 | Node.js是什么？",
    136800: "04 | Node.js可以用来做什么？",
    136801: "05 | 课程实战项目介绍",
    136803: "06 | 什么是技术预研？",
    136804: "07 | Node.js开发环境安装",
    136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136807: "09 | 模块：CommonJS规范",
    136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
    136809: "11 | 模块：npm",
    141994: "12 | 模块：Node.js内置模块",
    143517: "13 | 异步：非阻塞I/O",
    143557: "14 | 异步：异步编程之callback",
    143564: "15 | 异步：事件循环",
    143644: "16 | 异步：异步编程之Promise",
    146470: "17 | 异步：异步编程之async/await",
    146569: "18 | HTTP：什么是HTTP服务器？",
    146582: "19 | HTTP：简单实现一个HTTP服务器"
  }

let server = net.createServer(socket => {
  console.log('1. server: 与客户端已连接')
  socket.on('data', buffer => {
    // console.log('\n2. Server接收数据。buffer str:', buffer.toString(), ', buffer:', buffer)
    let id = buffer.toString()
    let lesson = LESSON_DATA[id]
    // console.log('3. ', id, LESSON_DATA[buffer.toString()])

    let seq = buffer.slice(0, 2)
    let title = buffer.slice(2)
    console.log('3. seq:', seq, ', title', title.toString())

    setTimeout(() => {
      // socket.write(lesson)
    }, 7000)
    // socket.write('你好，client, 我来自 server')
  })
})

const port = 4001
server.listen(port, () => {
  console.log(`Server bound, port:${port}`)
})


