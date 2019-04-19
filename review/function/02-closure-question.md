# 常见的内存泄露

## 什么是内存泄露
> 内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存。
内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，
由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，
从而造成了内存的浪费。
————[wikipedia](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)

## 意外的全局变量
> JavaScript对未声明变量的处理方式：在全局对象上创建该变量的引用(即全局对象上的属性，不是变量，因为它能通过delete删除)

```javascript
function foo () {
  bar = 'this is a hidden global variable'
}
function foo() {
  this.variable = "potential accidental global";
}
foo()
console.log(bar)
delete bar // 删除对象上的属性， 可以删除
console.log(typeof bar) // undefined

var a = 55
console.log(a)
delete a // 不能删除
console.log(a)
  
Object.getOwnPropertyDescriptor(window, 'bar')
 // {value: "this is a hidden global variable", writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(window, 'a')
// {value: 55, writable: true, enumerable: true, configurable: false}
```

#### var 声明的变量不能删除
- 每个变量下都有一个隐藏属性 [[Configurable]], 如果 configurable为 false, 表示不能更改和删除
- 在用 var 声明变量时，JavaScript 引擎会默认把configurable设为false，所以它不能改名字，不能被删掉。


## console [console](https://zhuanlan.zhihu.com/p/60538328)
> 在传递给 console.log 的对象是不能被垃圾回收

## 闭包
> 闭包本质还是函数，只不过这个函数绑定了执行上下文环境（函数内部引用的所有变量）
- 闭包不会造成内存泄漏。程序写错了才会造成内存泄漏。

```javascript
  const foo = () => {
    let v = 1
    return () => {
      let a = v++ // x++，递增前返回数值
      console.log(a) // 1, 2, 3
      // let a = ++v // 递增后返回数值
      // console.log(a) // 2, 3, 4
      return a
    }
  }
  const bar = foo()
  bar()
  bar()
  bar()
```
 > 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。
 
 ```javascript
  function f() {
    var str = Array(10000).join('#');
    var foo = {
      name: 'foo'
    }
    function unused() {
      var message = 'it is only a test message';
      str = 'unused: ' + str; // str 无法被回收 GC
    }
    function getData() {
      return 'data';
    }
    return getData;
  }

  var list = [];

  document.querySelector('#click_button').addEventListener('click', function () {
    list.push(f());
  }, false);
```
> 为什么 str 会存在在作用域中，没有被 GC 回收掉？

- 相同作用域内创建的多个内部函数对象是共享同一个变量对象。
如果内部函数中存在有对外部函数变量（可以不是被引用的内部函数），
并且存在某个或多个内部函数被其他对象引用，那么就会形成闭包，外部函数的变量对象就会存在于闭包函数的作用域链中。

- 变量对象（variable object ES3标准中执行上下文中的一种，ES5 ES2018 不一样）

## DOM 泄露
- 在JavaScript中，DOM操作是非常耗时的。因为JavaScript/ECMAScript引擎独立于渲染引擎，而DOM是位于渲染引擎，相互访问需要消耗一定的资源

- 如果在执行某些删除、更新操作后，可能会忘记释放掉代码中对应的DOM引用，这样会造成DOM内存泄露