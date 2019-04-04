/**
 * Created by jinw01 on 2017/5/2.
 */
// return JSONP
var http = require('http')
var url = require('url')

var port = 3000
var data = {
  ip: '192.168.0.1.jw',
  city: 'SZ',
  region_name: 'GuangDong'
}

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': 'http://localhost:63342',
    'Access-Control-Allow-credentials': true
  })
  var params = url.parse(req.url, true)
  console.log('req.url::')
  console.log(req.url)
  console.log(params)
  if (params.query && params.query.callback) {
    console.log('JSONP:')
    console.log(params.query.callback)
    var str = params.query.callback + '(' + JSON.stringify(data) + ')';
    res.end(str)
  } else {
    console.log('Plain JSON')
    res.end(JSON.stringify(data)) // 普通的json
  }
}).listen(port, function () {
  console.log('Sever is listening on port http://localhost:' + port)
})
