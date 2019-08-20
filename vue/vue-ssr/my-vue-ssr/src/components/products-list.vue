<template>
  <div>
    <ul>
      <li
        v-for="item in products" v-bind:key="item.id">
        {{ item.title }} - {{ item.price }}
        <br>
        <button
          @click="addProductToCart(item)" :disabled="!item.inventory">
          加入购物车
        </button>
        <button @click="updatedProductsTitle(item)">
          updated demo
        </button>
        <button @click="updatedProductsTitle2(item)">
          2-two updated demo
        </button>
      </li>
    </ul>
    <p>
      demo: {{ demo }}
    </p>
  </div>
</template>

<script>
// https://github.com/geektime-geekbang/geektime-vue-1/blob/master/vuex-demo3/src/store/index.js
// import { mapState } from 'vuex'
import { mapState, mapActions } from 'vuex'

export default {
  created () {
    this.$store.dispatch('products/getAllProducts')
  },
  computed: {
    number () {
      return this.$store.state.Carts.number
    },
    ...mapState({
      demo: state => state.products.demo,
      products: state => state.products.all,
      email: state => state.userInfo.email
    })
  },
  methods: {
    // 加入购物车
    ...mapActions('products', [
      'addProductToCart'
    ]),
    // ...mapActions('cart', [
    //   'addProductToCart'
    // ]),
    ...mapActions({
      updatedProductsTitle: 'products/updatedDemo'
    }),
    // ...mapActions(['demo']),
    updatedProductsTitle2 (item) {
      this.$store.dispatch('products/updatedDemo', item.title)
    }
  }
}
</script>
