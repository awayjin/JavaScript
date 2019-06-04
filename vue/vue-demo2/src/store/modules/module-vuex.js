// store vuex
const vuex = {
  // state
  state: {
    first: 0,
    second: 10,
    todos: [121, 22, 33, 44],
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
    todosMulTen (state) {
      console.log('state.todos:', state.todos)
      let arr = state.todos.map(item => item + 2)
      state.todos = arr
    }
  }
}

export default vuex
