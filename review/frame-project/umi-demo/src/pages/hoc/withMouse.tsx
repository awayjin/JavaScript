// 高阶组件
import React from "react";

const withMouse = (Component: any) => {
  class withMouseComponent extends React.Component<any, any> {
    state = {
      x: 0,
      y: 0,
    };
    onMouseMove = (e: any) => {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      })
    }
    componentWillUnmount() {
    }

    render() {
      console.log('withMouseComponent this.props:', this.props)
      const { x, y} = this.state
      const a = this.props.a
      return (
        <>
          <div style={{ height: '', backgroundColor: '#999'}} onMouseMove={this.onMouseMove}>
            区域
            <Component {...this.props} mouse={this.state} />
            <div>
              <h2>---> The mouse position is {x}, {y}</h2>
              <p>{ a }</p>
            </div>
          </div>
        </>
      );
    }
  }
  return withMouseComponent
}


const App = (props: any) => {
  const { x, y } = props.mouse
  const a = props.a
  console.log('props:', props)
  return (
    <div>
      <h2>The mouse position is {x}, {y}</h2>
      <p>{ a }</p>
    </div>
  )
}

export default withMouse(App)
