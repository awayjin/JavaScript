const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // 支持编码为 JSON 格式
app.use(bodyParser.urlencoded({ extended: true })) // 支持编码为表单格式

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html').pipe(res)
})

app.post('/articles', (req, res) => {
  let body = req.body
  console.log('body:', body)
  // res.send('3')
  res.send(req.body)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})

// const http = require('http')
// const fs = require('fs')
// const bodyParser  = require('body-parser')
// const url = require('url')
// const queryString = require('querystring')
//
// // const bodyParser = require('body-parser')
// // app.use(bodyParser.json()) // 支持编码为 JSON 格式
// let server = http.createServer((req, res) => {
//   // res.writeHead(200)
//   // res.send('ok').
//
//   let parseUrl = url.parse(req.url) // url 解析
//   console.log('parseUrl:', parseUrl)
//   console.log('req.body:', req)
//   // console.log('req.url:', req.url)
//   // if (req.url === '/articles') {
//   //   res.end('\nok')
//   // }
//   if (parseUrl.pathname === '/articles') {
//     let query = queryString.parse(parseUrl.query) // 查询字符串解析
//     console.log('query:', query)
//     res.end('\nok')
//   }
//
//   if (req.url === '/') {
//     fs.createReadStream(__dirname + '/index.html').pipe(res)
//   }
//
// })
//
// server.listen(3000)