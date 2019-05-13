<!--<style lang="less" scoped>-->
<style>
  :root {
    background-color: #f0efd0;
  }
</style>
<template>
  <div class="about">
    <h1>Vuex</h1>
    <button @click="updatedData">Click Me changed data.</button>
    <p>
      inject-{{ foo }}
    </p>
    <p>Vuex count: {{ $store.state.count }} </p>

  </div>
</template>

<script>
/**
 * 1. 计算属性缓存 vs 方法
 * 计算属性是基于它们的响应式依赖进行缓存的
 *
 * 2. 计算属性 vs 侦听属性
 * 计算属性在大多数情况下更合适
 * Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。
 * 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
 */
import * as myDemo from '../settings/index'
// var hello = require('../settings/index')

export default {
  name: 'about',
  // 子组件注入 'foo'
  inject: ['foo'],
  // state - 驱动应用的数据源
  data () {
    return {
      count: 30,
      message: 'Hello World'
    }
  },
  // view - 以声明方式将 state 映射到视图
  template1: `<div>count: {{ count }}</div>`,
  // 为什么 render 没执行？
  render (h) {
    return h('h2', this.count + `<div>count2: {{ count }}</div>`)
  },
  render2: function (createElement) {
    return createElement('h1', this.message)
  },
  mounted () {
    console.log(Array(39).join('-') + 'VuexDemo')
    console.log(this)
    console.log(this.$root.$data)
    console.log(this.$root.$data.count)
    console.log(this.$data.count)
    console.log(this.$data.message)
    console.log(myDemo.default()) // defaultFunc str
    // myDemo.default()
    // console.log(hello)
  },
  // actions - 响应在 view 上的用户输入导致的状态变化
  methods: {
    // 倒排
    reversedMessageMethod () {
      return this.message.split('').reverse().join('')
    },
    updatedData () {
      console.log(222)
      console.log(window._)
      console.log(this.$store.state.count)
      console.log(this.$store.state.count)
      // this.lastName = 'away-2'
      this.firstName = 'jin-2'
      this.$store.commit('increment')
      // this.now = 33
    }
  }
}
</script>
