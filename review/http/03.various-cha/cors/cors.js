const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'access-control-allow-origin': 'http://localhost:3000'
    // 'access-control-allow-origin': '*'
  })
  res.end(`console.log('cors content')`)
}).listen(3001)