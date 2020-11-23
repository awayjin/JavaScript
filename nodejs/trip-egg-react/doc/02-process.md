# Node.js 中进程
- child_process
- cluster
- master 与 cluster 的通信


Node.js 被设计成单线程运行，但这并不意味着你无法利用到 CPU 的多个核心。你可以通过 child_process.fork() API 来生成子进程，并且它被设计成非常易于通信。而建立在同一个接口之上的 cluster 模块允许你在进程之间共享套接字（sockets），以实现核心的负载均衡.

Node.js being designed without threads doesn't mean you can't take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores.

## 子进程-child_process
子进程是一个在 ndoe.js 很重要的功能, 学会了他相当于开启了新世界的大门。常用子进程中执行某些 shell 命令.

child_process 模块提供了衍生子进程的能力。 此功能主要由 child_process.spawn() 函数提供.

```
const { spawn } = require('child_process')

const ls = spawn('ls', ['-a'])

ls.stdout.on('data', (data) => {
  console.log(`stdout data: ${data}`);
})

ls.stderr.on('data', (data) => {
  console.log(`stderr d: ${data}`);
})

ls.on('close', (code) => {
  console.log(`child process exited with code: ${code}`);
})
```

### 几种创建子进程的方式
注意事项：
下面列出来的都是异步创建子进程的方式，每一种方式都有对应的同步版本。
- .exec()、.execFile()、.fork()底层都是通过.spawn()实现的。
- .exec()、execFile()额外提供了回调，当子进程停止的时候执行。

- child_process.fork(): 衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息。

## 进程相关-process(ok)

## 集群-cluster(ok)


利用多 CPU

## 参考
https://github.com/chyingp/nodejs-learning-guide

子进程： http://nodejs.cn/api/child_process.html#child_process_child_process

cluster: http://nodejs.cn/api/cluster.html


深入理解Node.js 中的进程与线程: https://juejin.cn/post/6844903908385488903

video: https://www.bilibili.com/video/av85982999?p=13