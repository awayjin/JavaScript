//按钮组件
import React ,{useContext} from 'react';
import {ColorContext,UPDATE_COLOR} from './Color'
const Buttons = () => {
  // 获取共享的dispatch
  const {dispatch} = useContext(ColorContext)
  return (
    <div>
      {/* 使用dispatch派发一个action */}
      <button onClick= {()=> {dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
      <button onClick= {()=> {dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
    </div>
  )
}

export default Buttons
