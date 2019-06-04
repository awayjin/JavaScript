<template>
  <div>
    <h2>Vuex question?</h2>
    <pre>
      1. Vuex相关知识点

        1.1 Vuex的原理及理解

        1.2 nextTick和Vuex两个有没有用过，分为什么情况下用到？

        1.3 对vuex源码上如何实现只能mutation更改，而不能直接更改

        1.4 vuex中如何在层层都可以引用$store

        1.5 vuex和redux的差别

        1.6 什么时候用到Vuex合适
        <a href="https://juejin.im/post/5cd239136fb9a032297b1512">Vuex 里该存放什么样的数据</a>
    </pre>
    <pre>
      更改 Vuex 的 store 中的状态的唯一方法是提交 mutation.
    </pre>
    <pre>
      state: {{ count }}
      <button @click="mutationState3">更改 count 状态</button> <br>
      底层原理核心实现 min-vuex： {{ demoCount }}
      <button @click="$demoVuex.commit('increment')">my min-vuex count++</button>
    </pre>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'vuex-index',
  created () {
    // console.log('this.$route: ', this.$route)
  },
  computed: mapState({
    count: state => state.count,
    demoCount () {
      return this.$demoVuex.state.count
    }
  }),
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations({
      mutationState: 'increment'
    }),
    mutationState3 () {
      console.log(111)
      this.mutationState()
    }
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
