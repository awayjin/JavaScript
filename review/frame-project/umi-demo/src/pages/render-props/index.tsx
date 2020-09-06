import React, {createContext, useState, useContext, Suspense} from 'react';
import _ from 'lodash'
import { MouseTracker } from './MouseTracker'

class Mouse extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { x: 0, y: 0 }
  }
  handleMouseMove = (event: any) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '100px', backgroundColor: 'darkgray' }} onMouseMove={this.handleMouseMove}>
        {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

const Demo = () => {
  return (
    <div>
      333
      <Mouse render={
        /* render 是一个函数组件 */
        ({ x, y }: any) => <h1>The mouse position is ({x}, {y})</h1>
      }/>
    </div>
  )
}

export default () => {
  return (
    <div>
      <Demo />
      <MouseTracker />
    </div>
  )
};
