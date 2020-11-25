# cluster 集群

单个 Node.js 实例运行在单个线程中. 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。

cluster 模块可以创建共享服务器端口的子进程。

在服务端编程中，通常会创建多个node实例来处理客户端的请求，以此提升系统的吞吐率。对这样多个node实例，我们称之为cluster（集群)。

> 一般使用单位时间内服务器处理的请求数来描述其并发处理能力。称之为吞吐率（Throughput），单位是 “req/s”。吞吐率特指 Web 服务器单位时间内处理的请求数

集群有以下两种常见的实现方案，而node自带的cluster模块，采用了方案二:

 - 方案一：多个node实例+多个端口
   集群内的node实例，各自监听不同的端口，再由反向代理实现请求到多个端口的分发。
   - 优点：实现简单，各实例相对独立，这对服务稳定性有好处。
   - 缺点：增加端口占用，进程之间通信比较麻烦。

- 方案二：主进程向子进程转发请求
   集群内，创建一个主进程(master)，以及若干个子进程(worker)。由master监听客户端连接请求，并根据特定的策略，转发给worker。
   - 优点：通常只占用一个端口，通信相对简单，转发策略更灵活。
   - 缺点：实现相对复杂，对主进程的稳定性要求较高。 
 

 ## 实例
 在cluster模块中，主进程称为master，子进程称为worker.

- cluster.isMaster 进程是主进程，则为 true
- cluster.isWorker 该进程不是主进程，则为 true
- cluster.fork() 衍生出一个新的工作进程。
- process.pid 属性返回进程的 PID

```
const cluster = require('cluster')
const http = require('http')
const os = require('os')

const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else if (cluster.isWorker) {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello cluster')
  }).listen(8000)

  console.log(`工作进程 ${process.pid} 已经启动`);
}

```

## 参考
github cluster:
https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/cluster.md

子进程： http://nodejs.cn/api/child_process.html#child_process_child_process

cluster: http://nodejs.cn/api/cluster.html


深入理解Node.js 中的进程与线程: https://juejin.cn/post/6844903908385488903

video: https://www.bilibili.com/video/av85982999?p=13


blog: https://github.com/koala-coding/goodBlog