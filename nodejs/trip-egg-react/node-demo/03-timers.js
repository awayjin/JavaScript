const fs = require('fs')

function someAsyncOperation(callback) {
  fs.readFile('/', callback)
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled
  console.log(`${delay} 毫秒 have passed since I was scheduled.`);
}, 100)

someAsyncOperation(() => {
  const startCb = Date.now()
  while (Date.now() - startCb < 200) {}
})