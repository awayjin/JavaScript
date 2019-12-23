// http://www.alloyteam.com/2015/04/xiang-jie-nodejs-di-vm-mo-kuai/
// https://www.cnblogs.com/thatme/p/10162262.html
const vm = require('vm')

const p = 5
global.p = 11

// 此方法用于创建一个独立的沙箱运行空间，
// code 内的代码可以访问外部的 global 对象，但是不能访问其他变量
// 而且 code 内部 global 与外部共享
vm.runInThisContext('console.log("p:", p)') // p:11
vm.runInThisContext('console.log("global.p:", global.p)') // global.p

console.log('p:', p)

const user = {
  // xss 过滤
  name: 'ES6 template. <script />',
  age: 22
}

const result = '`</h2>${ user.name }, age: ${ user.age }</h2>`'
const vmResult = vm.runInNewContext(result, { user })
console.log('vmResult:', vmResult)

// runInNewContext 在新的上下文运行
// xss 过滤
const xssCode = '`<h2>${ _(user.name) }</h2>`'
const vmResultXSS = vm.runInNewContext(xssCode, {
  user,
  _: function (markup) {
    return String(markup)
      .replace(/</g, '&lt;')
  }
})
console.log('vmResultXSS:', vmResultXSS)


// runInContext - 此方法用于创建一个独立的沙箱运行空间，
// sandBox 将做为 global 的变量传入 code 内，但不存在 global 变量
const sandbox  = { a: 1 }
vm.createContext(sandbox)
// 在执行上下文运行
const resultCreateContext = vm.runInContext('a += 1', sandbox)
console.log('resultCreateContext:', resultCreateContext)

const result2 = vm.runInNewContext('a += 1', { a: 1 })
console.log('result2:', result2)

const window = {
  p: 2,
  vm: vm
}
global.p = 11
vm.createContext(window)
console.log('\n')
const result3 = vm.runInContext('p = 3; console.log(typeof gloabal)', window)
console.log(window.p) // 3
const util = require('util') // 3
console.log('util:', util.inspect(window)) // 3
