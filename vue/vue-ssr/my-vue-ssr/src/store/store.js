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
    state: {
      userInfo: {
        email: '258246377@qq.com'
      }
    }
  })
}

// export default new Vuex.Store({
//   state: {
//     number: 1
//   },
//   mutations: {
//
//   },
//   actions: {
//
//   }
// })
