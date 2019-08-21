import { CART } from '../mutation-types'

const carts = {
  namespaced: true,
  state: {
    items: [],
    number: 1
  },

  // getters
  getters: {
    cartProducts (state, getters, rootState) { // rootState
      return state.items.map(({ id, quantity }) => {
        const product = rootState.products.all.find(product => product.id === id)
        return {
          title: product.title,
          price: product.price,
          quantity
        }
      })
    }
  },

  // mutations
  mutations: {
    addNumber (state) {
      state.number++
    },
    [CART.PUSH_PRODUCT_TO_CART] (state, { id }) {
      console.log('id:', id)
      state.items.push({
        id,
        quantity: 1
      })
    }
  },
  // actions
  actions: {
    addProductToCart ({ commit, state }, product) {
      console.log('product:', product)
      if (product.inventory > 0) { // 有库存
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
