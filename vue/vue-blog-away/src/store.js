import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state，驱动应用的数据源；
  // view，以声明方式将 state 映射到视图；
  // actions，响应在 view 上的用户输入导致的状态变化。
  state: {
    count: 100
  },
  mutations: {
    increment (state) {
      state.count++
      // ++state.count
    }
  },
  actions: {

  }
})
