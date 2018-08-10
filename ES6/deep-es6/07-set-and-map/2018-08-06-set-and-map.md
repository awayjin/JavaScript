---
layout: post
title:  "模块"
date:   2018年08月06日 10:34:32
categories: JavaScript
excerpt: Set与Map
---

* content
{:toc}

---

> Set是不包含重复值的列表，在Set中检查某个值是否存在.
> Map则是键与相对应的值集合.因此Map中的每个项都存储了两块数据.

## 7.1 ES5中的Set与Map
> ES5中，用对象属性模拟Set与Map.使用对象的属性检查唯一值.
```javascript
// 确保对象上没有继承属性
let set = Object.create(null)
set.foo = true
// 检查属性的存在性
if (set.foo) {
  
}
```
> 模拟Set与模拟Map区别是所存储的值.Map多用来提取数据,Set检查值的存在
```javascript
let map = Object.create(null)
map.foo = 'bar'
let value = map.foo // 提取一个值
console.log(value)
```

### 7.1.1 变通方法的问题
> 对象属性只能是字符串
```javascript
let map = Object.create(null)
map.count = 0
// 是想检查 ’count‘属性的存在性，还是想检查非零值？
// Set与Map可以解决
if (map.count) {}
```

## 7.2 ES6中的Set
> Set类型是一种无重复值的有序列表. 允许对包含值快速访问，从而高效追踪离散值

### 7.2.1 创建Set并添加项目
```javascript
var arr = [undefined, null, 33, undefined, null, 33];
new Set(arr).add(5).add('5').size
```
> 某个值是否存在于Set中.set.has(value)
```javascript
var set = new Set()
set.add(5)
set.has(5)
```
> 移除值delete, clear
```javascript
var arr = [undefined, null, 33, undefined, null, 33]; 
var map = new Set(arr); 
map.delete(33)
map.has(33) // false
map.clear() // 移除所有
map.size // 0
```
### 7.2.3 Set上的forEach()方法
> forEach() 方法传递一个回调函数.接受3个参数
> 1) Set中下个位置的值
> 2) 与第一个参数相同的值
> 3) 目标Set自身
```javascript
var	set	= new Set([1, 2]);
set.forEach(function(value,	key,ownerSet){
 console.log(key	+ "	" +	value);
 console.log(ownerSet === set); // true
})
```
> 给forEach()传入一个this值作为第二个参数.箭头函数也有同样的效果
```javascript
dataSet.forEach(function(value) {
  this.output(value)
}, this)
```

## 7.3 将Set转换为数组
```javascript
var set = new Set([1, 1, 2, 3]); 
[...set]
```

### 7.3.1 Weak Set
> Set类型存储对象引用的方式，称为Strong Set.只要对于Set实例引用存在，无法释放内存
```javascript
var set = new Set(); 
var key = {}
set.add(key)
console.log(set.size) // 1
key = null // 取消原始引用
console.log(set.size) // 1
key = [...set] // 重新获得原始引用
```
> 内存泄露： JS代码在网页中运行，同时你想保持与DOM元素的联系，该元素可能被移除，你不希望该代码保留对该DOM元素的最后一个引用

### 7.3.2 创建Weak Set
> WeakSet不能包含了非对象的值。构造器不接受基本类型的值
```javascript
var set = new WeakSet()
var key = {}
set.add(key)
console.log(set.has(key)) // true
set.delete(key)
console.log(set.has(key)) // false
```

### 7.3.3 Set类型之间的关键差异
> WeakSet与正规Set的区别是弱引用.若只想追踪对象的引用，应使用Weak Set而不是正规Set
```javascript
var set = new WeakSet()
key = {}
set.add(key)
console.log(set.has(key)); // true
key = null
// 移除对于键的最后一个强引用，同时从Weak Set中移除
console.log(set.has(key)) // false
```

## 7.4 ES6的Map
> ES6的Map类型是键值对的有序列表.Object.is()方法判断两个值是否是相同的值
```javascript
var map = new Map()
map.set('title', 'es6')
map.get('title')
```
> 对象作为键
```javascript
var map = new Map()
var key1 = {}
map.set(key1, 3)
map.get(key1)
```

### 7.4.1 Map的方法
> has, delete, clear

### 7.4.2 Map的初始化
> 将数组传递给Map构造器.该数组中的每一项也必须是数组,内部数组首项为键，第二项对应的值
```javascript
var map = new Map([['name', 'away'], ['age', 22]]);
```

### 7.4.3 Map上的forEach方法
```javascript
var map = new Map([['name', 'away'], ['age', 22]]);
map.forEach(function (value, key, ownerMap) {
  console.log('value:' + value + ', key:' + key)
  console.log('owner:', ownerMap === map)
})

```

## 7.5 Weak Map
> Weak Map和Weak Set一样，Weak版本都是存储对象弱引用的方式.
- 键都必须是对象，而这些对象是弱引用，不会干扰垃圾回收.
- 最佳用处： 在浏览器中创建一个关联到特定DOM元素的对象
- Weak Map来追踪DOM元素，DOM元素不存在时，在Weak Map中自动销毁
- Weak Map的键是弱引用，而值不是。在Weak Map的值中存储对象会阻止垃圾回收，即使该对象的其他引用全部都移除

### 7.5.1 使用
```javascript
var map = new WeakMap()
var element = document.querySelector('.fin-list')
map.set(element, 'original')

var value = map.get(element)
console.log(value)

// 移除元素
element.parentNode.removeChild(element)
element = null
console.log(map)
```

### 7.5.2 Weak Map的初始化
> 和正规Map构造器一样.把数组传递给WeakMap构造器

### 7.5.3 Weak Map的方法
> has, delete方法. clear方法不存在
```javascript
var map = new WeakMap()
var element = document.querySelector('.fin-list')
map.set(element, 'original')

console.log(map.has(element)) // true
console.log(map.get(element)) // original

map.delete(element)
console.log(map.has(element)) // false

console.log(map.get(element)) // undefined
```


