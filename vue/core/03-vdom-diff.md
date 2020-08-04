## 1. 虚拟 DOM(Virtual DOM) 和 diff 算法
- vdom 是实现 vue 和 React 重要基石
- diff 算法是 vdom 中最核心、最关键的部分

### 1.1 概念
本质是 js 对象对真实 DOM 的描述.

### 1.2 虚拟 DOM 产生的原因
https://www.zhihu.com/question/271485214

- 渲染过程抽象化, 组件高度抽象化, 工作效率提升

Vue 2.0 引入 vdom 的主要原因是 vdom 把`渲染过程抽象化`了，从而使得`组件的抽象能力`也得到提升，并且可以适配 DOM 以外的渲染目标。

通过虚拟 DOM 的抽象能力，便拥有了`声明式写 UI` 的能力，大大提高了`「工作效率」`.

再说 JSX - 在 vdom 的前提下，支持 JSX 是个很自然的事情（babel 插件）

```html
声明式渲染: 
<div id="app">
  {{ message }}
</div>
<script >
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>
```
```html
命令式的 watch 回调:
<div id="demo">{{ fullName }}</div>
<script >
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
</script>
```

- 可以更好的实现 SSR，同构渲染等

- 框架跨平台

> vdom 另一个好处是在写纯逻辑组件的时候可以降级到手写 render function，获得 js 的灵活性。
snabbdom: https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js

> 在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地`计算`出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

模板转换视图：
虚拟DOM的优势并不在于它操作DOM比较快，而是能够通过虚拟DOM的比较，最小化真实DOM操作.

详解Vue中的虚拟DOM:
https://blog.csdn.net/qq_42306443/article/details/103423378

背景:
- DOM 操作非常耗时
- 以前用 jQuery, 可以自行控制 DOM 操作的时机，手动调整
- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作

解决方案 - vdom
- 有了一定复杂度，想减少计算次数比较难
- 能不能把计算，更多的转移为 JS 计算？因为 JS 执行速度很快
- vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM

模拟
- tag, props, children 模拟 html

js数据结构: ![js数据结构](https://upload-images.jianshu.io/upload_images/11119410-01dc44e180748e21.png)

html数据格式: ![html数据格式](https://upload-images.jianshu.io/upload_images/11119410-698b2757a1135398.png)



## 通过 snabbdom 学习 vdom
- 简洁强大的 vdom 库， 易学易用
- Vue 参考它实现的 vdom 和 diff
https://github.com/snabbdom/snabbdom

- Vue3.0 重写了 vdom 的代码，优化了性能
- 但 vdom 的基本理念不变，考点不变

## 2. diff 算法
- diff 算法是 vdom 中最核心、最关键的部分
- diff 算法在日常开发中体现出来（如: key）

### diff 算法概述
笔记：
https://www.jianshu.com/p/78f6e3ba6842

- diff 算法即对比，是一个广泛的概念，例如linux diff命令、git diff等。

- 两个js对象也可以做diff，如jiff： https://github.com/cujojs/jiff

- 两棵树做diff，如这里 vdom diff

- 树diff的时间复杂度O(n ^ 3)
![diff算法](https://upload-images.jianshu.io/upload_images/10349654-e3e51d23198a0cf5.png)
    - 第一、遍历tree1；
    - 第二、遍历tree2
    - 第三、排序
    - 第四、1000个节点，要计算1亿次，算法不可用。
    
- 优化时间复杂度O(n)
    - 只比较同一层级，不跨级比较。
    - tag不相同，则直接删除重建，不再深度比较。
    - tag和key，两者都相同，则认为是相同节点，不再深度比较。

- 只比较同一层级，不跨级比较
  ![只比较同一层级，不跨级比较](https://upload-images.jianshu.io/upload_images/10349654-6e0351da1c19e560.png)
  
- tag不相同，则直接删除重建，不再深度比较
    ![tag不相同，则直接删除重建，不再深度比较](https://upload-images.jianshu.io/upload_images/10349654-8e74d765ac95fb5c.png)
    
    
