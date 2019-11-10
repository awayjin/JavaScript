const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'access-control-allow-origin': 'http://localhost:3000',
    // 允许自定义头
    // 'access-control-allow-headers': 'X-Test-CORS',
    // 允许的方法
    'access-control-allow-methods': 'PUT, POST, Delete, GET',
    // 最长时间，10s 内再发请求就不用预请求了
    // 'access-control-max-age': '10'
    // 'access-control-allow-origin': '*'
  })
  res.end(`console.log('cors content')`)
}).listen(3001)