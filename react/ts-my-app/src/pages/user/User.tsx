// @ts-nocheck3
import React, { useState, createContext, useContext, Component } from "react";
import ThemeContext from './theme-context'
import ThemedBar from './ThemeBar'

// https://github.com/CruxF/IMOOC/tree/master/React?1549967840861

const themes: any = {
  light: {
    classnames: 'btn btn-primary',
    bgColor: '#eee',
    color: '#000'
  },
  dark: {
    classnames: 'btn btn-light',
    bgColor: '#222',
    color: '#fff'
  }
}

export class Users extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      theme: 'light'
    }
    this.changeTheme = this.changeTheme.bind(this)
  }
  // 改变主题颜色
  changeTheme(theme: string) {
    this.setState({
      theme
    })
  }
  render() {
    const theme = this.state.theme;
    const value = themes[theme];
    return (
      <ThemeContext.Provider value={value}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
            <a href="#theme-switcher" className="btn btn-light" onClick={()=>{this.changeTheme('light')}}>浅色主题</a>
            <a href="#theme-switcher" className="btn btn-secondary" onClick={()=>{this.changeTheme('dark')}}>深色主题</a>
          </header>
          <ThemedBar></ThemedBar>
        </div>
      </ThemeContext.Provider>
    )
  }
}
// export Users;

// export function Users() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h2>Users</h2>
//       <div>
//         <p>count: { count }</p>
//       </div>
//     </div>
//   );
// }