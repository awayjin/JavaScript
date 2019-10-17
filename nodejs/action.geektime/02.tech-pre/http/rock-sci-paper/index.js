const http = require('http')
const fs = require('fs')
const url = require('url') // url
const queryString = require('querystring') // 查询字符串

http
  .createServer(function (req, res) {

    // 处理 icon
    if (req.url === '/favicon.ico') {
      res.writeHead(200)
      res.end()
      return
    }

    // 处理 URL
    let parseURL = url.parse(req.url)

    // console.log('queryString:', queryString)
    // console.log('parseURL:', parseURL)

    if (parseURL.pathname === '/game') {
      let query = queryString.parse(parseURL.query)
      let action = query.action
      // console.log('parse queryString:', queryString.parse(parseURL.query))
      console.log('action:', action)
      res.writeHead(200)
      res.end('ok')
      return
    }


    // 返回 index.html
    if (req.url === '/') {
      res.writeHead(200)
      fs.createReadStream(__dirname + '/index.html').pipe(res)
    }
    // console.log('req.url:', req.url)
    // res.end('ok')
  })
  .listen(3000)