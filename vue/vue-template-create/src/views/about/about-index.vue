<style lang="scss" scoped>
  @import "../../scss/vars";
</style>

<template>
  <div class="about">
    <h1>This is an {{ message }}  page.</h1>
    filters: {{ '22' | demoFilter }} <br>
    filters: {{ 22 | demoFilter }}

    <p>
      <button @click="getData">getData</button>
      <br>
      <button @click="postData">postData</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'about-index',
  data () {
    return {
      message: 'About'
    }
  },
  mounted () {
    // console.log(this.$axios.post)
  },
  methods: {
    getData () {
      this.$axios
        // .get('/api/mock/demo')
        .get('/api/demo.html')
        .then(data => {
          console.log(data.data)
        })
        .catch(error => {
          console.log('error2:', error)
        })
    },
    postData () {
      this.$axios
        .post('/api/mock/demo')
        // .get('/api/mock/demo')
        .then(data => {
          console.log(data.data)
        })
        .catch(error => {
          console.log('error:', error)
        })
    }
  }
}
</script>
