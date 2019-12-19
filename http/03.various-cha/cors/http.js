const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/') {
    res.end('console.log("script, lint, img 标签没有跨域限制.")')
  } else if (url === '/ajax') {
    res.writeHead(200, {
      // 允许跨域
      'access-control-allow-origin': 'http://localhost:5000'
    })
    // console.log('req:', req.headers)
    res.end(`http, ${url}`)
  }
})

const port = 5001
server.listen(port, () => {
  console.log(`App started http://localhost:${port}`)
})
