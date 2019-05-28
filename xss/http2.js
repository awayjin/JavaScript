'use strict'
const fs = require('fs')
const path = require('path')
const http2 = require('http2')
const helper = require('./helper')

const PORT = process.env.PORT || 5003
const PUBLIC_PATH = path.join(__dirname, './public')
const publicFiles = helper.getFiles(PUBLIC_PATH)

// 创建HTTP2服务器
const key = fs.readFileSync(path.join(__dirname, './private.key'))
const cert = fs.readFileSync(path.join(__dirname, './mydomain.crt'))
const server = http2.createSecureServer({
  key: key,
  cert: cert
}, onRequest)

// Request 事件
function onRequest (req, res) {
  // 路径指向 index.html
  const reqPath = req.url === '/' ? '/index.html' : req.url
  //获取html资源
  const file = publicFiles.get(reqPath)
  // 文件不存在
  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }

  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}
server.listen(PORT, () => {
  console.log(`https:///localhost:${PORT}`)
})

