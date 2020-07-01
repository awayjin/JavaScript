// @ts-nocheck
import React,{createContext ,useReducer } from 'react'
// interface IColorProps {
//   [key: string]: { color: string, background: string, width?: any, }
// }
// const obj: IColorProps = {};
export const ColorContext = createContext()
export const UPDATE_COLOR = "UPDATE_COLOR"
// 定义reducer
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color
    default:
      return state
  }
}
// 颜色共享
export const Color = props => {
  // 使用reducer
  const [color, dispatch] = useReducer(reducer,'red')
  return (
    <>
      {/* 将color和dispatch共享出去 */}
      <ColorContext.Provider value={{color,dispatch}}>
        {props.children}
      </ColorContext.Provider>
    </>
  );
}
