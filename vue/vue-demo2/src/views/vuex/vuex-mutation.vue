<template>
  <div>
    <h2>Vuex Mutation</h2>
    <p>
      <button @click="commitMul">todos数组乘以10</button>: {{ todos }}
      todosSatate: {{ todosSatate }}
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'vuex-mutation',
  computed: {
    ...mapState({
      todosSatate: s => s.moduleVuex.todos
    }),
    ...mapGetters({
      'todos': 'doneTodos'
    })
  },
  methods: {
    commitMul () {
      this.$store.commit('todosMulTen')
    }
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
