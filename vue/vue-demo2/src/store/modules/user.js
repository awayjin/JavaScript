const SET_TOKEN = 'SET_TOKEN'

const user = {
  namespaced: true,
  getters: {
    getToken: (state, getters, rootState) => {
      return state.token
    }
  },
  state: {
    token: '123'
  },
  mutations: {
    [SET_TOKEN]: (state, token) => {
      state.token = token
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit(SET_TOKEN, token)
    }
  }
}

export default user
