
const { fork } = require('child_process')
const child = fork(`${__dirname}/child.js`)

console.log(`-- 父进程 ${process.pid}`);
child.on('message', m => {
  console.log('父进程收到消息', m);
})

child.send({ hello: 'world '})

