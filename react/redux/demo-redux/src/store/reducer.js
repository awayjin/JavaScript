const defaultState = {
  inputValue: 'write something',
  list: [
    '早8点开晨会，分配今天的开发工作',
    '早9点和项目经理作开发需求讨论会',
  ]
}

export default (state = defaultState, action) => {
  console.log('state:', state, ' action: ', action)
  if (action.type === 'change_input_value') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
    // state.inputValue = action.value
    // return state
  }
  if (action.type === 'addItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }

  if (action.type === 'deleteItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}