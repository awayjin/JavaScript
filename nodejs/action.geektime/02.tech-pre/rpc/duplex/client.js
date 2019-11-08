//  client.js
let net = require('net')
let socket = new net.Socket()
socket.connect({ port: 4001 })
socket.write('Hello Buffer. 单工通信')
// let socket = net.connect({ port: 4001 }, (data) => {
//   socket.write('Hello Buffer. 单工通信')
// })
