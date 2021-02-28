import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { message } from 'antd'
import axios from "axios"
import store from "../store"
// import { CHANGE_INPUT , ADD_ITEM , DELETE_ITEM } from '../store/actionTypes'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  getListAction,
  getTodoList,
  getMyListAction,
} from '../store/actionCreators'
import TodoListUI from './TodoListUI'

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
    this.deleteItem = this.deleteItem.bind(this)

    this.storeChange = this.storeChange.bind(this)
    // 订阅 Redux 的状态
    store.subscribe(this.storeChange)
  }
  componentDidMount () {
    // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    // axios.get('http://localhost:3003/getUserInfo')
    //   .then(async (res)=>{
    //     // console.log('res:', res)
    //     const action = await getListAction(res.data)
    //     store.dispatch(action)
    //   }, (err) => {
    //     return message.error(err)
    //   })

    // const action = getTodoList()
    // store.dispatch(action)

    const action = getMyListAction()
    store.dispatch(action)
    console.log(action)
  }

  storeChange() {
    const obj = JSON.parse(JSON.stringify(store.getState()))
    console.log('obj:', obj)
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
    if (this.state.inputValue) {
      store.dispatch(addItemAction())
    } else {
      message.info('值是空的')
    }
  }

  deleteItem(index) {
    const action = deleteItemAction(index)
    store.dispatch(action)
  }
  render() {
    return (
      <div>
        <TodoListUI
          inputValue={this.state.inputValue}
          list={this.state.list}
          changeInputValue={this.changeInputValue}
          clickBtn={this.clickBtn}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
export default TodoList;