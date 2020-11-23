

console.log(`-- 子进程${process.pid}`);
process.on('message', m => {
  console.log('子进程收到消息', m);
})

process.send({ child: 'from child.js'})