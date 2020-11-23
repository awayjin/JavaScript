const cluster = require('cluster')
const http = require('http')
const os = require('os')

const numCPUs = os.cpus().length

// console.log(`cluster.isMaster: ${cluster.isMaster}`);
// console.log(`cluster.isWorker: ${cluster.isWorker}`);

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  // cluster.on('exit', (worker, code, singal) => {
  //   console.log(`工作进程 ${worker.process.pid} 已退出`);
  // })
  
} else if (cluster.isWorker) {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello cluster')
  }).listen(8000)

  console.log(`工作进程 ${process.pid} 已经启动`);
}

cluster.on('exit', (worker, code, signal) => {
  console.log(`工作进程 ${worker.process.pid} 已退出`);
});
