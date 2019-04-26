/**
 * Created by jinw01 on 2017/3/30.
 */
var http = require('http');

// http.createServer(function (req, res) {
//   // res.writeHeader(200,{
//   //   'content-type':'application/json',
//   //   'Access-Control-Allow-Origin' : '*',
//   //   'Access-Control-Request-Method':'POST,GET,OPTIONS',
//   //   'Access-Control-Request-Headers':'content-type'});
//   res.writeHead(200, {
//     'Content-Type': 'text/html',
//     'Access-Control-Allow-Origin': 'http://localhost:63342',
//     // 'Access-Control-Allow-Origin': '*',
//     // 设置ajax自带cookie
//     'Access-Control-Allow-Credentials': true
//   })
//   // res.write(req.headers);
//   var s = '';
//
//   // res.setEncoding('utf-8');
//   var receiveData = "";
//   req.on('data', function (chunk) {
//     receiveData += decodeURIComponent(chunk);
//   }).on('end', function (d) {
//     //打印
//     console.log("\n获得的数据为dd：" + receiveData);
//   })
//
//   s += receiveData + '<br><br>'
//
//   for(var name in req.headers) {
//     s +=  '<br>' + name + ':' + req.headers[name];
//   }
//   // res.writeHead("Access-control-allow-headers", "content-type,token");
//   res.write('<h2>nodejs</h2>')
//   res.end('<p> ' + receiveData + ',, Hello world.. ' + s + '</p>')
// }).listen(3000);
// console.log('localhost:3000')

var server = http.createServer(function(req,res){
    res.writeHead(200, {
    // 'Content-Type': 'text/html',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:63342',
    // 'Access-Control-Allow-Origin': '*',
    // 设置ajax自带cookie
    'Access-Control-Allow-Credentials': true
  })
  var s = '';
  if(req.url!=="/favicon.ico"){
    req.on('data',function(data){
      s = decodeURIComponent(data)
      console.log("服务器接收到的数据：　" + decodeURIComponent(data));
    });
    req.on("end",function(){
      console.log('ss:')
      console.log(s.slice(3))
      console.log('客户端请求数据全部接收完毕');
      // res.end(encodeURIComponent(s.slice(3)));
      res.end('res-data:' + s.slice(3));

    });
  }
}).listen(3000, "localhost", function(){
  console.log("localhost:3000");
});

