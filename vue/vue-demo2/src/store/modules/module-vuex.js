// store vuex
// 使用常量替代 Mutation 事件类型
const INCREMENT_SECOND_ADD = 'INCREMENT_SECOND_ADD'

const vuex = {
  namespaced: true, // 命名空间
  // state
  state: {
    first: 0,
    second: 30,
    three: 60,
    todos: [11, 22, 33, 44],
    listId: [
      { id: 3, name: 'n-3' },
      { id: 4, name: 'n-4' },
      { id: 5, name: 'n-5' },
      { id: 6, name: 'n-6' }
    ]
  },
  // getters
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo % 2 !== 0)
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneCount: (state, getters) => {
      return getters.doneTodos.length + '-c'
    },
    // 通过方法访问
    // 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。
    // 在你对 store 里的数组进行查询时非常有用
    getListById: state => id => {
      return state.listId.find(todo => todo.id === id)
    }
  },
  // mutations
  mutations: {
    todosMulTen (state, payload) {
      console.log('payload:', payload)
      console.log('state:', state)
      let arr = state.todos.map(item => item + payload.number)
      state.todos = arr
      // state.todos = [11, 22, 33, 44]
    },
    [INCREMENT_SECOND_ADD] (state, payload) {
      state.second++
    },
    incrementThree (state, payload) {
      state.three++
    }
  },
  // actions - Action 类似于 mutation
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
    increment (context) {
      context.commit('incrementThree')
    },
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      console.log('state:', state)
      console.log('commit:', commit)
      console.log('rootState:', rootState)
      commit('incrementThree')
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

export default vuex
