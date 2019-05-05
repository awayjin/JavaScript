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
  data () {
    return {
      message: 'Hello World'
    }
  },
  mounted () {
    console.log(myDemo)
    console.log(myDemo.default()) // defaultFunc str
    // myDemo.default()
    // console.log(hello)
  },
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
