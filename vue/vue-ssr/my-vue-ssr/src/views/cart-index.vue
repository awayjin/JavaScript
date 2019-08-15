<template>
  <div class="carts">
    <h1> shopping carts --11 </h1>

    <ProductList />
    <hr>----
    <ShoppingCart />

  </div>
</template>

<script>
// https://github.com/geektime-geekbang/geektime-vue-1/blob/master/vuex-demo3/src/store/index.js
import { mapState } from 'vuex'
import ProductList from '../components/products-list.vue'
import ShoppingCart from '../components/shopping-cart'

export default {
  components: {
    ProductList,
    ShoppingCart
  },
  // methods: mapActions('cart', [
  //
  // ]),
  computed: {
    number () {
      return this.$store.state.Carts.number
    },
    ...mapState({
      email: state => state.userInfo.email
    })
  }
}
</script>
