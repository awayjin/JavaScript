import React, {createContext, useState, useContext, useReducer } from 'react';

const initState = { count: 0};

const reducer = (state: any, action: any) => {
  console.log('state', state)
  console.log('action', action)
  if (action.type === 'plus') {
    return { count: state.count + 1}
  } else if (action.type === 'minus'){ 
    return { count: state.count - 1}
  } else if (action.type === 'reset'){ 
    return { count: initState.count }
  } else {
    throw new Error()
  }
}

const todoInit: any = { count: 20 }
const TodoDispatchContext = createContext(todoInit);
const todosReducer = (state: any, action: any) => {
  console.log('state 2', state)
  console.log('action 2', action)
  if (action.type === 'add') {
    return { count: state.count  + action.text}
  } else {
    return { count: state.count + action.text}
  }
}

export default () => {
  const [state, dispatchOpr] = useReducer(reducer, initState);
  const [todos, dispatch] = useReducer(todosReducer, todoInit);
  return (
    <div>
      <h2>useReducer</h2>
      <h3>{ state?.count }</h3>
      <button onClick={() => dispatchOpr({ type: 'reset', payload: 10 })}>
        reset
      </button>
      <button onClick={()=> dispatchOpr({ type: 'plus'})}>increment plus</button>
      <button onClick={()=> dispatchOpr({ type: 'minus'})}>decremnt minus</button>

      <TodoDispatchContext.Provider value={dispatch}>
        <h3>{ todos.count}</h3>
        <DeepTree todos={todos} />
      </TodoDispatchContext.Provider>
    </div>
  )
}

function DeepTree (props: any) {
  const dispatch = useContext(TodoDispatchContext)
  function handleClick() {
    console.log('dispatch:', dispatch);
    dispatch({ type: 'add', text: 'hello add' });
  }
  function handleClickMinus() {
    console.log('dispatch:', dispatch);
    dispatch({ type: 'minus', text: 'hello minus' });
  }
  return (
    <div>
      <button onClick={handleClick}>Add todo</button>
    <button onClick={handleClickMinus}>minus todo</button>
    </div>
  )
}