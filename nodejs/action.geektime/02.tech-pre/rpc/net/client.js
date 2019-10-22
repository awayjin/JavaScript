const net = require('net');

// 创建socket
const socket = new net.Socket({});

// 连接服务器
socket.connect({
  host: '127.0.0.1',
  port: 4000
});


// 单工通信通路
socket.write('Good morning net.Socket....')