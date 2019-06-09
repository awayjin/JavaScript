<template>
  <div>
    <h2>Vuex Getter</h2>
    <p>computed: {{ doneTodosCount }}</p>
    <p>通过属性访问: {{ $store.getters['moduleVuex/doneTodos'] }}</p>
    <p>计算属性 : {{ doneCount }} </p>
    <p>mapGetters 别名: {{ doneCountAlias }} </p>
    <p> 通过方法访问: {{ getListById(4) }} --- {{ this.$store.getters['moduleVuex/getListById'](6) }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vuex-index',
  computed: {
    // 从 store 中的 state 中派生出一些状态
    doneTodosCount () {
      return this.$store.state.moduleVuex.todos.filter(todo => todo % 2 === 0)
    },
    doneCount () {
      // return this.$store.getters.moduleVuex.doneCount
      return this.$store.getters['moduleVuex/doneTodos']
    },
    // mapGetters 辅助函数
    ...mapGetters({
      'doneCountAlias': 'moduleVuex/doneCount'
    })
  },
  methods: {
    // 方法访问
    getListById (id) {
      // return this.$store.getters.getListById(id)
      return this.$store.getters[`moduleVuex/getListById(${id})`]
    }
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
