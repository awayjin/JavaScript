<template>
  <div class="cart">
    <h2>清单</h2>
    <p><i>请添加产品到购物车</i></p>
    <ul>
      <li
        v-for="item in products" :key="item.id">
        {{ item.title }} -  {{ item.price }} x {{ item.quantity }}
      </li>
    </ul>
    <p>合计: total </p>
    <p><button :disabled="!products.length" @click="checkout(products)">提交</button></p>
    <p v-show="checkoutStatus">提交 {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    // products: 'items'
    ...mapState({
      products: state => state.Carts.items,
      checkoutStatus: state => state.Carts.checkoutStatus
    }),
    ...mapGetters('Carts', {
      products: 'cartProducts'
    })
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('Carts/checkout', products)
    }
  }
}
</script>

<style scoped>

</style>
