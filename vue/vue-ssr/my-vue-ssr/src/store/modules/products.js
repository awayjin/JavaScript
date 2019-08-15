import shop from '../api/shop'
import { PRODUCTS } from '../mutation-types'

const state = {
  all: [
    { title: 11, price: 1.1, id: 1 },
    { title: 22, price: 2.1, id: 2 }
  ]
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

// mutations
const mutations = {
  [PRODUCTS.SET_PRODUCTS] (state, products) {
    state.all = products
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
