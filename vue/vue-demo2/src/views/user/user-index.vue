<template>
  <div>
    user -- {{ $route.params }}

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'user-index',
  watch: {
    // 响应 user 路由参数的变化
    '$route' (to, from) {
      console.log('路由参数的变化. from:', from)
    }
  },
  created () {
    // console.log('this.$route: ', this.$route)
    // console.log('--$router: ', this.$router)
  }
}
</script>

<style scoped>

</style>
