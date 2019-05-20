const SET_NUMBER = 'SET_NUMBER'

const About = {
  state: {
    city: 'Gold State',
    id: 0,
    arrFilter: [1, 2, 3, 4, 5],
    number: 11,
    numberTwo: 30
  },
  // “getter”（可以认为是 store 的计算属性
  getters: {
    doneArrFilter: state => {
      return state.arrFilter.filter(number => number % 2 === 0)
    },
    doneArray (state) {
      return state.arrFilter.filter(number => number % 2 === 0)
    }
  },
  // 改变的是 state
  mutations: {
    aboutIncrement (state) {
      state.number++
    },
    [SET_NUMBER] (state, number) {
      state.numberTwo += number
    }
  },
  // Action 提交的是 mutation，而不是直接变更状态
  // Action 可以包含任意异步操作
  actions: {
    setNumber ({ commit, state }, number) {
      commit(SET_NUMBER, number)
    },
    addOne ({ commit }) {
      commit('aboutIncrement')
    }
  }
}
// export { default } from './user'
export default About
