import React, {useContext, useState, useEffect} from "react";
import {ThemeContext} from "../../router";

interface IProps {
  // 字符串索引签名
  [kye: string]: string;
}
interface IState {
  count: number;
}

export function UseEffectPage () {
  const [count, setCount] = useState(30);
  useEffect(() => {
    document.title = `${count}.You clicked ${count} times`
  })
  return (
    <>
      <h2>You clicked {count} times.</h2>
      <button onClick={ () => { setCount(count + 1)}}>
        Click me
      </button>
    </>
  )
}

// export class UseEffectPage extends React.Component<IProps, IState> {
//   constructor (props: IProps) {
//     super(props)
//     this.state = { 
//       count: 20 
//     }
//   }
//   componentDidMount () {
//     document.title = `${this.state.count}. You clicked ${this.state.count} times`
//   }
//   componentDidUpdate () {
//     document.title = `${this.state.count}--You clicked ${this.state.count} times`
//   }
//   render () {
//     return (
//       <>
//       <p>You clicked { this.state.count } times</p>
//       <button onClick={ () => {
//         this.setState({
//           count: this.state.count + 1
//         })
//       }}>Click Me</button>
//       UseEffectPage
//       </>
//     )
//   }
// }