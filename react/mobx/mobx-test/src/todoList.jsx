import React, { Component } from 'react';
import {observable, action, autorun} from 'mobx';
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import ReactDOM from 'react-dom'
import Overview from './overview.jsx'
// import './index'

@observer
class TodoList extends Component {
  id = Math.random();
  @observable title = 'til';
  @observable finished = false;

  static propTypes = {
    // 可以指定一个对象由特定的类型值组成
    store: PropTypes.shape({
      createTodo: PropTypes.func,
      add: PropTypes.func,
      number: PropTypes.number,
      // todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
      todos: PropTypes.array.isRequired
    }).isRequired
  }

  state = {
    inputValue: ''
  }
  constructor (props) {
    super(props)
    // this.title = title
    const { store } = this.props
    const { inputValue } = this.state
    // store
  }
  handlerChange(e) {
    const inputValue = e.target.value;
    this.setState({
      inputValue
    })
  }
  handlerSubmit (e) {
    e.preventDefault();
    // let store = this.props.store;
    // store.createTodo(this.state.inputValue);
    // this.setState({
    //   inputValue:''
    // })
  }
  render () {
    const { number } = this.props.store
    const { store } = this.props
    console.log('store', store)
    return (
      <div className={'todo-list'}>
        <h1>to do list</h1>
        <header>
          <form onSubmit = {(e)=>this.handlerSubmit(e)}>
            <h2>{ this.state.inputValue }</h2>
            <input
              type="text"
              className="input"
              placeholder="what needs to be finished"
              value={this.state.inputValue}
              onChange={e=>this.handlerChange(e) }
            />
          </form>
          <p>
            <button onClick={() => {
              this.props.store.add()
            }}>add + 1</button> { number }
          </p>
        </header>
        <ul>

        </ul>
        <footer>
          { store.left }
        </footer>
      </div>
    )
  }
}

class Store {
  @observable todos = []
  @observable number = 100

  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title))
  }

  @action add() {
    this.number += 1
  }

  get left() {
    return this.todos.filter(todo => !todo.finished).length
  }

  //计算属性
  // @computed get unfinished () {
  //   return this.todos.filter(todo => !todo.finished).length;
  // }
}
const store = new Store()

export default {
  view: <TodoList store={store} />
}

