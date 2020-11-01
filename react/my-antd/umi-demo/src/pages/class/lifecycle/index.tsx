import React, { PureComponent } from 'react';

// class Lifecycle extends React.Component<any, any> {
class Lifecycle extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'demo-old',
      count: 10,
      obj: {id: 1}
    }
  }

  // shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
  //   console.log('this.state.text:', this.state.text)
  //   console.log('nextState:',nextState)
  //   if (nextState.text === 'demo-new' && this.state.text !== nextState.text) {
  //     return true
  //   }
  //   return false
  // }

  // shouldComponentUpdate (props: any, state: any) {
  //   console.log('props:', props, ' state:',state)
  //   console.log('this.state.text:', this.state.text)
  //   if (state.text === 'demo-new' && this.state.text !== state.text) {
  //     return true
  //   }
  //   return false
  // }

  bool = true;

  updateDate = () => {
    this.setState({ text: 'demo-new' })
    // this.setState({ obj: { id: 2} }) // 浅比较
  };

  increase = () => {
    // this.state.count++; // wrong, 只读的，直接修改违反不可变值
    // this.setState({count: this.state.count + 1})
    this.setState({count: this.state.count})
  }
  componentDidMount() {
    // this.state.count++
  }

  render() {
    const { text, obj } = this.state
    const arr: string[] = ['11', '22', '33'];
    const arr2: Array<number> = [11, 22, 33]
    // console.log('render', arr, arr2)
    // 泛型
    function add<T>(arg: T): T {
      return arg
    }
    // this.state.text = 'Hello'; // wrong
    // console.log(add(123).toFixed(2))
    // console.log(add('123').charCodeAt(2))
    return (
      <>
        <div>
          count: { this.state.count },
          <button onClick={()=>this.increase()}>add ++</button>
          <button onClick={()=>this.setState({count: this.state.count - 1})}>minus --</button>
        </div>
        <div>{ this.state.text }</div>
        <div>{ this.state.obj.id }</div>
        <button onClick={() => this.updateDate()}>click</button>
      </>
    );
  }
}

export default Lifecycle;

// export default function Lifecycle() {
//   return (
//     <div>3</div>
//   )
// }
