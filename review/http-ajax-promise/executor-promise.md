16-JavaScript执行(一)--为什么Promise里的代码比setTimeout先执行

感性认知：JavaScript引擎常驻于内存中，等待着我们(宿主)把JavaScript代码或函数叫给他执行

宿主发起的任务叫宏观任务，JavaScript引擎发起的任务叫微观任务

1. 宏观任务和微观任务
JavaScript引擎等待宿主环境分配宏观任务.在操作系统中通常等待的行为叫事件循环。

事件循环是一个跑在独立线程中的循环
伪代码：
while (true) {
r = waite()
execute(r)
}
 整个循环做的事情就是 ‘等待-执行’

这里每次的执行过程，其实都是一个宏观任务。我们可以大概理解：宏观任务的队列就相当于事件循环。

在宏观任务中，JavaScript 的 Promise 还会产生异步代码，JavaScript 必须
保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列：

有了宏观任务和微观任务机制，我们就可以实现 JS 引擎级和宿主级的任务了，例如：Promise 
永远在队列尾部添加微观任务。setTimeout 等宿主 API，则会添加宏观任务。

2. Promise
Promise 是 JavaScript 语言提供的一种标准化的异步管理方式，它的总体思想是，需要进行 io、
等待或者其它异步操作的函数，不返回真实结果，而返回一个“承诺”，函数的调用方可以在合适
的时机，选择等待这个承诺兑现（通过 Promise 的 then 方法的回调）。

    setTimeout(()=>console.log("d"), 0)
    var r1 = new Promise(function(resolve, reject){
        resolve()
    });
    r.then(() => { 
        var begin = Date.now();
        while(Date.now() - begin < 1000);
        console.log("c1") 
        new Promise(function(resolve, reject){
            resolve()
        }).then(() => console.log("c2"))
    });


如何分析异步代码的执行顺序
首先我们分析有多少个宏任务； 
在每个宏任务中，分析有多少个微任务
根据调用次序，确定宏任务中的微任务执行次序；
根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
确定整个顺序。


3. async 和 await
async/await 是 ES2016 新加入的特性，它提供了用 for、if 等代码结构来编写异步的方式。
它的运行时基础是 Promise

async 函数必定返回 Promise，我们把所有返回 Promise 的函数都可以认为是异步函数。

async 函数强大之处在于，它是可以嵌套的。我们在定义了一批原子操作的情况下，
可以利用 async 函数组合出新的 async 函数。
// 交通灯
async function changeColor (duration, color) {
  var trafficLight = document.getElementById('traffic-light')
  trafficLight.style.backgroundColor = color
  trafficLight.innerText = duration + 'ms'
  await sleep(duration)
}

async function sleep (duration) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, duration)
  })
}

// 交通信号灯
async function main () {
  while (true) {
    await changeColor(3000, 'green')
    await changeColor(1000, 'yellow')
    await changeColor(2000, 'red')
  }
}

main()


