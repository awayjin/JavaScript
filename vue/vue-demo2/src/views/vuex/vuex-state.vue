<template>
  <div>
    <h2>Vuex-state</h2>
    <section>
      <h3>在 Vue 组件中获得 Vuex 状态</h3>
      <div>计算属性: {{ first }}</div>
      <div>mapState 辅助函数: {{ first2 }}, count: {{ count }}--countAlias: {{ countAlias }}</div>
    </section>
    <pre>
      section 不是一个专用来做容器的标签，专用的是 div
      section 里应该有 标题（h1~6），但文章中推荐用 article 来代替
      我们可以理解为一个非文章段落，有明确 id 的一个特殊模块容器（不是专用以包住块的容器）。
    </pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'vuex-index',
  computed: {
    // 计算属性读取 Vuex 状态
    // 这种模式导致组件依赖全局状态单例
    // 在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，
    // 并且在测试组件时需要模拟状态
    first () {
      return this.$store.state.moduleVuex.first
    },
    // mapState 辅助函数
    ...mapState({
      count: s => s.count,
      first2: s => s.moduleVuex.first,
      countAlias: 'count'
    })
  },
  created () {
    // console.log('this.$route: ', this.$route)
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
