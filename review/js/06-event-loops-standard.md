# 从事件循环(event loops)规范探究JavaScript异步及浏览器更新渲染时机

## 前言
event loops 规范中定义了浏览器`何时`进行`渲染更新`，了解它有助于性能优化。

## 定义

### event loops
event loops 翻译出来就是事件循环，可以理解为`实现异步`的一种方式，我们来看看event loop在 [事件循环](https://html.spec.whatwg.org/#event-loops) HTML Standard中的定义章节：

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. Each agent    has an associated event loop.

> 为了协调事件，用户交互，脚本，渲染，网络等，用户代理必须使用本节所述的事件循环(event loops)。每个代理都有一个关联的事件循环。


### task
> An event loop has one or more task queues. A task queue is a set of tasks.

> 一个事件循环有一个或多个任务队列。任务队列是一组任务。
