<template>
  <div class="home">
    <p>
      <button @click="toast">toast</button>
    </p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
<!--    <test-toast msg="33" />-->
    <p>
      min-vuex: {{ number }}
      <button @click="addNumber">add number by min-vuex.js</button>
    </p>
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
    number () {
      return this.$demoVuex.state.number
    }
  },
  methods: {
    toast () {
      this.$toast.info('toast--pass--info!!!')
    },
    addNumber () {
      this.$demoVuex.commit('addNumber')
    }
  },
  mounted () {
    // this.$myMethod('home.vue msg')
  }
}
</script>
