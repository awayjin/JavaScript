## react 的性能优化
   shouldComponentUpdate(简称SCU)
   PureComponent 和 React.memo
   不可变值 immutable.js
   
shouldComponentUpdate 的基本方法
react默认：父组件更新，子组件无条件也更新
```
shouldComponentUpdate(nextProps,nextState){
  if(nextState.count !== this.state.count){
    return true; //可以渲染
  }
  return false; //不重复渲染
}
```

自定义 hook，把组件逻辑提取到可重用的函数中

> React 默认: 父组件有更新，子组件则无条件更新。 shouldComponentUpdate 默认返回 true.性能优化对 react 更加重要。

scu 一定要每次都用吗？ --scu 需要时才优化


## SCU 使用总结
- SCU 默认返回 true, 即 React 默认重新渲染所有子组件
- 必须配合 '不可变值' 一起使用
- 可先不用 SCU, 有性能问题时再考虑使用

## PureComponent 和 memo
因为在SCU中中使用深度比较，会带来性能问题，所以react推荐使用浅比较，用户的数据对应的也要设置成简单的数据；
   
- PureComponent，在SCU中实现了浅比较
- memo，函数组件中的PureComponent
- 浅比较已使用大部分情况，数据做扁平化处理

## 参考
react相关知识汇总：
https://www.cnblogs.com/xiaozhumaopao/p/12716280.html