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

  setTimeout(() => {
    // console.log(window.location.href)
    const result = fs.readFileSync(__dirname + '/source/index.html')
    leak.push(result)
    res.end(result)
  }, 50)

})


const port = 3000
if (cluster.isMaster) {
  // for (let i = 0; i < os.cpus().length / 2; i++) {
  for (let i = 0; i < 1; i++) {
    cluster.fork()
    console.log('fork')
  }

  // 某个子进程挂了，重启
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork()
    }, 6000)
  })

} else {
  console.log('Listening at port:', port)


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
    console.log(process.memoryUsage().rss > 73400320)
    // 70 M
    if (process.memoryUsage().rss > 73400320) {
      console.log('超过 70M 了， ', process.memoryUsage().rss)
      process.exit(1)
    }
  }, 5000)

  server.listen(port)
}


