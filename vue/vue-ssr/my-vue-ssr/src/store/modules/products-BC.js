import { PRODUCTS } from '../mutation-types'

const _products = [
  { 'id': 1, 'title': '华为 Mate 20', 'price': 3999, 'inventory': 2 },
  { 'id': 2, 'title': '小米 9', 'price': 2999, 'inventory': 0 },
  { 'id': 3, 'title': 'OPPO R17', 'price': 2999, 'inventory': 5 }
]

const shop = {
  getProducts (cb) {
    setTimeout(() => {
      cb(_products)
    }, 100)
  }
}

// state
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
  namespace: true,
  state,
  actions,
  mutations
}
