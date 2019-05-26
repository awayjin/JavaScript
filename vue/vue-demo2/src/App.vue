<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/mixin">mixin</router-link> |

     <!-- <Authorized :authority="['admin']">
        <router-link to="/about">About1</router-link>
      </Authorized> |-->
      <router-link to="/about">About1</router-link> |

      <router-link to="/about" vc-auth="['admin2']">About2</router-link> |
      <router-link to="/about" vc-auth="['admin3']">About3</router-link> |

      <div>User:
       <router-link to="user">user</router-link>
      | <router-link to="/user/foo/else">user-foo</router-link>
      | <router-link to="/user/bar/else">user-bar</router-link>
      | <router-link to="/user/33/profile">user-33-profile</router-link>
      | <router-link to="/user/anything/profile">user-xx-profile</router-link>
      | <router-link to="/user/anything/login">user-xx-login</router-link>
      </div>

    </div>
    <router-view/>
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
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
