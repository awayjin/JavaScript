import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import about from './modules/about'
import moduleVuex from './modules/module-vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex 持久化
  plugins: [createPersistedState()],
  modules: {
    moduleVuex,
    user,
    about
  },
  // state，驱动应用的数据源；
  // view，以声明方式将 state 映射到视图；
  // actions，响应在 view 上的用户输入导致的状态变化。
  state: {
    count: 100
  },
  getters: {
    countConcat: state => {
      return state + '-a'
    }
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
