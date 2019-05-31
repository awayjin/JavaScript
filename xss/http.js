var fs = require('fs');
var http = require('http');

// Run static server
// https.createServer(options, app).listen(4005);

// 允许跨域
var express = require('express')
var app = express()
// app.use('/c', function (request, response, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   // next();
//
//   request.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello http-111");
//   response.end();
// });

const PORT = 5005
const onListen = function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello http-111");
  response.end();
}
const server = http.createServer(onListen)
server.listen(PORT, () => {
  console.log(`Opening http:///localhost:${PORT}`)
});