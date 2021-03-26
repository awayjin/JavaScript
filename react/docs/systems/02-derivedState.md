# 你可能不需要使用派生 state

在很长一段时间内，生命周期函数 componentWillReceiveProps 是响应 Props 变化之后进行更新的唯一方式。16.3 版本里, 我们介绍了一个替代版的生命周期函数： getDerivedStateFromProps

> 注意
下面所有的反面模式中，componentWillReceiveProps 和 getDerivedStateFromProps 都是通用的。

- 什么时候使用派生 state

## 什么时候使用派生 state

getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。

大部分使用派生 state 导致的问题，不外乎两个原因：1，直接复制 props 到 state 上；2，如果 props 和 state 不一致就更新 state。下面的示例包含了这两种情况。

- 如果你只是为了缓存（memoize）基于当前 props 计算后的结果的话，你就没必要使用派生 state。尝试一下 memoization
- 如果只是用来保存 props 或者和当前 state 比较之后不一致后更新 state，那你的组件应该是太频繁的更新了 state
  
## 派生 state 的常见 bug


## 参考

你可能不需要使用派生: 
https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state