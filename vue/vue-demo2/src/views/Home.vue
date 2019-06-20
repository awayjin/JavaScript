<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p> test </p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  beforeRouteEnter (to, from, next) {
    // console.log('home-to:', to)
    next()
  },
  mounted () {
    // console.log(this.$router)
  }
}
</script>
