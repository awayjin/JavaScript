// import shop from '../api/shop'
import { PRODUCTS } from '../mutation-types'

import $axios from 'axios'
// import Vue from 'vue'
// const $axios = Vue.prototype.$axios

const state = {
  all: [
    { title: 11, price: 1.1, id: 1 },
    { title: 22, price: 2.1, id: 2 }
  ],
  demo: 'init demo'
}

// mutations
const mutations = {
  [PRODUCTS.SET_PRODUCTS] (state, products) {
    state.all = products
  },
  [PRODUCTS.SET_DEMO] (state, msg) {
    state.demo = msg
  }
}

// actions
const actions = {
  // 加入到购物车
  // addProductToCart ({ commit }) {
  addProductToCart ({ commit }, payload) {
    commit(PRODUCTS.SET_DEMO, payload)
    console.log('products.js addProductToCart item:', payload || 33)
  },
  updatedDemo ({ commit }, payload) {
    commit(PRODUCTS.SET_DEMO, payload)
    console.log('products.js updatedDemo', payload || 33)
  },
  // 显示所有产品
  getAllProducts ({ commit }) {
    let url = 'https://api.myjson.com/bins/ntj93'
    $axios.get(url).then(data => {
      commit(PRODUCTS.SET_PRODUCTS, data.data)
    }, err => {
      console.log('err', err)
    })
    // fetch('../api/shop.json')
    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //   console.log('data:', data)
    //   commit(PRODUCTS.SET_PRODUCTS, data)
    // })
    // .catch(err => console.log(err))

    // shop.getProducts(products => {
    //   commit(PRODUCTS.SET_PRODUCTS, products)
    // })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
