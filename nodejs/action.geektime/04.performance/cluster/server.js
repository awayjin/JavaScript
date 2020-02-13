const http = require('http')
const fs = require('fs')
const cluster = require('cluster')
const os = require('os')

const leak = []
const server = http.createServer((req, res) => {
  //获取文件类型
  var type = req.url.substr(req.url.length - 4, req.url.length);

  //获取资源路径
  var realpath = __dirname + '/source/';

  // console.log('type:', type)
  // console.log('realpath:', realpath)
  //加载需要显示的图片资源
  if (type == '.png') {
    res.writeHead(200, { 'Content-Type': 'text/'+type });
    res.end(fs.readFileSync(realpath + 'static/img.png'));
  }

  res.writeHead(200, { 'content-type': 'text/html'})

  setTimeout(() => {
    // console.log(window.location.href)
    const result = fs.readFileSync(__dirname + '/source/index.html')
    leak.push(result)
    // 挂起3秒
    const start = +new Date()
    while (+new Date - start <= 5000) {}
    // while (true) {}
    res.end(result)
  }, 50)

})


const port = 3000
if (cluster.isMaster) {
  // for (let i = 0; i < os.cpus().length / 2; i++) {
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork()
    console.log('fork')

    // 防止进入僵尸进程
    let missedPing = 0 // 错过心跳做统计
    let inter = setInterval(() => {
      console.log('ping')
      worker.send('ping')
      missedPing++

      // 错过3次心跳，已经死掉的进程
      if (missedPing >= 3) {
        clearInterval(inter)
        process.kill(worker.process.pid) // 杀掉进程
        // worker.exit(1) // 退出进程
      }
    }, 3000)

    worker.on('message', (msg) => {
      console.log('pong')
      if (msg === 'pong') {
        missedPing--
      }
    })
  }

  // 某个子进程挂了，重启
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork()
    }, 6000)
  })

} else {


  process.on('message', (str) => {
    if (str === 'ping') {
      process.send('pong')
    }
  })

  // setTimeout(()=> {
  //   // 致命错误，因为 node 里没有 window
  //   console.log(window.location)
  // }, 2000)

  // 当进程出现会崩溃的错误, 监听 uncaughtException 事件不会自动退出
  process.on('uncaughtException', (err, origin) => {
    // 错误上报
    console.log('process.stderr:', process.stderr.fd)
    console.log('err:', err)
    console.log('origin:', origin)

    process.exit(1) // 错误退出
  })

  // 监控内存泄漏
  setInterval(() => {
    console.log('内存使用大小 process.memoryUsage().rss', process.memoryUsage().rss)
    console.log(process.memoryUsage().rss > 734003200)
    // 70 M
    if (process.memoryUsage().rss > 734003200) {
      console.log('超过 70M 了， ', process.memoryUsage().rss)
      process.exit(1)
    }
  }, 3000)


  server.listen(port, () => {
    console.log('Listening at port:', port)
    // 在子进程内，制造一个假死情况
    // while (true) {}
  })

}




