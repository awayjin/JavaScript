---
layout: post
title:  "函数"
date:   2018年06月13日 11:02:32
categories: JavaScript
excerpt: 函数
---

* content
{:toc}

---

## 3.1 带参数默认值的函数
## 3.2 ES6中的参数默认值
```javascript
  function es5Func(timeout) {
    timeout = timeout || 2000
    console.log(timeout) // 2000
    // timeout = (typeof timeout !== 'undefined') ? timeout : 2000 // ES5这种模式很常用
    // console.log(timeout) // 0
  }
  es5Func(0)

  // Default Parameter Values in ECMAScript 6
  function makeRequest(url, timeout = 2000) {
    console.log(url)
    console.log(timeout)
  }
  makeRequest('example.com',  0)
```
## 3.3 参数默认值如何影响arguments对象
- 非严格模式下,arguments对象总是会被更新以反映具名参数的变化
```javascript
function mixArgs(first, second) {
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    console.log(arguments[0]); // a
    console.log(arguments[1]); // b
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);

    console.log(first); // c
    console.log(second); // d
  }

  mixArgs("a", "b");
```

## 3.4 参数默认值表达式
- 可以将前面的参数作为后面参数的默认值, function add(first, second = first)
- 前面的参数不能访问后面的参数
```javascript
 function getValue () {
    return 15
  }
  // Default Parameter Expressions 参数默认值表达式
  function add(first, second = getValue()) {
    console.log(first + second)
  }
  add(3) // 18
  add(3, 1) // 4
```

## 3.5 参数默认值的暂时性死区(Temporal Dead Zone)
```javascript
 // Default Parameter Value Temporal Dead Zone
  if (1) {
    typeof a;  // 会抛出错
    let a = 3;
  }
```
## 3.6 使用不具名参数(Working with Unnamed Parameters)
- 所传递的参数总是允许少于或多于正式指定的参数
```javascript
  function pick (object) {
    // Object.create(proto, [propertiesObject]) 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    let result = Object.create(null)
    console.log(arguments)
    // 从第二个参数开始处理
    for(let i = 1, len = arguments.length; i < len; i++) {
      result[arguments[i]] = object[arguments[i]]
    }
    console.log(result)
    return result
  }

  let book = {
    title: 'Understanding ES6',
    author: 'Away',
    year: 2018
  }

  let bookData = pick(book, 'author', 'year')
  console.log(bookData.author) // Away
  console.log(bookData.year) // 2018
  console.log(bookData) // {author: "Away", year: 2018}
```

## 3.7 剩余参数Rest Parameters
- 剩余参数由三个点(...)与紧跟具名参数指定
- 函数的 length 属性用于指示具名参数的数量，剩余参数对其毫无影响
```javascript
function pick2(object, ...keys) {
    let result = Object.create(null)
    // for (let i = 1, len = arguments.length; i < len; i++) {
    //   result[arguments[i]] = object[arguments[i]]
    // }
    for (let i = 0, len = keys.length; i < len; i++) {
      result[keys[i]] = object[keys[i]]
    }
    return result
  }
  let book2 = pick2(book, 'year', 'author')
  console.log(book2)
```
> 3.7.1 剩余参数的限制条件
- 一个函数只能有一个剩余参数，且必须放在最后
- 不能在对象字面量的 setter 属性中使用，对象字面量的 setter 被限定只能使用单个参数，而剩余参数是不限制参数数量的
```javascript
let object = {
  // 不能在 setter 中使用
  set name(...value) {
    
  }
}
// setter getter
  var objSetter = {
    age: 18,
    set setAge(value) {
      this.age = value
    },
    get getAge () {
      return this.age
    }
  }
  objSetter.setAge = 16
  console.log(objSetter.age) // 16
  console.log(objSetter.getAge) // 16
```
> 3.7.2 剩余参数如何影响arguments对象
- 设计剩余参数是为了替代 ES 中的arguments

## 3.9 扩展运算符The Spread Operator
- 剩余参数允许把多个独立参数合并到一个数组。
- 扩展运算符允许将一个数组分割，并将各个项作为分离的参数传递给函数
```javascript
  let values = [50, 75, 25, 100, 10, -30]
  console.log(Math.max.apply(Math, values))

  // spread
  console.log(Math.max(...values))

  // 扩展运算符与其他参数混用
  console.log(Math.max(...values, 0))
```

## 3.10 ES6的名称属性
- ES6 给所有函数添加在了name属性
> 3.10.1 名称属性的特殊情况
- getter与setter函数都必须用Object.getOwnPropertyDescriptor()来检索
```javascript
 var person = {
    get firstName () {
      return 'Away'
    },
    sayName: function () {
      console.log(this.name)
    }
  }
  console.log(person.sayName.name) // sayName
  console.log(person.firstName) // Away
  console.log(person.firstName.name) // undefined
  // 返回某个对象属性的描述对象
  var descriptor = Object.getOwnPropertyDescriptor(person, 'firstName')
  console.log(descriptor) // {get: ƒ, set: undefined, enumerable: true, configurable: true}
  console.log(descriptor.get.name) // get firstName
```
> 3.10.2 另外两种特殊情况
- bind()创建的函数在名称属性前带有 'bound'前缀
- 使用 Function 构造器创建的函数，其名称属性则会有 'anonymous'前缀.  [əˈnɑ:nɪməs] 
```javascript
  var person = {
    get firstName () {
      return 'Away'
    },
    sayName: function () {
      console.log(this.name)
    }
  }
  console.log(person.sayName.name) // sayName
  console.log(person.firstName) // Away
  console.log(person.firstName.name) // undefined
  // 返回某个对象属性的描述对象
  var descriptor = Object.getOwnPropertyDescriptor(person, 'firstName')
  console.log(descriptor) // {get: ƒ, set: undefined, enumerable: true, configurable: true}
  console.log(descriptor.get.name) // get firstName

  // 另外两种特殊情况
  var doSomething = function () {

  }
  console.log(doSomething.bind().name) // bound doSomething
  console.log(doSomething.bind.name) // bind
  console.log((new Function()).name) // anonymous
```
> 3.10.3 函数双重角色对应两个内部方法
- [[Call]],函数未使用new 进行调用 , [[Call]]方法会被执行
- [[Constructor]] 函数使用new 进行调用, [[Constructor]]被执行。拥有[[Constructor]]方法被称为构造器

## 3.10.4 new.target元属性
- 元属性指的是‘非对象’上的一个属性(例如new)
- 函数的[[Constructor]]方法被调用时，会被填入new的作用目标，若被[[Call]]执行，就是undefined
- 可以检查是否被特定构造器调用
```javascript
  function Person (name) {
    // this.name = name
    if (typeof new.target !== 'undefined') {
      this.name = name
    } else {
      // throw new Error('You must use new with Person')
    }
  }
  var person = new Person('Away') // Person {name: "away"}
  console.log(person)
  console.log(Person.call(person, 'Jin')) // undefined
  console.log(person) // 可以是 'jin'
```

## 3.12 块级函数Block-level functions
- 最佳实践不要在代码块中声明函数(推荐函数表达式)
- 非严格模式下，块级函数会被提升到所在函数或全局环境的顶部，而不是代码块的顶部
```javascript
'use strict'
  if (true) {
    console.log(typeof doSomething)
    function doSomething () {
      
    }
    doSomething()
  }
  doSomething() // doSomething is not defined
```

## 3.13 箭头函数Array Functions
- 没有new.target,也没有this, super, arguments的值由所在的、最靠近的非箭头函数来决定
- 不能用new调用，箭头函数没有[[Constructor]]
- 没有原型，也就是prototype属性
- 不能更改this, 在函数的整个生命周期内其值不会保持不变
- 没有arguments对象，必须依赖于具名参数或剩余参数来访问函数的参数
- 不允许重复的具名参数

### 3.13.1 箭头函数语法
> 以函数参数开头，紧跟着的是箭头，再接下来是函数体
```javascript
var reflect = value => value
var reflect = function (value) {
  return value
}
// 多个参数
var sum = (num1, num2) => num1 + num2
```  
> 若箭头函数想要从函数体向外返回一个对象字面量，字面量必须包裹在圆扩号内
```javascript
var getTemp = id => ({ id: id, name: 'temp' })
```

## 3.14 创建立即调用函数表达式(Creating Immediately-Invoked Function Expressions)
> IIFE 当你想创建一个作用域并隔离在程序其他部分外
```javascript
var person = function(name) {
  return {
    getName: function() {
      return name
    }
  }
}('Away')
var person = ((name) => {
  return {
    getName: function() {
      return name
    }
  }
})('Away')
```

## 3.16 箭头函数与数组
- 因为sort()进行的字符串的排序，字符串之间的比较是Unicode码的比
```javascript
var array=[123, 222, 7, 67, 3, 58, 92];
array.sort();
console.log(String(array));    //123,222,3,58,67,7,92

  var values = [22, 1, 33, 15, -232];
  var result = values.sort(function (a, b) {
    return a - b;
  });

  [11, 5, 10, 15].sort((a, b) => a -b)  // es6

  var a = 5; a.toString().charCodeAt(0) // 转为Unicode码
```

## 3.18 识别箭头函数
- 箭头函数属于经常函数，也可以用call, apply, bind
```javascript
var sum = (sum1, sum2) => sum1 + sum2; 
sum.call(undefined, 3, 4)
var a = sum.bind(undefined, 3, 4); 
a()
```

## 3.19 尾部调用优化Tail Call Optimization
- 引擎优化，改变了尾部调用的系统。调用函数的语句是另一个函数的最后语句