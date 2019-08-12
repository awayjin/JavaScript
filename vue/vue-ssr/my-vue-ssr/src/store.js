import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
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
