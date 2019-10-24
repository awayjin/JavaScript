const connect = require('connect')
const app = connect()

app.use(function (req, res, next) {
  res.end('Hello World!')
})

app.listen(3000)

// // http
// const http = require('http')
// let server = http.createServer(function (request, response, next) {
//   response.writeHead(200)
//   // response.end('Hello World!!')
// })
// server.listen(3000)

// // express
// const express = require('express')
// const app = express()
// app.get('/', (req, res, next) => {
//   res.status(200)
//   res.send('Hello World 3!')
// })
// app.get('/favicon.ico', (req, res, next) => {
//   res.send()
// })
// app.listen(3000)
