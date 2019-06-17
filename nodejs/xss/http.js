// var fs = require('fs');
// var http = require('http');
//
// // Run static server
// // https.createServer(options, app).listen(4005);
//
// // 允许跨域
// var express = require('express')
// var app = express()
// // app.use('/c', function (request, response, next) {
// //   // res.header("Access-Control-Allow-Origin", "*");
// //   // res.header("Access-Control-Allow-Headers", "X-Requested-With");
// //   // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// //   // next();
// //
// //   request.writeHead(200, {"Content-Type": "text/plain"});
// //   response.write("Hello http-111");
// //   response.end();
// // });
//
// const PORT = process.env.PORT || 5005
// const onListen = function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello http-111");
//   response.end();
// }
// const server = http.createServer(onListen)
// server.listen(PORT, () => {
//   console.log(`Opening http:///localhost:${PORT}`)
// });

// node-原生返回
// var http = require('http');
// var url = require('url');
// var util = require('util');
//
// http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//   res.end(util.inspect(url.parse(req.url, true)));
// }).listen(5005);

// express-返回
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('首页')
})

var arr = [
  { id: 1, msg: 11 },
  { id: 2, msg: 22 },
  { id: 4, msg: 44 },
  { id: 66, msg: 66 },
  { id: 3, msg: 33 }
]

app.get('/user', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(arr)
})

var server = app.listen(5005, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例3，访问地址为 http://%s:%s", host, port)
})