## Node.js 阻塞对比非阻塞

> "I/O" 主要指由libuv支持的，与系统磁盘和网络之间的交互

## 阻塞

阻塞 是指在 Node.js 程序中，其它 JavaScript 语句的执行，必须等待一个非 JavaScript(例如 I/O) 操作完成。这是因为当 `阻塞` 发生时，事件循环无法继续运行 JavaScript。

在 Node.js 标准库中使用 libuv 的同步方法是最常用的 `阻塞` 操作。

在 Node.js 标准库中的所有 I/O 方法都提供异步版本，非阻塞，并且接受回调函数。某些方法也有对应的 阻塞 版本，名字以 Sync 结尾。

## 代码比较

阻塞 方法 同步 执行，非阻塞 方法 异步 执行。

```javascript
const fs = require('fs')
const data = fs.readFileSync('./file.md', 'utf-8')
console.log('同步执行 sync blocking:', data)


fs.readFile('./file.md', 'utf-8', (err, data) => {
  if (err) throw err
  console.log('non-blocking:', data)
})
console.log('这是异步，先执行')

```

## 并发和吞吐量 Concurrency and Throughput

在 Node.js 中 JavaScript 的执行是单线程的，因此并发性是指事件循环在完成其他工作后执行 JavaScript 回调函数的能力。

任何预期以并行方式运行的代码必须让事件循环能够在非 JavaScript 操作（比如 I/O ）执行的同时继续运行。

## 混合阻塞和非阻塞代码的危险

处理 I/O 时应该避免一些模式
```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');

```
在以上的例子中， fs.unlinkSync() 极有可能在 fs.readFile() 之前执行，它会在实际读取之前删除 file.md 。更好的写法是完全 非阻塞 并保证按正确顺序执行：

```javascript
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```


## 文章参考
阻塞对比非阻塞一览:
https://nodejs.org/zh-cn/docs/guides/blocking-vs-non-blocking/