import { CART } from '../mutation-types'

const carts = {
  namespaced: true,
  state: {
    items: [],
    checkoutStatus: null
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
    },
    // 设置状态
    [CART.SET_CHECKOUT_STATUS] (state, status) {
      state.checkoutStatus = status
    },
    // 增加产品数量
    [CART.INCREMENT_ITEM_QUANTITY] (state, { id }) {
      const cartItem = state.items.find(product => product.id === id)
      cartItem.quantity++
    }
  },
  // actions
  actions: {
    addProductToCart ({ commit, state }, product) {
      console.log('product:', product)
      commit(CART.SET_CHECKOUT_STATUS, null)
      if (product.inventory > 0) { // 有库存
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
        } else {
          commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
        }
        // console.log(cartItem)
      }
    }
  }
}

export default carts
