import React, {createContext, useState, useContext, Suspense} from 'react';
const LazyComponent = React.lazy(() => import('./lazy-component'));

export default class Demo extends React.Component<any, any> {
  constructor(props: React.Component) {
    super(props);
  }
  state = {
    count: 20
  };
  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
    console.log('nextState:', nextState)
    if (nextState.count !== this.state.count) {
      return true // 可以渲染
    }
    return false // 不重复渲染
  }

  render() {
    const { count } = this.state
    return (
      <div>
        { count }
        <button onClick={
          () => this.setState({
            count: count+1
          })
        }>+1</button>
        <p>
          d3
        </p>
      </div>
    );
  }
}

