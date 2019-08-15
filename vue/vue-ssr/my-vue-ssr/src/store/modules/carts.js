const carts = {
  namespaced: true,
  state: {
    number: 1
  },
  mutations: {
    addNumber (state) {
      state.number++
    }
  }
}

export default carts
