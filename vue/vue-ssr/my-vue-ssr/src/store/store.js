// https://github.com/geektime-geekbang/geektime-vue-1/blob/master/vuex-demo3/src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import Carts from './modules/carts.js' // 购物车
import products from './modules/products.js' // 产品

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    // namespace: true,
    modules: {
      Carts,
      products
    },
    mutations: {
      addNumber (state) {
        state.userInfo.number++
      }
    },
    state: {
      userInfo: {
        number: 10,
        email: '258246377@qq.com'
      }
    }
  })
}
