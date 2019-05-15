const About = {
  state: {
    city: 'Gold State',
    id: 0,
    arrFilter: [1, 2, 3, 4, 5],
    number: 11
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
  mutations: {
    aboutIncrement (state) {
      state.number++
    }
  }
}
// export { default } from './user'
export default About
