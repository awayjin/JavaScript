import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from './index'

const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    inputChange(e) {
      console.log('dispatchToProps target:', e.target.value)
      let action = {
        type:'change_input',
        value:e.target.value
      }
      dispatch(action)
    },
    clickButton(){
      // console.log('111111111')
      let action = { type:'add_item' }
      dispatch(action)
    }
  }
}

@connect(stateToProps, dispatchToProps)
class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = store.getState()
    console.log('props:', props)
  }
  render() {
    return (
      <div>
        <div>
          <h3>{ this.props.inputValue }</h3>
          <input value={this.props.inputValue} onChange={this.props.inputChange} />
          <button onClick={this.props.clickButton}>提交</button>
        </div>
        <ul>
          <li>redux-store</li>
          {
            this.props.list.map((item,index)=>{
              return (<li key={index}>{item}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}


export default TodoList;
// export default connect(stateToProps, dispatchToProps)(TodoList);
