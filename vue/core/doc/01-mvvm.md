# 如何理解 MVVM
核心内容以下：
- MVVM 概念
- 组件化
- 数据驱动视图

## MVVM 概念
维基百科 [MVVM](https://zh.wikipedia.org/wiki/MVVM), 总结：
- MVVM 对应 3 个组成部分，Model（模型）、View（视图） 和 ViewModel（视图模型).

- MVVM 的核心实现是由 ViewModel 层数据绑定，它的核心思想是分离，通过 ViewModel 让 View 层和 Model 层解耦。

虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发.

严格的MVVM要求View不能和Model直接通信，而Vue在组件提供了$refs这个属性，让Model可以直接操作View，违反了这一规定，所以说Vue没有完全遵循MVVM。

![官方图示](https://upload-images.jianshu.io/upload_images/6519022-b42f7711343d00d4.PNG)

```html
<!-- View -->
<div id="app">
  {{ message }}
  <button @click="changeMessage">change msg</button>
</div>
<script>
// Model
var exampleData = {
  message: 'Hello World'
}
// 创建一个Vue实例或“ViewModel”
// 它连接View和Model
new Vue({
  el: '#app',
  data: exampleData,
  methods: {
    changeMessage () {
      this.message = this.message.split('').reverse().join('')
    } 
  }
})
</script>
```

## 组件化
组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![组件树](https://cn.vuejs.org/images/components.png)