import { CART } from '../mutation-types'

const carts = {
  namespaced: true,
  state: {
    items: [
      { title: 'cart 11', price: 1.1, id: 1, quantity: 30 },
      { title: 'cart 22', price: 1.1, id: 2 },
      { title: 22, price: 2.1, id: 2 }
    ],
    number: 1
  },

  // getters
  getters: {
  },

  // mutations
  mutations: {
    addNumber (state) {
      state.number++
    },
    [CART.PUSH_PRODUCT_TO_CART] (state, { id }) {
      state.items.push({
        id,
        quantity: 1
      })
    }
  },
  // actions
  actions: {
    addProductToCart ({ commit, state }, product) {
      if (product.inventory > 0) {
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
        }
        // console.log(cartItem)
      }
    }
  }
}

export default carts
