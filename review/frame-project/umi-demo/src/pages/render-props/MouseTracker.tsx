import React from 'react'


class Mouse extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
  }
  state = {
    x: 0,
    y: 0,
  }
  handleMouseMove = (e: any) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }
  render() {
    const { x, y } = this.state
    return (
      <div>
        <h1>mouse tracker</h1>
        {/* ...但我们如何渲染 <p> 以外的东西? */}
        <p style={{ height: '20vh', backgroundColor: 'darkorange'}} onMouseMove={this.handleMouseMove}>
          the current mouse position is ({x}, {y})
        </p>
        {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
        */}
        <div style={{ height: '20vh', backgroundColor: 'pink'}} onMouseMove={this.handleMouseMove}>
          { this.props.render(this.state) }
        </div>
      </div>
    );
  }
}

class Cat extends React.Component<any, any> {
  render() {
    const mouse = this.props.mouse;
    return (
      // <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      <p style={{ position: 'absolute', left: mouse.x, top: mouse.y }} >
        cat follow
      </p>
    );
  }
}

class MouseWithCat extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = { x: 0, y: 0 };
  handleMouseMove = (event: any) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100px', backgroundColor: 'darkgray' }} onMouseMove={this.handleMouseMove}>
        {/*
          我们可以在这里换掉 <p> 的 <Cat>   ......
          但是接着我们需要创建一个单独的 <MouseWithSomethingElse>
          每次我们需要使用它时，<MouseWithCat> 是不是真的可以重复使用.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

export class MouseTracker extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h1>mouse tracker 移动鼠标</h1>
        {/*<Mouse />*/}
        <Mouse render={
          (mouse: any) => {
            // return (<Cat mouse={mouse}/>)
            return (
              <p style={{ position: 'absolute', left: mouse.x, top: mouse.y }} >
                cat follow
              </p>
            )
          }
        } />
        {/*<MouseWithCat />*/}
      </div>
    );
  }
}
