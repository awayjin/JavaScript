import { takeEvery, put } from 'redux-saga/effects'
import { GET_MY_LIST } from "./actionTypes"
import axios from "axios"
import { getListAction } from "./actionCreators"
import store from "./index"
import { message } from "antd"

// generator 函数
function* mySaga () {
  // 等待捕获 action
  yield takeEvery(GET_MY_LIST, getList)
}

function* getList() {
  console.log('my get list')
  const res = yield axios.get('http://localhost:3003/getUserInfo')
  const action = getListAction(res.data)
  yield put(action)
}

export default mySaga