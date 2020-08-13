const http = require('http')
const fs = require('fs')
const httpPort = 8001

const server = http.createServer((req, res) => {
  const html = fs.readFileSync('./index.html', 'utf-8')
  res.end(html)
})
server.listen(httpPort, () => {
  console.log(httpPort)
})

// const http = require('http')
// const fs = require('fs')
// const httpPort = 8001
//
// http.createServer((req, res) => {
//   fs.readFile('index.html', 'utf-8', (err, content) => {
//   // fs.readFile(__dirname + '/04-route-history.html', 'utf-8', (err, content) => {
//     if (err) {
//       console.log('We cannot open "index.htm" file.')
//     }
//
//     res.writeHead(200, {
//       'Content-Type': 'text/html; charset=utf-8'
//     })
//
//     res.end(content)
//   })
// }).listen(httpPort, () => {
//   console.log('Server listening on: http://localhost:%s', httpPort)
// })