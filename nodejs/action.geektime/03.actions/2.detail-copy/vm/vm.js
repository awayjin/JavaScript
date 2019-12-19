// http://www.alloyteam.com/2015/04/xiang-jie-nodejs-di-vm-mo-kuai/
// https://www.cnblogs.com/thatme/p/10162262.html
const vm = require('vm')

const p = 5
global.p = 11

// 此方法用于创建一个独立的沙箱运行空间，
// code 内的代码可以访问外部的 global 对象，但是不能访问其他变量
// 而且 code 内部 global 与外部共享
vm.runInThisContext('console.log("p:", p)')
vm.runInThisContext('console.log(global.p)')

console.log('p:', p)
