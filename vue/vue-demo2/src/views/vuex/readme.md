核心概念
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
