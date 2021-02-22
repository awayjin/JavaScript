import { observe, action, observable, computed, makeAutoObservable, spy, toJS } from "mobx"
import Todo from "./todo"

// spy(event => {
//   console.log('event:', event)
// })

export default class Store {
  @observable todos = []
  @observable number = 100

  disposers = [];

  constructor () {
    makeAutoObservable(this)
    // 该函数返回一个 disposer 函数，当调用时可以取消拦截器。
    observe(this.todos, (change) => {
      this.disposers.forEach(disposer => disposer())

      for (let todo of change.object) {
        const disposer = observe(todo, changeX => {
          // console.log('changeX:', changeX)
          this.save()
        })
        this.disposers.push(disposer)
      }
      // console.log('change:', change)
      this.save()
    })
  }

  save() {
    console.log('toJS:', toJS(this.todos))
  }

  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title))
  }

  @action delTodo (todo) {
    //remove非数组自带方法，是mobx-react提供的
    this.todos.remove(todo);
  }

  @action add() {
    this.number += 1
  }

  // 计算属性
  @computed get left() {
    return this.todos.filter(todo => !todo.finished).length
  }
}