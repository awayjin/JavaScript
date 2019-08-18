<template>
  <div class="user">
    <h1>user</h1>
    <p>333</p>
    <HelloWorld msg="HelloWorld 3"/>
    <h1>购物车示例</h1>
    <p>账号: {{ email }}</p>
    <hr>
    <h2>产品</h2>
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import ProductList from '../components/products-list.vue'

export default {
  // name: 'User',
  components: {
    HelloWorld,
    ProductList
  },
  computed: {
    email () {
      return this.$store.state.userInfo.email
    }
  }
}
</script>
