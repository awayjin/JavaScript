const os = require('os')
const cluster = require('cluster')
const http = require('http')

const cpus = os.cpus().length;

console.log('cpus', cpus)

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 衍生工作进程
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  // 工作进程可以共享任何 tcp 连接
  // 这里我们共享的是一个 http 服务
  http.createServer((req, res) => {
    res.write('你好 hello')
  }).listen(3000)

  console.log(`工作进程 ${process.pid} 已经启动`)
}