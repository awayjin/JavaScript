const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
    static(__dirname + '/source/')
);

app.use(
    mount('/', async (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
    })
);


// app.listen(4000);
// module.exports = app;

const cluster = require('cluster')
const os = require('os')
if (cluster.isMaster) {
  // 根据核数来启动多个子线程
  for (let i = 0; i < os.cpus().length / 2; i++) {
    console.log('fork')
    cluster.fork()
  }
} else {
  console.log('listen 4000')
  app.listen(4000)
}