import Vue from 'vue'
import Vuex from 'vuex'
import Carts from './modules/carts.js' // 购物车

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      Carts
    },
    // namespaced: true,
    state: {
      number: 1
    },
    mutations: {
      addNumber (state) {
        state.number++
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
