let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
  let url = req.url

  console.log('url:', url)
  if (url === '/favicon.ico') {
    res.writeHead(200)
    res.end()
  }
  if (url === '/') {
    res.writeHead(200, {
      'content-type': 'text/html'
    })
    let html = fs.readFileSync(__dirname + '/index.html')
    res.end(html)
  } else if (url === '/ajax' || url === '/fetch') {
    res.writeHead(200)
    res.end('I give you.')
  } else {
    res.writeHead(500)
    res.end('error')
  }

})

server.listen(5000)
