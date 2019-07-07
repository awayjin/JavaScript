<template>
  <div>
    <h2>Vuex Mutation</h2>
    <pre>
      <button @click="commitMul">todos数组 + 2</button>
      getters['moduelVuex/doneTodos']: {{ $store.getters['moduleVuex/doneTodos'] }}
      todos: {{ todos }}
      --todosSatate: {{ todosSatate }}
    </pre>
    <p>
      state.second++: {{ second }}
      <button @click="secondAdd">secondAdd</button>
    </p>
    <p>
      Action: state.three++: {{ three }}
      <button @click="threeAdd">Action three add</button>
      <br>
      <button @click="threeAdd3">threeAdd3 模块的局部状态</button>
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
      'todos': 'moduleVuex/doneTodos'
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
        type: 'moduleVuex/todosMulTen',
        number: 2
      })
    },
    secondAdd3 () {
      // Mutation 必须是同步函数
      this.$store.commit('INCREMENT_SECOND_ADD')
    },
    // mutation 都是同步事务
    ...mapMutations({
      secondAdd: 'moduleVuex/INCREMENT_SECOND_ADD'
    }),
    // actions
    // action 直接更改 state, vue-devtools 插件记录不到 state 变更
    // actions 可以根据当前 state 进一步处理数据，计算或请求后端接口，
    // 然后通过 commit 的形式提交给 mutations 去处理。
    // mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：
    threeAdd3 () {
      // this.$store.dispatch('moduleVuex/incrementIfOddOnRootSum')
      // this.$store.state.moduleVuex.three++ // action 直接更改 state, 记录不到
      this.three.three++ // action 直接更改 state, 记录不到
    },
    // mapActions
    ...mapActions({
      // threeAdd: 'moduleVuex/increment'
      threeAdd: 'moduleVuex/increment'
    })
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
