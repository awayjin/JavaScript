import React, {Component, Fragment} from 'react'
import {observer} from 'mobx-react'
import {PropTypes} from 'prop-types'
import { trace } from "mobx"

@observer
class TodoItem extends Component {

  constructor (props) {
    super(props)
    // trace()
    // trace(true)
  }
  static propTypes = {
    //传入todo
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
      finishedToggle: PropTypes.func
    }).isRequired,
    //传入store
    store: PropTypes.shape({
      todos: PropTypes.array.isRequired,
      delTodo: PropTypes.func.isRequired
    }).isRequired,
  }
  render () {
    let todo = this.props.todo;
    let store = this.props.store
    return (
      <Fragment>
        <input type="checkbox" onChange={()=>todo.finishedToggle()} className="toggle" checked={todo.finished}></input>
        {/* 动态添加class */}
        <span className={['title', todo.finished && 'finished'].join(' ')}>{todo.title}</span>
        <span className="cross" onClick = {()=>store.delTodo(todo)}>X</span>
      </Fragment>
    )
  }
}

export default TodoItem