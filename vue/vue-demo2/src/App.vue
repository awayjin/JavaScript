<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/mixin">mixin</router-link> |

     <!-- <Authorized :authority="['admin']">
        <router-link to="/about">About1</router-link>
      </Authorized> |-->
      <router-link to="/about" vc-auth="['admin2']">About2</router-link> | <br>
      <router-link to="/vuex" >Vuex</router-link> |
      <router-link to="/jsx" >jsx</router-link> |
      <router-link to="/component" >组件</router-link> | <br>
      <router-link to="/view" >view</router-link> |
      <router-link to="/account" >account</router-link> |
      <router-link to="/user">user</router-link>

    </div>
    <router-view />
    <router-view name="mixin" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  line-height: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
