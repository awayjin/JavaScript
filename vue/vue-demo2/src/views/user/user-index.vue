<template>
  <div>
    user -- {{ $route.params }}
    <div>
      | <router-link to="/user/foo/else">user-foo</router-link>
      | <router-link to="/user/bar/else">user-bar</router-link>
      | <router-link to="/user/33/profile">user-33-profile</router-link>
      | <router-link to="/user/anything/profile">user-xx-profile</router-link>
      | <router-link to="/user/anything/login">user-xx-login</router-link>
    </div>
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
