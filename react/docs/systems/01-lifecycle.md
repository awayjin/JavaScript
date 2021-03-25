# react 生命周期

挂载：
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下:
- constructor()
- static getDerivedStateFromProps() 不常用
- render()
- componentDidMount()


更新：
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
- static getDerivedStateFromProps()
- 


## 关键字
单个组件、Hooks组件、多个关联组件， React.Component 以及 React.PureComponent

Hooks 组件更接近于实现状态同步，而不是响应生命周期事件

## 目录
- 元素渲染
- state & 生命周期

## 1. 元素渲染
- elements
- React elements 和 React DOM
- 更新已渲染元素
- 只更新需要更新的

元素是构建 React 应用的最小构建块.

React elements 是一个普通的对象（plain object）, 不像 DOM 元素， 创建 React 元素开销很小, React DOM负责更新 DOM 和 React 元素保持一致。

React 元素是一个不可变对象(immutable object).一旦创建就无法更改他的属性和子元素。

基本类型不可变： https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive

React DOM 会将元素和他的子元素与之前状态对比，只会更新必要的，使 DOM 达到预期的状态。

参考： https://zh-hans.reactjs.org/docs/rendering-elements.html#updating-the-rendered-element

## 2. state & 生命周期
- 销毁时，释放
- componentDidMount
- componentWillUnmount

### 2.1 不要直接修改 State
this.state.count++; 错的，直接修改违反不可变值

### 2.2 State 的更新可能是异步的


## 参考
React 生命周期方法图: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


深入 React 生命周期：
https://github.com/sisterAn/blog/issues/34

官网：
https://zh-hans.reactjs.org/docs/react-component.html