// https://blog.csdn.net/tdcqzd/article/details/82047632
const http = require('http');

const allowOrigin = 2
const server = http.createServer(function (req, res) {
  console.log('req.url::' + req.url)

  if (req.url) {
    if (req.url == 'ajax') {
      res.writeHead(200, "OK", {
        // "Content-type":"application/x-javascript",
        "Access-Control-Allow-Origin": '*',
      })
      res.end("hello world");
    } else {
      res.writeHead(404, 'Invalid Request', {
        "Access-Control-Allow-Origin": '*',
      })
      res.end(null)
    }
  } else {
    res.writeHead(500, 'Invalid Request', {
      "Access-Control-Allow-Origin": '*',
    })
    res.end('Invalid Request By send');
  }

})

let port = 4002 || process.env.PORT

// console.log(process.env)

server.listen(port, function () {
  console.log(`http://localhost:${port}`);
});