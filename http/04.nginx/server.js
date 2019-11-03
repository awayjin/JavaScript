const http = require('http')

http.createServer((req, res, next) => {
  console.log(req.headers.host)
  console.log(req.headers.referer)
  console.log(req.url)
  res.writeHead(200)
  res.end('demo')
}).listen(8888)

