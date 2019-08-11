<template>
  <div class="user">
    <h1>user</h1>
    <p>333</p>
    <HelloWorld msg="Welcome to User pages. 3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
