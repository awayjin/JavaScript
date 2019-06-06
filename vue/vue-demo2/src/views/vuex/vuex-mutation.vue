<template>
  <div>
    <h2>Vuex Mutation</h2>
    <p>
      <button @click="commitMul">todos数组乘以10</button>: {{ todos }}
      todosSatate: {{ todosSatate }}
    </p>
    <p>
      state.second++: {{ second }}
      <button @click="secondAdd">secondAdd</button>
    </p>
    <p>
      Action: state.three++: {{ three }}
      <button @click="threeAdd">Action three add</button>
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'vuex-mutation',
  computed: {
    ...mapState({
      todosSatate: s => s.moduleVuex.todos,
      second: s => s.moduleVuex.second,
      three: s => s.moduleVuex.three
    }),
    ...mapGetters({
      'todos': 'doneTodos'
    })
  },
  methods: {
    commitMul () {
      // 提交载荷 Payload
      // this.$store.commit('todosMulTen', {
      //   number: 1
      // })
      // 对象风格的提交方式
      this.$store.commit({
        type: 'todosMulTen',
        number: 2
      })
    },
    secondAdd3 () {
      // Mutation 必须是同步函数
      this.$store.commit('INCREMENT_SECOND_ADD')
    },
    // mutation 都是同步事务
    ...mapMutations({
      secondAdd: 'INCREMENT_SECOND_ADD'
    }),
    threeAdd3 () {
      this.$store.dispatch('increment')
    },
    // mapActions
    ...mapActions({
      threeAdd: 'increment'
    })
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
