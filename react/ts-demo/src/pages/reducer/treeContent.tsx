import React, { createContext, useState, useReducer, useContext } from 'react';
import {SerLineContext, ServiceLine} from "./components/serviceLine";
import {StatInfo} from "./components/SateInfo";

interface ISerContext {
  name?: string;
  id?: string | number;
  count?: any;
  dispatch?: any;
}
const obj: ISerContext = {
  name: '',
  id: ''
}
export const TreeContext = createContext(obj);

// const reducer = (state: any, action: any) => {
//   console.log(action)
//   console.log(state)
//   if (action.type === 'add') {
//     return { count: state.count + 1}
//   } else {
//     return { count: state.count - 1}
//   }
// }

export const TreeContent = (props: { children: React.ReactNode; }) => {
  const serviceLine = useContext(SerLineContext); // 业务线
  // const [focusTree, setFocusTree] = useState({});
  const initSate = { count: 0 }
  const [count, dispatch] = useReducer((state: any, action: any) => {
    if (action.type === 'add') {
      return state += 1
    }
    return state -= 1
  }, 0);
  return (
    <>
      <TreeContext.Provider value={{ count, dispatch }}>
        {props.children}
        <h3>tree context 业务线: { serviceLine.name }</h3>
        <h3>Count: { count }</h3>
        <button onClick={() => dispatch({ type: 'add' })}>
          切换第一个节点
        </button>
        <button onClick={() => dispatch({ type: 'sub' })}>
          切换第3个节点
        </button>
        <StatInfo />
      </TreeContext.Provider>
    </>
  )
}