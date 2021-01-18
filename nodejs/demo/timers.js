const fs = require('fs');

const timeoutScheduled = Date.now();

// 异步任务一：100ms 后执行的定时器
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms`);
}, 100);

// 异步任务二：文件读取后，有一个 200ms 的回调函数
fs.readFile('test.js', () => {
  const startCallback = Date.now();
  // console.log('1')
  while (Date.now() - startCallback < 300) {
    // 什么也不做
  }
  // console.log('2')
});

setImmediate(() => console.log(3));
setTimeout(() => console.log(4));

fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
// 上面代码会先进入 I/O callbacks 阶段，然后是 check 阶段，
// 最后才是 timers 阶段。因此，setImmediate才会早于setTimeout执行