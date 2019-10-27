const net = require('net')
const PORT = 3001
const HOST = '127.0.0.1'

// const socket = new net.Socket({})
// socket.connect({
//   port: PORT
// })
// socket.write('Hello World!')

// tcp客户端
// let client = net.createConnection(PORT, HOST)
let client = new net.Socket({}).connect(PORT)

// 建立
client.on('connect', () => {
  console.log('客户端1: 与服务端已建立连接')
})

// 接收数据
client.on('data', data => {
  console.log(`客户端2：收到服务端数据，内容为: ${data}`)
})

// 断开
client.on('close', () => {
  console.log('客户端3：连接断开')
})

// 结束
client.end('Hello, 我是客户端4')



// var net = require('net');
//
// var PORT = 3000;
// var HOST = '127.0.0.1';
//
// // tcp客户端
// var client = net.createConnection(PORT, HOST);
//
// client.on('connect', function(){
//   console.log('客户端：已经与服务端建立连接');
// });
//
// client.on('data', function(data){
//   console.log('客户端：收到服务端数据，内容为{'+ data +'}');
// });
//
// client.on('close', function(data){
//   console.log('客户端：连接断开');
// });
//
// client.end('你好，我是客户端');