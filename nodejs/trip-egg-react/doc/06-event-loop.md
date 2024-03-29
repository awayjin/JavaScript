## 事件循环(event loop)和并发模型 
- 事件循环是什么？
- 事件循环用来做什么？
- Node.js 中的事件循环和浏览器中的事件循环有和区别？

## event loop 事件循环是什么？

事件循环

事件循环是 Node.js 处理非阻塞 I/O 操作的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

> "I/O" 主要指由 `libuv` 支持的，与系统磁盘和网络之间的交互

## 事件循环和事件驱动
libuv这个库提供两个最重要的东西是事件循环和线程池，两者共同构建了异步非阻塞I/O模型，
而事件驱动只是在整个非阻塞I/O模型当中线程池通知事件循环它已经完成I/O操作的这样一种机制而已



nodejs所谓的单线程，只是主线程是单线程，所有的网络请求或者异步任务都交给了内部的线程池去实现，本身只负责不断的往返调度，由事件循环不断驱动事件执行

## 参考资料
JavaScript执行（一）：Promise里的代码为什么比setTimeout先执行：https://time.geekbang.org/column/article/82764

Node.js 事件循环，定时器和 process.nextTick()： https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/

blog node事件循环： https://www.taopoppy.cn/node/one_eventLoop.html#%E5%85%AD%E4%B8%AA%E9%98%B6%E6%AE%B5

并发模型与事件循环:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop

浏览器与Node的事件循环(Event Loop)有何区别?: https://juejin.cn/post/6844903761949753352

浏览器和Node 事件循环的区别: https://juejin.cn/post/6844904050761154574