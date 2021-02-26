import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input , Button , List, message } from 'antd'
import store from "../store"
import { CHANGE_INPUT , ADD_ITEM , DELETE_ITEM } from '../store/actionTypes'
import { changeInputAction, addItemAction, deleteItemAction } from '../store/actionCreators'

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: null,
      list: [],
      ...store.getState()
    }

    // console.log('store:', store.getState())
    this.changeInputValue = this.changeInputValue.bind(this)
    this.clickBtn = this.clickBtn.bind(this)
    this.storeChange = this.storeChange.bind(this)
    // 订阅 Redux 的状态
    store.subscribe(this.storeChange)
  }
  componentDidMount () {
    // console.log('store.getState():', store.getState())
    // this.setState({
    //   ...store.getState()
    // })
  }
  storeChange() {
    const obj = JSON.parse(JSON.stringify(store.getState()))
    this.setState(obj)
  }

  // input change
  changeInputValue(e) {
    // console.log(e.target.value)
    // const action = {
    //   type: CHANGE_INPUT,
    //   value: e.target.value
    // }
    const value = e.target.value;
    const action = changeInputAction(value)
    store.dispatch(action)
  }

  clickBtn() {
    // const action = {
    //   type: ADD_ITEM
    // }
    console.log('this.state.inputValue:', this.state.inputValue, typeof this.state.inputValue)
    if (this.state.inputValue) {
      store.dispatch(addItemAction())
    } else {
      message.info('值是空的')
    }
  }
  deleteItem(index) {
    // const action = {
    //   type: DELETE_ITEM,
    //   index
    // }

    const action = deleteItemAction(index)
    store.dispatch(action)
  }
  render() {
    return (
      <div style={{margin:'10px'}}>
        <div>
          <Input
            placeholder='write someting'
            style={{ width:'250px', marginRight:'10px'}}
            value={this.state.inputValue}
            onChange={this.changeInputValue}
          /><Button type="primary" onClick={this.clickBtn}>增加</Button>
          <h3>{ this.state.inputValue }</h3>

        </div>
        <div style={{margin:'10px',width:'300px'}}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                onClick={this.deleteItem.bind(this, index)}
              >
                {item}
              </List.Item>
            )}

          />
        </div>
      </div>
    );
  }
}
export default TodoList;