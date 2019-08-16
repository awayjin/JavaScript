// import shop from '../api/shop'
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
    // fetch('../api/shop.json')
    fetch('https://api.myjson.com/bins/ntj93')
      .then(response => response.json())
      .then(data => {
        console.log('data:', data)
        commit(PRODUCTS.SET_PRODUCTS, data)
      })
      .catch(err => console.log(err))

    // shop.getProducts(products => {
    //   commit(PRODUCTS.SET_PRODUCTS, products)
    // })
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
