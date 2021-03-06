## 剖析Vue实现原理-如何实现双向绑定MVVM
> [本文](https://github.com/DMQ/mvvm)能获得什么？
> 1. 理解Vue的双向绑定原理及核心代码模块
> 2. 如何实现双向绑定

## 1.实现数据绑定大致方式
- 发布者-订阅者模式(backbone.js)
> 一般通过subscribe,publish来实现数据和视图的绑定和监听，更新数据方式通常是 vm.set('property', value).我们更希望
vm.property = value这种方式更新数据，同时自动更新视图
- 脏值检查 angular.js
- 数据劫持 vue.js
> 数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

## 2.思路整理
- 2.1实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者

- 2.2实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数