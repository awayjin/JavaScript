const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
  let html = fs.readFileSync(__dirname + '/index.html', 'utf-8')

  let url = req.url
  if (url === '/favicon.ico') {
    // res.writeHead(200)
    res.end()
  }

  const host = req.headers.host
  console.log('host:', host)

  if (url === '/') {
    if (host === 'localhost:3000') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        // 内容安全策略
        // 'Content-Security-Policy': 'default-src http: https:' // 限制行内脚本执行
        // 'Content-Security-Policy': 'default-src \'self\'' // 只是本域名下执行
        // 'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcss.com' // 允许这个域名下的内容来执行
        // 'Content-Security-Policy': 'form-action' // 限制表单提交到别的域名
        // 'Content-Security-Policy': 'script-src' // 限制 script-src
        // 'Content-Security-Policy': 'script-src \'self\'; report-uri /report' // 如果不是我们希望执行的向服务器报告
        // 'Content-Security-Policy-Report-Only': 'script-src \'self\'; report-uri /report' // 加载了，做一下 report 的工作

        // 'set-cookie': 'id=123' // 设置单个
        // 'set-cookie': ['id=123', 'name=jin'] // 通过数组设置多个值
        // 'set-cookie': ['id=123;max-age=5', 'name=456'] // 通过数组设置多个值, 设置过期时间 max=age
        // 通过数组设置多个值, 设置过期时间 max=age
        'set-cookie': ['id=12', 'id=23;max-age=5', 'age=10', 'bcd=79;httpOnly', 'name=46;domain=test.com']

      })
    }
    res.end(html)

  }


}).listen(3000)
