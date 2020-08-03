// @ts-nocheck
// https://zh-hans.reactjs.org/docs/context.html

// import React, {useContext} from 'react'
// import { ThemeContext, themes } from './themes/theme-context'
// import ThemeButton from './themes/theme-button'
//
// function Toolbar (props) {
//   return (
//     <ThemeButton onClick={props.changeTheme}>
//       changeTheme
//     </ThemeButton>
//   )
// }
//
// export class ContextPage extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       theme: themes.light
//     }
//
//     // this.toggleTheme = (state => {
//     //   state.theme === themes.dark ?  themes.light : themes.dark
//     // })
//     this.toggleTheme = () => {
//       this.setState(state => ({
//         theme:
//           state.theme === themes.dark
//             ? themes.light
//             : themes.dark,
//       }));
//     };
//   }
//   render () {
//     // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
//     // 而外部的组件使用默认的 theme 值
//     return (
//       // <div>dd</div>
//       <div>
//         <ThemeContext.Provider value={this.state.theme}>
//           <Toolbar changeTheme={this.toggleTheme} />
//         </ThemeContext.Provider>
//         <section>
//           <ThemeButton />
//         </section>
//       </div>
//     );
//   }
// }

import React, {useContext} from 'react'
// 创建一个 Context 对象
const ThemeContext = React.createContext('light')
export class ContextPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ThemeContext.Provider value={"light3"}>
          <Header />
        </ThemeContext.Provider>
      </div>
    );
  }
}
function Header () {
  return (
    <ThemeButton />
  )
}
// class 实现
class ThemeButton extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      update: 'update view'
    }
  }
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = ThemeContext;
  componentDidMount () {
    console.log('-->componentDidMount', this)
  }
  componentDidUpdate () {
    console.log('-->componentDidUpdate', this)
  }
  render() {
    return (
      <>
        <button theme={this.context}>{ this.context }</button>
        <button onClick={ () => {
          this.setState({ update: 'go to update view' })
        }}>{ this.state.update }</button>
      </>
    );
  }
}
// 函数实现
function ThemeButton2(props, context) {
  const value = useContext(ThemeContext)
  return (
    <button >{ value }</button>
  )
}



// const ThemeContext = React.createContext('light3')
// export class ContextPage extends React.Component {
//   render () {
//     return (
//       <>
//         <ThemeContext.Provider value='dark2'>
//           <Toolbar  />
//           {/* <Toolbar theme="light" /> */}
//         </ThemeContext.Provider>
//       </>
//     )
//   }
// }

// type IProps = {
//   theme: string;
// }

// function Toolbar() {
//   return (
//     <div>
//       <ThemeButoon></ThemeButoon>  
//       {/* <ThemeButoon theme={props.theme}></ThemeButoon>   */}
//     </div>
//   )
// }
// // class ThemeButoon extends React.Component<IProps> {
// class ThemeButoon extends React.Component {
//   static contextType = ThemeContext;
//   render () {
//     return (
//       <>
//         b1 context: <Button theme={this.context} />
//         {/* <Button theme={this.props.theme}></Button> */}
//       </>
//     )
//   }
// }
// function Button (props: any) {
//   return <button>{ props.theme }</button>
// }


// import React, {createContext, useState} from 'react';
// import { ToggleProvider } from './toggleContext'
// import {Pannel} from './panel'
// import {Counter} from "./Counter";
// // 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6

// export const CountContext = createContext(0);

// export function ContextPage() {
//   const [count, setCount] = useState(50);
//   return (
//     <>
//       <ToggleProvider>
//         <Pannel></Pannel>
//       </ToggleProvider>
//       <div>
//         <p>You clicked {count} times</p>
//         <button onClick={()=>{setCount(count+1)}}>click me</button>
//         <CountContext.Provider value={count}>
//           <Counter></Counter>
//         </CountContext.Provider>
//       </div>
//     </>
//   );
// }


