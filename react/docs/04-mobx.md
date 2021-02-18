# MobX
> 简单、可扩展的状态管理. Simple, scalable state management.

## 核心思想
> 任何源自应用状态的东西都应该自动地获得。Anything that can be derived from the application state, should be. Automatically.

action > state > reaction

![https://cn.mobx.js.org/flow.png](https://cn.mobx.js.org/flow.png)

状态引起的副作用应该被自动触发.

React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”

## class 类定义语法
- 继承
- 多态

yarn add -D webpack wepack-cli babel-core babel-preset-env babel-loader


@babel/preset-env

babel-plugin-transform-class-properties

yarn add -D babel-plugin-transform-decorators-legacy

## decorator 修饰器语法

JavaScript中，装饰器是一种用于修饰类(class)、方法、属性的装饰

Decorator 是在声明阶段实现类与类成员注解的一种方法

## MobX 常用的API
- 可观察的数据 Observable
- 对观察的数据做出反应

## Observable
Observable 是一种让数据的变化可以被观察的方法

哪些数据类型可以被观察
- 原始类型 String, Number, Boolean, Symbol
- 对象
- 数组

npm install mobx --save

原始类型值用 observable.box

## 对观察的数据做出反应
- computed
- autorun 自动运行
- when
- reaction



## 参考
Mobx小案例： https://github.com/sharebetter/Mobx

JavaScript装饰器(Decorator)：它是什么以及如何使用
https://zhuanlan.zhihu.com/p/189960001