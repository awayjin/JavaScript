---
layout: post
title:  "扩展对象功能"
date:   2018年08月14日 10:34:32
categories: JavaScript
excerpt: Expanded Object Functionality
---

* content
{:toc}

---

#扩展对象功能

## 4.1 对象类别
> JS使用混合术语来描述能在标准中找到的对象。包括：
- 普通对象：拥有JS对象所有默认的内部行为
- 奇异对象:其内部行为在某些方面有别于默认行为
- 标准对象： 在	ES6	中被定义的对象，例如Array、Date，等等。标准对象可以是普通的，也可以是奇异的
- 内置对象： 在脚本开始运行时由	JS	运行环境提供的对象。所有的标准对象都是内置对象

## 4.2 对象字面量语法的扩展
> ES6用几种方式扩展了对象字面量

### 4.2.1 属性初始化器的速记法
> 属性名和本地变量名相同
```javascript
function createPerson(name, age) {
  return {
    name,
    age
  }
}
```

### 4.2.2 方法简写
> 方法简写能使用super
```javascript
var obj = {
  name: 33,
  sayName() {
    return this.name
  }
}; 
obj.sayName()
```
### 4.2.3 需计算属性名
> 需计算属性名是对象字面量语法的一部分。方法号表示法，也可以包含表达式
```javascript
var lastName = 'last name';
var suffix = 'name';
var person = {
  'first name': 'jin',
  [lastName]: 'wei',
  ['last' + suffix]: 'wei2'
};
console.log(person['first name']);
console.log(person[lastName])
```
## 4.3 新的方法
> 从ES5开始设计意图：避免创建新的全局函数，避免在Object对象的原型上添加新方法，尝试寻找哪些对象应该被添加新方法.
> 因此，其他对象不适用的新方法就被添加到全局的Object对象上

### 4.3.1 Object.is()方法
> 严格相等不完全准确(+0!==-0).Object.is()二者的值相等时返回true
```javascript
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
```
### 4.3.2 Object.assign()方法
>  混入(Mixin),一个对象会从另一个对象中接受属性与方法.无须使用继承
```javascript
// JS库
function mixin(receiver, supplier) {
  // 在supplier对象的自有属性上进行迭代，并复制到receiver对象(浅复制，当属性值为对象时，仅复制其引用)
  Object.keys(supplier).forEach(function(key) {
    receiver[key] = supplier[key]
  })
  return receiver
}
function EventTarget() { }
EventTarget.prototype = {
constructor: EventTarget,
emit (args) {
  console.log('emit:' + args)
},
on () {
  console.log('on')
}
}

var myObject = {}
mixin(myObject, EventTarget.prototype)

myObject.emit('SomethingChanged')
```
> Object.assign
```javascript
var obj = {};
Object.assign(obj, {type: 'css'}, { type: 'js'});
obj.type // js
```
> 操作访问器属性.Object.assign()使用赋值运算符，供应者的访问器属性就会变成接收者的数据属性
```javascript
// 操作访问器属性
  var receiver = {}
  var supplier = {
    get name() {
      return 'file.js'
    }
  }
  Object.assign(receiver, supplier)
  var descriptor = Object.getOwnPropertyDescriptor(receiver, 'name')
  console.log(descriptor.value) // file.js
  console.log(descriptor.get) // undefined
```
## 4.4 自有属性的枚举顺序
> 数字键按升序排，字母串和符号类型的键按添加顺序排
```javascript
var obj = {
    c: 1,
    0: 1,
    b: 2,
    2: 1
  }
  obj.d = 3
  console.log(Object.getOwnPropertyNames(obj).join('')) // 02abd
```

## 4.5 更强大的原型
> 原型是在JS中进行继承的基础

### 4.5.1 修改对象的原型
> 对象的原型会在通过构造器或Object.create()方法创建该对象时被指定
> Object.getPrototypeOf方法从任意指定对象中获取原型
```javascript
function Fn() {} var fn1 = new Fn(); 
Object.getPrototypeOf(fn1).constructor === Fn // true
```
> Object.setPrototypeOf()初始化之后更改对象原型的标准方法
```javascript
  let person = {
    getGreeting() {
      return 'Hello'
    }
  }

  let dog = {
    getGreeting() {
      return 'wolf'
    }
  }

  // 原型为 person
  let friend = Object.create(person)
  console.log(friend.getGreeting()) // Hello
  // 将原型设置为 dog
  Object.setPrototypeOf(friend, dog)
  console.log(friend.getGreeting()) // wolf
```

## 4.6 使用super引用的简单原型访问
> super是指向当前对象的原型一个指针
> Object.setPrototypeOf(obj, prototype)-obj要设置其原型的对象, prototype-该对象的新原型(一个对象 或 null)。
```javascript
// 使用super引用的简单原型访问
  var person = {
    getGreeting () {
      return 'Hello'
    }
  }

  var dog = {
    getGreeting() {
      return 'Woof'
    }
  }

  // 覆盖对象实例的一个方法
  var friend = {
    d () {},
    getGreeting() {
      console.log(this)
      // super是指向当前对象的原型一个指针
      return super.getGreeting() + ', HI,d'
      // return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi'
    }
  }
  // 将原型设置为 person
  Object.setPrototypeOf(friend, person)
  console.log(friend.getGreeting()) // Hello, hi
```

## 4.7 正式的'方法'定义
> ES6之前，'方法'此前仅指对象的函数属性(而非数据属性).ES6:方法是一个拥有[[HomeObject]]内部属性的函数
```javascript
let person = {
  // 方法
  getGreeting() {
    return 'hello'
  }
}
// 并非方法
function shareGreeting() {
  // 并没有[[HomeObject]]属性
}
```
> 使用super引用时就不同了
