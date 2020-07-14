// 3@ts-nocheck
import React from 'react'

const ThemeContext = React.createContext('light3')
export class ContextPage extends React.Component {
  render () {
    return (
      <>
        <ThemeContext.Provider value='dark2'>
          <Toolbar  />
          {/* <Toolbar theme="light" /> */}
        </ThemeContext.Provider>
      </>
    )
  }
}

type IProps = {
  theme: string;
}

function Toolbar() {
  return (
    <div>
      <ThemeButoon></ThemeButoon>  
      {/* <ThemeButoon theme={props.theme}></ThemeButoon>   */}
    </div>
  )
}
// class ThemeButoon extends React.Component<IProps> {
class ThemeButoon extends React.Component {
  static contextType = ThemeContext;
  render () {
    return (
      <>
        b1 context: <Button theme={this.context} />
        {/* <Button theme={this.props.theme}></Button> */}
      </>
    )
  }
}
function Button (props: any) {
  return <button>{ props.theme }</button>
}


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


