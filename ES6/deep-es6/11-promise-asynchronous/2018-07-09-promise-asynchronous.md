---
layout: post
title:  "模块"
date:   2018年07月09日 10:34:32
categories: JavaScript
excerpt: 用模块封装代码
---

* content
{:toc}

---
# 11.Promise与异步编程(asynchronous and asynchronous programming)
> JS最强大的一方面就是轻易处理异步编程

## 11.1 Promise解决哪些问题？
- JS是互联网而生的语言，必须能响应点击或按键之类的用户交互行为
- Node.js 通过使用回调函数来代替事件，推动了JS中的异步编程
- 事件与回调函数不足以支持开发者的所有需求

## 11.2 异步编程的背景
- JS引擎建立在单线程事件循环的概念上

## 11.3 事件模型(The event model)
- 当被点击时会被添加到作业队列(job queue)
- 需确保所有的事件处理程序在第一次触发前处理完毕

## 11.4 回调模式(The Callback Pattern)
- 回调函数编程模式提升了异步编程模型。
- 回调模式类似事件模型，异步代码在后面的一个时间点执行， 不同之处在于需要调用的函数(回调函数)是作为参数传入的
- 回调模式比事件模型灵活，回调函数串联多个调用会相对容易
```javascript
// 立即开始执行，并在读取磁盘时暂停
readFile('e.txt', function(err, contents) {
  // 错误优先 error-first
  if (err) {
    throw err
  }
  console.log(contents)
  
  // 也容易导致回调地狱
  writeFile('exmple.txt', function(err) {
    if (err) {
      throw err
    }
    console.log('File was written.')
  })
})
console.log('Hi') // 先执行
```

## 11.5 Promise基础(Promise Basics)
- Promise是为异步操作的结果所准备的占位符

### 11.5.1 Promise的生命周期 The Promise Lifecycle
> 每一个生命周期都会经历一个短暂的生命周期
- 初始为挂起态（pending state）,表示异步操作尚未结束。挂起的Promise也被认为是未解决的(unsettled),
- 一旦异步操作结束,Promise会被认为是已解决的(settled),并进入两种可能状态之一
> 1. 已完成(fulfilled): Promise的异步操作已成功结束
> 2. 已解决(rejected): Promise的异步操作未成功结束，可能是一个错误，或由其他原因导致
- 内部的[[PromiseState]]属性会被设置为'pending'、'fulfilled'、'rejected',以反映Promise的状态
