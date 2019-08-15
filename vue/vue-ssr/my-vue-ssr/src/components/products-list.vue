<template>
  <ul>
    <li
      v-for="item in products" v-bind:key="item.id">
      {{ item.title }} - {{ item.price }}
      <br>
      <button
        @click="actionTest">
        加入购物车
      </button>
    </li>
  </ul>
</template>

<script>
// https://github.com/geektime-geekbang/geektime-vue-1/blob/master/vuex-demo3/src/store/index.js
import { mapState } from 'vuex'

export default {
  created () {
    this.$store.dispatch('products/getAllProducts')
    // this.$store.dispatch('products/demo')
  },
  methods: {
    actionTest () {
      this.$store.dispatch('products/getAllProducts')
      console.log('111')
    }
  },
  computed: {
    number () {
      return this.$store.state.Carts.number
    },
    ...mapState({
      products: state => state.products.all,
      email: state => state.userInfo.email
    })
  }
}
</script>
