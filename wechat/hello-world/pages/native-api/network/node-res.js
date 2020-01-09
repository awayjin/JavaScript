const http = require('http')

const server = http.createServer((req, res) => {
  res.end('return a value.')
})

server.listen(3000)