const connect = require('connect')
const app = connect()
const zlib = require('zlib')

function logger (req, res, next) {
  console.log('logger 中间件 %s %s', req.method, req.url)
  next() // 调用 next
}



// 这个中间件完成了 HTTP
// 响应，再也不需要把控制权交还给分派器了
function hello (req, res) {
  // console.log('req.headers:', req.headers)
  // res.setHeader('Content-Type', 'text/plain')
  res.writeHead(200, {
    'content-type': 'text/html',
    // 开启 gzip 压缩, 文本小许多
    'content-encoding': 'gzip'
  })
  let str = 'Hello Compose.'
  let i = 0
  while (i < 10) {
    str += str + i;
    i++
  }
  // res.end(str)
  res.end(zlib.gzipSync(str))
}

// 组合中间件
app.use(logger)
app.use(hello)
app.listen(3001)
