<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <pre>
      $store.state.count: {{ $store.state.count  + 1 }}
      computed: {{ count }}
      <hr>
      token: {{ token }}
    </pre>
    <h3> index token: {{ $store.getters['user/getToken'] }} </h3>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    token () {
      return this.$store.getters['user/getToken']
    }
  },
  created () {
    console.log(this.$store)
  },
  beforeCreate () {
    this.$store.state.count = 333
  }
}
</script>
