const fs = require('fs')
const http = require('http')
const zlip = require('zlib')

// 数据协商
http.createServer((req, res) => {

  let url = req.url
  if (url === '/favicon.ico') {
    // res.writeHead(200)
    res.end('')
  }

  const host = req.headers.host
  console.log('host:', host)
  console.log('url:', url)

  if (url === '/') {

    // res.writeHead(302, {
    res.writeHead(301, {
      'Content-Type': 'text/html', // accept
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
      // 'set-cookie': ['id=123', 'bcd=789', 'name=456;domain=test.com'], // 通过数组设置多个值, 设置过期时间 max=age

      // keep-alive 长连接
      // 'Connection': 'close',

      // 内容协商：
      // 请求头 accept-encoding 接受的内容编码压缩方式(如压缩算法gzip)对应响应头 content-encoding
      // node 内置模块 zlip, zlip.gzipSync(html)
      // 'content-encoding': 'gzip'

      // redirect 重定向
      location: '/new'
    })
    let html = fs.readFileSync(__dirname + '/index.html')
    res.end(zlip.gzipSync(html))


  } else if (url === '/new'){
    res.end('<div>302 content</div>')
  } else {
    res.end('else')
  }


}).listen(3000)