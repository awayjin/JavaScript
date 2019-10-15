const http = require('http')
const fs = require('fs')

const server = http.createServer(function (request, response) {
  // 处理 ICON
  if (request.url === '/favicon.ico') {
    response.writeHead(200)
    response.end()
    return
  }

  // res.writeHead(200)
  // IncomingMessage
  // aborted
  // console.log(req) // IncomingMessage
  // console.log('url:',request.url)
  // response.writeHead(200)
  // response.end('hello.')

  response.writeHead(200)
  fs.createReadStream(__dirname + '/index.html')
    .pipe(response)
})

server.listen(3000)