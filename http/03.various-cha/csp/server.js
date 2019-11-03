const fs = require('fs')
const http = require('http')

http.createServer((request, res) => {
  let html = fs.readFileSync(__dirname + '/index.html', 'utf-8')

  let url = request.url
  if (url === '/') {
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
    })
    res.end(html)
  } else if (url === '/report') {
    res.end('console.log("report url")')
  } else {
    res.end('console.log("loaded script")')
    // res.end('')
  }

}).listen(3000)