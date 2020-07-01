import React,{useContext} from 'react'
import { ColorContext } from './Color';

const ShowArea = () => {
  // 获取color
  const {color} = useContext(ColorContext)
  return (
    <div>
      <div style={{color:color}}>字体颜色为{color}</div>
    </div>
  )
}

export default ShowArea
