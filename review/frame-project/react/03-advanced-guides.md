## 高阶组件（HOC）higher-order-components

高阶组件是参数为组件，返回值为新组件的函数。

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件.

高阶组件不是一种功能，而是一种模式。

- 组件公共逻辑抽离
HOC 和 render props、mixin不推荐使用

## render props
通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件。

HOC 和 render props: 两个方式都是抽离公共逻辑

- HOC: 模式简单，但会增加组件层级。 
- Render props: 代码简洁，学习成本较高
- 按需使用

## React高级特性总结
- 函数组件
- 非受控组件
- Portals
- Context
- 异步组件
- 性能优化(重要)
- 高阶组件
- render props

## 参考
react相关知识汇总：
https://www.cnblogs.com/xiaozhumaopao/p/12716280.html

[译] 理解 React Render Props 和 HOC：
https://juejin.im/post/6844903745747173390

【React深入】从Mixin到HOC再到Hook：
https://juejin.im/post/6844903815762673671