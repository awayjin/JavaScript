import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes'

const defaultState = {
  inputValue: 'write something',
  list: [
    '早8点开晨会，分配今天的开发工作',
    '早9点和项目经理作开发需求讨论会',
  ]
}

const reducer = (state = defaultState, action) => {
  // console.log('state:', state, ' action: ', action)
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
    // state.inputValue = action.value
    // return state
  }

  // add item
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push({
      name: newState.inputValue,
      age: 16,
      id: Math.random()
    })
    newState.inputValue = ''
    return newState
  }

  // delete item
  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }

  // get list
  if (action.type === GET_LIST) {
    console.log('state:', state, ' action: ', action)
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data.data
    return newState
  }

  return state
}

export default reducer