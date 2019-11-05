const http = require('http')
const fs = require('fs')

let wait = (duration) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(duration)
    }, duration)
  })
}

http.createServer((req, res, next) => {

  if (req.url === '/') {
    let html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.writeHead(200)
    res.end(html)
  }

  if (req.url === '/data') {
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8',
      // s-maxage 给 nginx 代理缓存用
      // 浏览器用 max-age
      // 'cache-control': 'max-age=2, s-maxage=20'

      // private 用了 s-maxage 不生效
      // private 告诉浏览器只有浏览器缓存，代理服务器不能缓存
      // 'cache-control': 'max-age=2, s-maxage=20, private'

      // no-store 所有地方都不缓存
      // 'cache-control': 'max-age=5, s-maxage=20, no-store'

      // vary 发送同一个请求的时，只有指定的 http header头值相同时, 才使用缓存
      'vary': 'x-test-cache',
      'cache-control': 's-maxage=10'

    })
    wait(2000).then(() => res.end('用nginx代理缓存'))
  }

}).listen(8888)

