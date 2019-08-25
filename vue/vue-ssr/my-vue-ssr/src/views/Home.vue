<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    This is a home's page. 222
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <test-toast msg="33" />
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
    addNumber () {
      this.$demoVuex.commit('addNumber')
    }
  },
  mounted () {
    this.$myMethod('home.vue msg')
    console.log('mounted 55')
  },
  created () {
    console.log('created')
    console.log('mounted 55')
  }
}
</script>
