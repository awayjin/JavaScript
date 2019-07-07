# Vuex

### Vuex 原理和理解

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。

多个组件共享状态时，单向数据流的简洁性很容易被破坏
- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

把组件状态共享抽取出来，以一个全局单例模式管理 

通过定义和隔离状态管理中的各种概念并通过`强制规则维持视图和状态间的独立性`，我们的代码将会变得更结构化且易维护。

[vuex 官方图](./vuex.png)

### 核心概念
- State --- this.$store.state.xxx 取值
- Getter --- this.$store.getters.xxx 取值
- Mutation --- this.$store.commit('xxx') 赋值
- Action --- this.$store.dispatch('xxx') 赋值
- Module

描述
- State: 提供一个响应式数据
- Getter: 借助 Vue 的计算属性 computed 来实现缓存
- Mutation: 更改 State 方法
- Action: 触发 mutation 方法
- Module: Vue.set 动态添加到 state 响应式数据中

### 1. State
Vuex 使用单一状态树(Single State Tree)，用一个对象就包含了全部的应用层级状态。唯一数据源(SSOT),每个应用仅包含一个 store 实例.

- mapState 辅助函数，对象展开运算符

### 2. Getter
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

- 通过属性访问---store.getters.doneTodos
- 通过方法访问
```javascript
// 通过方法访问
// 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。
// 在你对 store 里的数组进行查询时非常有用
getListById: state => id => {
  return state.listId.find(todo => todo.id === id)
}
```
- mapGetters 辅助函数

### 3. Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation.

Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)

提交载荷（Payload）
```javascript
this.$store.commit('todosMulTen', {
 number: 1
})
var a = {
  ...mapMutations({
    secondAdd: 'INCREMENT_SECOND_ADD'
  })
}
```
对象风格的提交方式

Mutation 需遵守 Vue 的响应规则

 使用常量替代 Mutation 事件类型
 
 
 ### 4. Action
 
 分发 Action
 Action 通过 store.dispatch
 
 
 ### 5. mini-vuex 核心底层实现
 ```javascript
import Vue from 'vue'
const Store = function Store (options = {}) {
  const {state = {}, mutations={}} = options
  this._vm = new Vue({
    data: {
      $$state: state
    },
  })
  this._mutations = mutations
}
Store.prototype.commit = function(type, payload){
  if(this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
Object.defineProperties(Store.prototype, {
  state: {
    get: function(){
      return this._vm._data.$$state
    }
  }
});
export default {Store}
```