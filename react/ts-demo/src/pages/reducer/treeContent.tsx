import React, { createContext, useState, useReducer } from 'react';

export const Context = createContext({});

const reducer = (state: any, action: any) => {
  console.log(action)
  console.log(state)
  if (action.type === 'add') {
    return { count: state.count + 1}
  } else {
    return { count: state.count - 1}
  }
}

export const TreeContent = (props: { children: React.ReactNode; }) => {
  // const [focusTree, setFocusTree] = useState({});
  const initSate = { count: 0 }
  const [focusTree, dispatch] = useReducer(reducer, initSate);
  return (
    <>
      <Context.Provider value={{ focusTree, dispatch }}>
        <h2>Count: { focusTree.count }</h2>
        <button onClick={() => dispatch({ type: 'add', focusTree })}>add</button>
        <button onClick={() => dispatch({ type: 'sub', focusTree })}>sub</button>
        {props.children}
      </Context.Provider>
    </>
  )
}