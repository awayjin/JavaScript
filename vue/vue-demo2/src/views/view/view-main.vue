<template>
  <div>
    <h2>view main</h2>
    <button @click="goToNameAbout">命名路由 about</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToNameAbout () {
      this.$router.push({
        name: 'aboutRoot'
      })
    }
  }
}
</script>
