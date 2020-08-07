// @ts-nocheck3
// https://zh-hans.reactjs.org/docs/context.html

// demo1
// import { ContextPage } from './context-offical-demo'
// export { ContextPage }

import React, { useContext } from 'react'
import { ThemeContext, themes } from './themes/theme-context'
import ThemeButton from './themes/theme-button'

// 一个使用 ThemedButton 的中间组件
function Toolbar(props: any) {
  const changeTheme = () => {
    // console.log('props.changeTheme:', props.changeTheme)
    return props.changeTheme
  }
  return (
    <ThemeButton onClick={changeTheme()} className={"thebtn"} >
      <h3 >changeTheme 43</h3>
      changeTheme
    </ThemeButton>
  )
}

export class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: themes.light
    }
  }
  toggleTheme = () => {
    this.setState(
      (state: any, props: any) => ({
        theme: state.theme === themes.dark
          ? themes.light
          : themes.dark,
      })
    );
  }
  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      // <div>dd</div>
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemeButton />
        </section>
      </div>
    );
  }
}