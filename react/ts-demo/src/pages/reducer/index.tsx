import React, {useReducer} from 'react';
// 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6

// export const ReducerPage = ({ initCount }) => {
//   const init = (initCount: number) => {
//     return { count: initCount }
//   }
//   const initState = { count: 10 }
//   const stateReducer = (state: any, action: any) => {
//     console.log('--> state:', state)
//     console.log('action:', action)
//     return { count: state.count + 1}
//   } 
//   // const [state, dispatch] = useReducer(stateReducer, initState, init)
//   const [state, dispatch] = useReducer(stateReducer, initCount, init)
//   return (
//     <>
//       <h2>{ state.count }</h2>
//       <button
//         onClick={() => dispatch({type: 'reset', payload: initCount})}>
//         Reset
//       </button>
//       <button onClick={ ()=> dispatch({ 'type': 'increment'}) }>add</button>
//       <button onClick={ ()=> dispatch('decrement') }>sub</button>
//     </>
//   )
// }

// export const ReducerPage = <ReducerPageDemo initCount={ 100 }></ReducerPageDemo>
export const ReducerPage = () => {
  const initState = { count: 0 }
  const reducer = (state: any, action: any) => {
    console.log('--> state:', state)
    console.log('action:', action)
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
