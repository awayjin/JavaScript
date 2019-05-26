<style lang="scss" scoped>
  @import "../../scss/vars";
</style>

<template>
  <div class="about">
    <h1>This is an {{ message }}  page</h1>
    filters: {{ '22' | demoFilter }} <br>
    filters: {{ 22 | demoFilter }}
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
  }
}
</script>
