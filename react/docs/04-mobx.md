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
- 修改可观察的数据（action）
- 使用 mobx-react

## 1. Observable
Observable 是一种让数据的变化可以被观察的方法

哪些数据类型可以被观察
- 原始类型 String, Number, Boolean, Symbol
- 对象
- 数组

npm install mobx --save

原始类型值用 observable.box

## 2. 对观察的数据做出反应
- computed
- autorun 自动运行
- when
- reaction autorun 的变种

直接赋值带来副作用，每次修改会自动触发

## 3. 修改可观察的数据（action）

应该永远只对修改状态的函数使用动作。 只执行查找，过滤器等函数不应该被标记为动作，以允许 MobX 跟踪它们的调用

“强制动作” 强制所有状态变更都必须通过动作来完成。

- action 建议对任何修改 observables 或具有副作用的函数使用 (@)action
- action.bound 可以用来自动地将动作绑定到目标对象
- runInAction 是个简单的工具函数，它接收代码块并在(异步的)动作中执行

对于很多重复调用的逻辑用action, 否则用 runInAction

## 4. 使用 mobx-react
npm i react react-dom prop-types mobx-react

npm i -D @babel/preset-react

## 5. 常用工具函数
- observe, observe 和 intercept 可以用来监测单个 observable(它们不追踪嵌套的 observable) 的变化。 observe 允许你在 observable 变化之后拦截改变
    
- intercept,  intercept 可以在变化作用于 observable 之前监测和修改变化。

- spy(listener). 注册一个全局间谍监听器，用来监听所有 MobX 中的事件

- toJS 递归地将一个(observable)对象转换为 javascript 结构。

- trace 是一个小工具，它能帮助你查找为什么计算值、 reactions 或组件会重新计算。

## 6. 提升性能
三法则
- 细粒度拆分视图组件
- 使用专用组件处理列表
- 尽可能晚地结构可观察数据

## mobx视图不自动更新的问题
因为mobx为6.0.0以上的版本，mobx的将属性变为可观察的语法变了。
由原来的使用@observable注解变成了使用makeAutoObservable

```javascript
// 5.0
class Test{
    @observable name="";
}

// 6.0
class Test{
    name;
    constructor(){
        makeAutoObservable(this)
    }
}
```

## 参考
Mobx小案例： https://github.com/sharebetter/Mobx

JavaScript装饰器(Decorator)：它是什么以及如何使用
https://zhuanlan.zhihu.com/p/189960001