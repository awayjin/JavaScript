var fs = require('fs');
var https = require('https');

var key = fs.readFileSync('private.key');
var cert = fs.readFileSync('mydomain.crt');

var options = {
  key: key,
  cert: cert
};
// Run static server
// https.createServer(options, app).listen(4005);
https.createServer(options, function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World3");
  response.end();
}).listen(4005, () => {
  console.log('https://localhost:4005')
});