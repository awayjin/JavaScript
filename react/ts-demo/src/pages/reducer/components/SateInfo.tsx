import React, { useContext} from 'react'
import { TreeContext } from '../treeContent'

export function StatInfo () {
  const obj = useContext(TreeContext);
  console.log('count:', obj)
  return (
    <div>
      3. statInfo: { obj.count }
      子组件触发：<button onClick={ ()=> obj.dispatch({ type: 'add' })}>add + 1</button>
    </div>
  )
}