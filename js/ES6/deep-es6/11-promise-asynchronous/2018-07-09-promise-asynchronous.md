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
[解析Promise原理，实现一个Promise](https://blog.csdn.net/u014775861/article/details/78030508)
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
- 也容易导致回调地狱
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
- Promise 概括来说是对异步的执行结果的描述对象。Promise是为异步操作的结果所准备的占位符
> Promise规范中规定，promise的状态只有三种.Promise 的状态一旦改变则不会再改变。还规定了 Promise 中必须有 then 方法
- pending（进行中）、fulfilled（已成功）和rejected（已失败）

### 11.5.1 Promise的生命周期 The Promise Lifecycle
> 每一个Promise都会经历一个短暂的生命周期
- 初始为挂起态（pending state）,表示异步操作尚未结束。挂起的Promise也被认为是未决的(unsettled),
- 一旦异步操作结束,Promise会被认为是已解决的(settled),并进入两种可能状态之一
> 1. 已完成(fulfilled): Promise的异步操作已成功结束
> 2. 已拒绝(rejected): Promise的异步操作未成功结束，可能是一个错误，或由其他原因导致
> 3. pending进行中

- 内部的[[PromiseState]]属性会被设置为'pending'、'fulfilled'、'rejected',以反映Promise的状态

### 11.5.2 Promise词汇
1. pending：挂起，表示未结束的Promise状态。相关词汇“挂起态”。
2. fulfilled：已完成，表示已成功结束的	Promise	状态，可以理解为“成功完成”。相关词汇“完成”、“被完成”、“完成态”
3. rejected	：已拒绝，表示已结束但失败的	Promise	状态。相关词汇“拒绝”、“被拒
 绝”、“拒绝态”
 
 4.	 resolve：决议，表示将Promise推向成功态，可以理解为“决议通过”，在	Promise概念中与“完成”是近义词。相关词汇“决议态”、“已决议”、“被决议
 
 5.	 unsettled：未决，或者称为“未解决”，表示Promise尚未被完成或拒绝，与“挂
 起”是近义词。
 6.	 settled：已决，或者称为“已解决”，表示Promise	已被完成或拒绝。注意这与“已完
 成”或“已决议”不同，“已决”的状态也可能是“拒绝态”（已失败）。
 7.	 fulfillment handler：完成处理函数，表示Promise	为完成态时会被调用的函数。
 8.	 rejection	handler	：拒绝处理函数，表示Promise	为拒绝态时会被调用的函数。
 
 ### 11.5.3 then方法
 > 11.5.3 then方法在所有的Promise上都存在。接受两个参数：
 - Promise被完成时调用的函数，与异步操作关联任何附加数据都会被传入这个完成函数
 - Promise被拒绝时调用的函数，拒绝函数会被传入与拒绝相关联的任何附加数据
 - 用这个方式实现then()方法的任何对象都被称为一个thenable对象。所有的Promise都是thenable, 反之未必成立
 ```javascript
let promise = readFile('exmple.txt')
promise.then(function(contents) {
  // 已成功结束
}, function(error) {
  // 已拒绝，未成功结束
})

promise.then(function() {
  // 已完成
})

promise.then(null, function(error) {
  // 拒绝
})
```
### 11.5.4 catch()方法
> 其行为同等于只传递拒绝处理函数给then()方法
> 此系统要优于事件与回调函数,因为他让操作是成功还是失败变得完全清晰.(事件模式倾向于在出错时不被触发，而在回调函数模式中你必须始终记得检查错误参数)

## 11.6 创建未决的Promise(Creating Unsettled Promises)
> 新的Promise使用构造器来创建.接受单个参数：一个被称为executor的函数。执行器会被传递两个名为resolve()与reject()的函数作为参数
```javascript
let fs = require('fs')
function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, { encoding: 'utf-8' }, function(err, contents) {
      if (erro) {
        reject(err)
        return 
      }
      // 读取成功
      resolve(contents)
    })
  })
}

let promise = readFile('example.js')
// 同时监听完成与拒绝
promise.then(function(contents) {
  console.log(contents) // 完成
}, function(err) {
  console.error(err.message) // 拒绝
})
```
> 要记住执行器会在readFile()被调用时立即运行。当 resolve()	或reject()在执行器内部被调用时，一个作业被添加到作业队列中，以便决议（resolve ）这个Promise。这被称
 为作业调度（job	scheduling ）
 ```javascript
// 执行器先执行 
let promise = new Promise(function(resolve, reject) {
  console.log('promise') // 1.先输出
  resolve()
})
promise.then(() => {
  console.log('Resolved.') // 3. Resolved
})
console.log("hi") // 2.后输出
```
> 因为完成处理函数与拒绝处理函数总是会在执行器的操结束后被添到作业队列的尾部.

## 11.7 创建已决的Promise
> Promise构造器就是创建未决的Promise的最好方式
> 两种方法可使用指定值来创建已决的Promise

### 11.7.1 使用Promise.resolve()
> Promise.resolve()方法接受单个参数会返回一个处于完成态的Promise
```javascript
var promise = Promise.resolve(43);
promise.then(value => {
  console.log(value)
})
```
### 11.7.2 使用Promise.reject()
> 若一个拒绝处理函数被添加到此Promise,该拒绝处理函数将永不会被调用
```javascript
var promise = Promise.reject(43); 
promise.catch(value => {
  console.log(value)
})
```
## 11.8 执行器错误(Executor Errors)
> 如果执行器内部抛出了错误，那么Promise的拒绝处理函数会被调用
```javascript
var promise = new Promise(function(resolve, reject) {
  throw new Error('Explosion..!')
})
promise.catch(function (error) {
  console.log(error.message)
})
```

## 11.9 全局的Promise拒绝处理(Global Promise Rejection Handling)
> 争议：当一个Promise被拒绝时若缺少拒绝处理函数，静默失败