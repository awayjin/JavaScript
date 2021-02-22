import React, { Component, Fragment } from "react"
import { observe, observable, action, autorun, computed, trace } from "mobx"
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import Store from './store'
import TodoItem from './todoItem'
import './index.css'

@observer
class TodoHeader extends Component {
  static propTypes = {};
  state = {
    inputValue: '',
  }
  handlerChange(e) {
    const inputValue = e.target.value;
    this.setState({
      inputValue
    })
  }
  handlerSubmit (e) {
    e.preventDefault();
    let store = this.props.store;
    store.createTodo(this.state.inputValue);
    this.setState({
      inputValue:''
    })
  }
  render () {
    const { store } = this.props;
    return (
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
      </header>
    )
  }
}

@observer
class TodoFooter extends Component {
  static propTypes = {};

  render () {
    trace()
    const { store } = this.props;
    return (
      <footer>
        { store.left } item(s) unfinished.
      </footer>
    )
  }
}

@observer
class Index extends Component {
  id = Math.random();
  @observable title = 'til';
  @observable finished = false;

  static propTypes = {
    // 可以指定一个对象由特定的类型值组成
    store: PropTypes.shape({
      add: PropTypes.func,
      number: PropTypes.number,
      createTodo: PropTypes.func,
      // todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
      todos: PropTypes.array.isRequired
    }).isRequired
  }

  state = {
    isGoing: false
  }


  handleAdd = () => {
    this.props.store.add()
  }
  render () {
    trace()
    const { number, todos } = this.props.store
    const { store } = this.props
    // console.log('todos', todos)
    // console.log('number', number)
    return (
      <div className={'todo-list'}>
        <h1>to do list</h1>
        <TodoHeader store={store} />
        <ul>
          {store.todos.map((todo)=>{
            return (
              <li key={todo.id} className='todo-item'>
                <TodoItem todo={todo} store={store}/>
              </li>
            )
          })}
        </ul>
        <TodoFooter store={store} />

        <div>
          <p>
            <button onClick={this.handleAdd}>add + 1</button> -{ number }
          </p>
          <hr/>
          demo: <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={() => {
              this.setState({
                isGoing: !this.state.isGoing
              })
            }} /> checkbox
        </div>
      </div>
    )
  }
}

const store = new Store()
export default {
  view: <Index store={store} />
}

