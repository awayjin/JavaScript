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


## 参考
react相关知识汇总：
https://www.cnblogs.com/xiaozhumaopao/p/12716280.html