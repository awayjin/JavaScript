import React, {useReducer} from 'react';
// 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6


export const ReducerPage = () => {
  const initState = { count: 0 }
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1}
      case 'decrement':
        return { count: state.count - 1}
      default:
        throw new Error('no type')
    }
  }
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <>
      <div>ReducerPage. count: { state.count }</div>
      <p>
        <button onClick={ () => { dispatch({ type: 'increment'}) }}>add</button>
        <button onClick={ () => { dispatch({ type: 'decrement'}) }}>sub</button>
      </p>
    </>
  )
}
