# Node 定时器
只要用到引擎之外的功能，就需要跟外部交互，从而形成异步操作。

libuv是一个高性能的，事件驱动的I/O库。

libuv这个库提供两个最重要的东西是事件循环和线程池，两者共同构建了异步非阻塞I/O模型

libuv 库怎么安排异步任务在主线程上执行？

为了协调异步任务，Node 提供了四个定时器，让任务可以在指定的时间运行
- setTimeout()
- setInterval()
- setImmediate()
- process.nextTick()

```javascript
// test.js 执行顺序
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
(() => console.log(5))();
```
```
$ node test.js
5
3
4
1
2
```

## 1. 同步任务和异步任务
同步任务总是比异步任务更早执行
```
(() => console.log(5))();
```

## 2. 本轮循环和次轮循环
异步任务可以分成两种
- 追加在本轮循环的异步任务
- 追加在次轮循环的异步任务

Node 规定，`process.nextTick`和`Promise`的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。而`setTimeout`、`setInterval`、`setImmediate`的回调函数，追加在次轮循环。

```javascript
// 下面两行，次轮循环执行
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
// 下面两行，本轮循环执行
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
```

## 3. process.nextTick()

process.nextTick这个名字有点误导，它是在本轮循环执行的，而且是所有异步任务里面最快执行的。

```
process.nextTick(() => console.log(3));
```
如果你希望异步任务尽可能快地执行，那就使用process.nextTick

## 4、微任务
根据语言规格，Promise对象的回调函数，会进入异步任务里面的"微任务"（microtask）队列。

微任务队列追加在process.nextTick队列的后面，也属于本轮循环。所以，下面的代码总是先输出3，再输出4
```
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 3
// 4
```
注意，只有前一个队列全部清空以后，才会执行下一个队列。
```javascript
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 1
// 3
// 2
// 4
```
上面代码中，全部process.nextTick的回调函数，执行都会早于Promise的

```
1. 同步任务
2. process.nextTick()
3. 微任务
```

## 5. 事件循环的概念
> "When Node.js starts, it initializes the event loop, processes the provided input script which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop."

>　当 Node 启动后，初始化事件循环，处理用户提供输入的脚本，也许会调用异步API, 调度定时器或process.nextTick， 然后开始事件循环

这段话很重要，需要仔细读。它表达了三层意思。

首先，有些人以为，除了主线程，还存在一个单独的事件循环线程。不是这样的，只有一个主线程，事件循环是在主线程上完成的。

其次，Node 开始执行脚本时，会先进行事件循环的初始化，但是这时事件循环还没有开始，会先完成下面的事情

```
- 同步任务
- 发出异步请求
- 规划定时器生效的时间
- 执行process.nextTick()等等
```

最后，上面这些事情都干完了，事件循环就正式开始了

## 参考
http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html