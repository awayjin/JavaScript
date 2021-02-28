import axios from 'axios'
import {
  CHANGE_INPUT,
  ADD_ITEM,
  DELETE_ITEM,
  GET_LIST,
  GET_MY_LIST,
} from './actionTypes'
import store from "./index"
import { message } from "antd"

export const changeInputAction = (value) => ({
  type: CHANGE_INPUT,
  value
})

export const addItemAction = () => ({
  type: ADD_ITEM,
})

export const deleteItemAction = (index) => ({
  type: DELETE_ITEM,
  index
})

export const getListAction = (data) => ({
  type: GET_LIST,
  data
})

export const getMyListAction = () => ({
  type: GET_MY_LIST,
})

export const getTodoList = () => {
  return (dispatch) => {
    axios.get('http://localhost:3003/getUserInfo')
      .then(async (res)=>{
        const data = res.data
        console.log('data:', data)
        const action = getListAction(data)
        dispatch(action)
        // store.dispatch(action)
      }, (err) => {
        return message.error(err)
      })
  }
}