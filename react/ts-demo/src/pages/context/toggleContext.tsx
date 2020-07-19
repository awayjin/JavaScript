import React, { createContext, useState } from 'react'

// // 1. 使用 createContext 创建上下文
// const ToggleContext = createContext({
//   toggle: true,
//   handleToggle: () => {}
// })

// // 2. 创建 Provider
// export class ToggleProvider extends React.Component {

//   // 注意书写顺序；handleToggle 作为箭头函数不能 bind 因此需要写在上面；如果不喜欢这样的顺序则可以书写普通函数放在下面但记得 bind
//   handleToggle = () => {
//     this.setState({ toggle: !this.state.toggle })
//   }

//   // 2-1. 重写 state
//   state = {
//     toggle: true,
//     handleToggle: this.handleToggle
//   }

//   render() {
//     // 2-2. 通过 Provider 组件的 value 将 state 提供出去
//     return (
//       <ToggleContext.Provider value={this.state}>
//         {this.props.children}
//       </ToggleContext.Provider>
//     )
//   }
// }

// // const ToggleContext = createContext({
// //   toggle: true,
// //   handleToggle: () => {}
// // })
// // export function ToggleProvider (props: { children: React.ReactNode; }) {
// //   const [obj, setObj] = useState({
// //     toggle: true,
// //     handleToggle: () => {
// //       console.log('obj:', obj)
// //       obj.toggle = !obj.toggle
// //       setObj(obj);
// //     }
// //   });
// //
// //   return (
// //     <ToggleContext.Provider value={obj}>
// //       {props.children}
// //     </ToggleContext.Provider>
// //   )
// // }

// // 3. 创建 Consumer
// export const ToggleConsumer = ToggleContext.Consumer
